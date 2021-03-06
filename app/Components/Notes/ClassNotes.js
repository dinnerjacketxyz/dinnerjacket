import React, { Component } from 'react'
const http = require('http')
const css = require('./ClassNotes.css')
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const MAX_CLASSES = 12

let userData
let userID

window.onLeave = false

let noteID

let saveComboIndex

let edit

let ref
let fb
let database
let key = 0

let editedClassNotes

class ClassNotes extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      notes: [],
      classes: []
    }

    //Syncs class notes
    if (localStorage.getItem('classNotesDB')) {
      try {
        this.state.notes = JSON.parse(atob(localStorage.getItem('classNotesDB')))
      } catch (e) {  }//console.log(e)
    }
    let n = this.state.notes
    this.setState({ n: this.state.notes })

    //Set variables used for notes authorship
    userData = props.userData
    userID = btoa(userData.username)
    //console.log('Username: ' + userID)
    
    ref = props.database.ref('classNotes/') //sort by userID or subject or...????
    
    //generates a list of classes from API for teacehrs
    this.generateClasses()

    //console.log(btoa(JSON.stringify(this.state.notes)))

    ref.on('value', (data) => {
      //console.log('REF.ON CALLED')
      //console.log(data.val())
      try {
        this.state.notes = JSON.parse(atob(data.val().classNotes))
        let n = this.state.notes
        this.setState({ n: this.state.notes })
      } catch (e) { }
    })
  }

  //Mandatory react function for classes, outputs classnotes based on access level
  render() {
    let classNotes
    if (userData.role === 'Student') {
      classNotes = <NotesView notes={this.state.notes} classes={this.state.classes} />
    } else {
      classNotes = <TeacherNotes notes={this.state.notes} classes={this.state.classes} />
    }
    return (
      <div className='noticesParent'>
        <div className='noticesChild card uk-animation-slide-top-small'>{classNotes}</div>
      </div>
    )
  }

  /** 
    * Loop through all the user's classes
    * Add valid classes to classes array held in this.state
    */
   generateClasses() {
    this.state.classes = []

    let i = 0
    while (i > -1) {
      //console.log(window.timetable.subjects[i])
      if (window.timetable.subjects[i]) {
        if (window.timetable.subjects[i] !== -1 && window.timetable.subjects[i].shortTitle[0] !== '_' &&
          window.timetable.subjects[i].subject !== '') {  
              
          let subject = window.timetable.subjects[i].year + window.timetable.subjects[i].shortTitle
          this.state.classes.push(subject)
          //console.log(this.state.classes)
        }
      }

      if (window.timetable.subjects[i + 1]) {
        i++
      } else {
        i = -1
      }
    }
    //console.log(this.state.classes)
  }
}

export default ClassNotes

//Class for teacher notes
class TeacherNotes extends Component {
  constructor(props){
    super(props)
    this.state = {
      notes: props.notes,
      classes: props.classes
    } 
    window.onLeave = false
    this.sync()
  }

  /**
    * React life cycle function that saves the text, this only works as you move around the application because
    * browsers restrict the developer's controlling of tab closing
    */
  componentWillUnmount() {
    window.onLeave = true
    this.submitClassNote()
  }

  /**
    * Processes the form
    */
  submitClassNote(e) {
    let inputTitle = document.getElementById('classNoteTitle')
    let inputClass = document.getElementById('classNoteClass')
    let inputBody = document.getElementById('classNoteBody')
    
    let today = new Date()
    let date

    //Puts the submitted date together
    if (today.getHours() < 10) {
      date = '0'+today.getHours()+':'+today.getMinutes() +' on '+ today.getDate() + ' ' + (months[today.getMonth()]) + ' ' + today.getFullYear()
    } else if (today.getMinutes() < 10) {
      date = today.getHours()+':0'+today.getMinutes() +' on '+ today.getDate() + ' ' + (months[today.getMonth()]) + ' ' + today.getFullYear()
    } else {
      date = today.getHours()+':'+today.getMinutes() +' on '+ today.getDate() + ' ' + (months[today.getMonth()]) + ' ' + today.getFullYear()
    }
    
    let author = window.userData.givenName + ' ' + window.userData.surname
    
    if (inputTitle.value.length > 0 && inputBody.value.length > 0) {
      let title = inputTitle.value
      let cnClass = inputClass.value
      
      let body = inputBody.value

      let draft

      // if the form is being processed because user is leaving the page it saves automatically saves as a draft
      if(window.onLeave) {
        draft = true
      } else {
        draft = e.target.innerHTML === 'Save'
      }
      

      //console.log(draft)
      //console.log(e.target.innerHTML)

      // setting the record
      let cn = {
        title: title, 
        body: body, 
        cnClass: cnClass, 
        date: date,
        author: author,
        draft: draft
      }
      
      //syncing
      this.state.notes.unshift(cn)
      let notes = this.state.notes
      this.setState({ notes: this.state.notes })
      localStorage.setItem('classNotesDB', btoa(JSON.stringify(this.state.notes)))
      
      let notesDB = { classNotes: btoa(JSON.stringify(this.state.notes)) }
      ref.update(notesDB)

      //visual feedback
      document.getElementById('cnVisualFeedback').className = 'active'
      if (draft) {
        document.getElementById('cnVisualFeedback').innerHTML = 'Successfully <b>saved</b> your note'
      } else {
        document.getElementById('cnVisualFeedback').innerHTML = 'Successfully <b>posted</b> your note'
      }      
      setTimeout( function(){
        document.getElementById('cnVisualFeedback').className = 'unactive'
        document.getElementById('cnVisualFeedback').innerText = ''
      }, 5000)
    } else if (window.onLeave == false) {
      // modal, error?
      //error handling
      UIkit.modal.alert('Your title and/or body was empty. Please fill these fields and try again')
    }
    //resetting control elements for a consistent, fresh start
    inputBody.value = ''
    inputTitle.value = ''
  }

  render() {
    let classList = this.state.classes.map(cls => {
      key++
      return <option key={key} title={cls}>{cls}</option>
    })

    return (
      <div>
        <ul id='classNotesSwitcher' className='uk-subnav uk-subnav-pill uk-flex uk-flex-center' uk-switcher=''>
            <li aria-expanded='true' className='uk-active'><a>Editor</a></li>
            <li aria-expanded='false'><a>View</a></li>
        </ul>
        <ul className='uk-switcher uk-margin'>
            <li className='uk-active'>
              <div className='uk-flex uk-flex-center'>
                <select id='classNoteClass' className='uk-select uk-form-small uk-form-width-small'>
                  {classList}
                </select>
              </div>
              <div className='uk-margin'>
                <input id='classNoteTitle' className='uk-input uk-form-blank uk-form-large' type='Title' placeholder='Title'/>
              </div>
              <div className='uk-margin'>
                <textarea id='classNoteBody' className='uk-textarea uk-form-blank' rows='20' placeholder='Body' 
                  style={{margin: '0px', height: '110px', width: '100%', resize: 'none'}}></textarea>
              </div>
              <h3></h3>
              <a style={{borderRadius:'5px 0 0 5px'}} onClick={this.submitClassNote.bind(this)} className='uk-button uk-button-primary'>Post</a>
              <a style={{borderRadius:'0 5px 5px 0'}} onClick={this.submitClassNote.bind(this)} className='uk-button uk-button-default'>Save</a>
              <div id='cnVisualFeedback' className='unactive'/>
            </li>
            <li><NotesView notes={this.state.notes} classes={this.state.classes} 
              editNote={this.editNote.bind(this)} removeNote={this.removeNote.bind(this)}/></li>
        </ul>
      </div>
    )
  }

  /**
    * Fills in the editor with the values being edited and deletes the original instance
    */
  editNote(e) {
    UIkit.switcher(document.getElementById('classNotesSwitcher')).show(0)
    document.getElementById('classNoteClass').selectedIndex = this.state.classes.indexOf(this.state.notes[e.target.getAttribute('noteid')].cnClass)
    document.getElementById('classNoteBody').value = this.state.notes[e.target.getAttribute('noteid')].body
    document.getElementById('classNoteTitle').value = this.state.notes[e.target.getAttribute('noteid')].title

    this.removeNote(e)

    //this.state.notes)
  }

  /**
    * Removes the note and syncs to the database
    */
  removeNote(e) {
    //console.log(this.state.notes)
    //console.log('remove note')

    let n = this.state.notes
    this.state.notes.splice(e.target.getAttribute('noteid'), 1)
    this.setState({notes: n})

    localStorage.setItem('classNotesDB', btoa(JSON.stringify(this.state.notes)))
    let notesDB = { classNotes: btoa(JSON.stringify(this.state.notes)) }
    ref.update(notesDB)

    //console.log(this.state.notes)
  }

  /**
    * Called when the component mounts to sync class notes database
    */
  sync() {
    ref.on('value', (data) => {
      //console.log('REF.ON CALLED')
      //console.log(data.val())
      try {
        this.state.notes = JSON.parse(atob(data.val().classNotes))
        let n = this.state.notes
        this.setState({ n: this.state.notes })
      } catch (e) { }
    })
  }
}

/**
    * Checks if the notes received are meant to be displayed
    */
const noteInClasses = (note, classes) => {
  for (let i = 0; i < classes.length; i++) {
    if (note.cnClass === classes[i]) {
      return true
    }
  }
  return false
}


const NotesView = (props) =>  {
  //console.log('notesview: ' + props.notes)
  let rows
  let drafts = null
  noteID = -1

  /*let noNotes = false
  for (let i = 0; i < props.notes.length; i++) {
    if (noteInClasses(props.notes[i], props.classes)) {
      noNotes = true
      break
    }
  }*/

  //console.log(props.notes.length)

  if (props.notes.length === 0) {
    rows = (
      <h1 className='uk-heading-line uk-text-center' style={{marginTop:'50px',marginBottom:'50px'}}>
        <span>No class notes</span>
      </h1>
    )
  } else {
    if (userData.role !== 'Student') {
      drafts = props.notes.map(note => {
        if (note.draft && noteInClasses(note, props.classes)) {
          noteID++
          return <FillClassNote key={noteID} note={note} noteID={noteID} editNote={props.editNote} removeNote={props.removeNote} />
        }
      })
    }
    rows = props.notes.map(note => {
      if (!note.draft && noteInClasses(note, props.classes)) {
        noteID++
        return <FillClassNote key={noteID} note={note} noteID={noteID} editNote={props.editNote} removeNote={props.removeNote} />
      }
    })
  }

  let isEmpty = true

  for (let i=0;i<=rows.length;i++) {
    if (rows[i]!==undefined) {
      isEmpty = false
      break
    }
  }

  if (isEmpty) {
    rows = (
      <h1 className='uk-heading-line uk-text-center' style={{marginTop:'50px',marginBottom:'50px'}}>
        <span>No class notes</span>
      </h1>
    )
  }

  let draftUI
  if (userData.role !== 'Student' && drafts !== null) {
    draftUI = (
      <div>
        <ul id='classNotesList' className='uk-accordion' uk-accordion='multiple: true'>
        {drafts}
        </ul>
        <hr/>
      </div>
    )
    //console.log('drafts is set')
  } else {
    //console.log('drafts is empty')
  }
  
  return (
    <div>
      {draftUI}
      <ul id='classNotesList' className='uk-accordion' uk-accordion='multiple: true'>
        {rows}
      </ul>
    </div>
  )
}

const FillClassNote = (props) => {
  let options = null
  if (userData.role !== 'Student') {
    options = (
      <div className='uk-margin-top'>
        <button style={{borderRadius:'5px 0 0 5px'}} className='uk-button-default uk-button-small' noteid={props.noteID} onClick={props.editNote}><span className='uk-margin-small-right' uk-icon='pencil'/>Edit</button>
        <button style={{borderRadius:'0 5px 5px 0'}} className='uk-button-default uk-button-small' noteid={props.noteID} onClick={props.removeNote}><span className='uk-margin-small-right' uk-icon='trash'/>Remove</button>
      </div>
    )
  }

  let postedText = (props.note.draft) ? 'Drafted at ' : 'Posted at '

  return (
    <li className='uk-open'>
      <span className='uk-label'>{props.note.cnClass}</span>
      <a className='uk-accordion-title'>{props.note.title}</a>
      <b>{postedText}{props.note.date}</b>
      <div className='uk-accordion-content' aria-hidden='false'>
        <p>{props.note.body}</p>
        <p className='uk-margin-small-top'>
          <b>{props.note.author}</b>
        </p>
      </div>
      {options}
    </li>
  )
}