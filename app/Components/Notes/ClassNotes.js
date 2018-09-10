
/**
 * CLASS NOTES TO DO LIST
 *   - Ability to delete notes as teacher - Greg (i have a good idea about how i want to do this)
 *   - Look at possibly making this more uniform with notices. Entries start closed and an expand all button can open them all.
 *   - Currently the class changes back to option 1 after sending a note. Stop this. keep it at the same class by default
 *   - Fix up drafts style like i said in the draft i may or may not have posted in the software class!
 */



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
    
    if (localStorage.getItem('classNotesDB')) {
      try {
        this.state.notes = JSON.parse(atob(localStorage.getItem('classNotesDB')))
      } catch (e) { console.log(e) }
    }

    let n = this.state.notes
    this.setState({ n: this.state.notes })

    userData = props.userData
    
    userID = btoa(userData.username)
    console.log('Username: ' + userID)
    
    ref = props.database.ref('classNotes/') //sort by userID or subject or...????
    
    this.generateClasses()

    console.log(btoa(JSON.stringify(this.state.notes)))

    ref.on('value', (data) => {
      console.log('REF.ON CALLED')
      console.log(data.val())
      try {
        this.state.notes = JSON.parse(atob(data.val().classNotes))
        let n = this.state.notes
        this.setState({ n: this.state.notes })
      } catch (e) { }
    })
  }

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
    for (let i = 0; i < 4; i++) {
      if (window.timetable.subjects[i] !== -1 && window.timetable.subjects[i].shortTitle[0] !== '_') {      
        let subject = window.timetable.subjects[i].year + window.timetable.subjects[i].shortTitle
        this.state.classes.push(subject)
      }
    }
    console.log(this.state.classes)
  }
}

export default ClassNotes

class TeacherNotes extends Component {
  constructor(props){
    super(props)
    this.state = {
      notes: props.notes,
      classes: props.classes
    } 

    this.sync()
  }

  componentWillUnmount() {
    window.onLeave = true
    this.submitClassNote()
  }

  componentDidMount() {
    document.getElementById('classNoteClass').selectedIndex = window.saveComboIndex
  }

  submitClassNote(e) {
    console.log('on leave: '+window.onLeave)
    let inputTitle = document.getElementById('classNoteTitle')
    let inputClass = document.getElementById('classNoteClass')
    let inputBody = document.getElementById('classNoteBody')
    let today = new Date()
    let date

    if (today.getHours().length == 1) {
      date = '0'+today.getHours()+':'+today.getMinutes() +' on '+ today.getDate() + ' ' + (months[today.getMonth()]) + ' ' + today.getFullYear()
    } else if (today.getMinutes().length == 1) {
      date = today.getHours()+':0'+today.getMinutes() +' on '+ today.getDate() + ' ' + (months[today.getMonth()]) + ' ' + today.getFullYear()
    } else {
      date = today.getHours()+':'+today.getMinutes() +' on '+ today.getDate() + ' ' + (months[today.getMonth()]) + ' ' + today.getFullYear()
    }
    
    let author = window.userData.givenName + ' ' + window.userData.surname
    
    if (inputTitle.value.length > 0 || inputBody.value.length > 0) {
      let title = inputTitle.value
      let cnClass = inputClass.value
      
      let body = inputBody.value

      let draft
      if(window.onLeave) {
        draft = true
      } else {
        draft = e.target.innerHTML === 'Save'
      }
      

      //console.log(draft)
      //console.log(e.target.innerHTML)

      let cn = {
        title: title, 
        body: body, 
        cnClass: cnClass, 
        date: date, 
        author: author,
        draft: draft
      }
      
      this.state.notes.unshift(cn)
      let notes = this.state.notes
      this.setState({ notes: this.state.notes })
      localStorage.setItem('classNotesDB', btoa(JSON.stringify(this.state.notes)))
      
      let notesDB = { classNotes: btoa(JSON.stringify(this.state.notes)) }
      ref.update(notesDB)

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
      UIkit.modal.alert('Your title and/or body was empty. Please fill these fields and try again')
    }
  }

  //Event method fired when a tab is clicked
  tabInput(e) {
    console.log(e.target.innerText)
    if (document.getElementById(e.target.innerText.toLowerCase()) != null) {
      if (e.target.innerText.toLowerCase() == 'editor') {
        document.getElementById('editor').style.visibility = 'visible'
        document.getElementById('editor').style.display = 'block'
        document.getElementById('view').style.visibility = 'hidden'
        document.getElementById('view').style.display = 'none'
      } else if (e.target.innerText.toLowerCase() == 'view') {
        document.getElementById('view').style.visibility = 'visible'
        document.getElementById('view').style.display = 'block'
        document.getElementById('editor').style.visibility = 'hidden'
        document.getElementById('editor').style.display = 'none'
      }
    }
  }

  render() {
    let classList = this.state.classes.map(cls => {
      key++
      return <option key={key} title={cls}>{cls}</option>
    })

    return (
      <div className=''>
        <ul onClick={this.tabInput.bind(this)} id='classNotesSwitcher' className='uk-margin-bottom uk-flex-center' uk-tab=''>
            <li aria-expanded='true' className='uk-active'><a>Editor</a></li>
            <li aria-expanded='false'><a>View</a></li>
        </ul>
        <div id='editor' style={{visibility:'visible',display:'block'}}>
          <p>Class</p>
          <select id='classNoteClass' className='uk-select uk-form-small uk-form-width-small'>
            {classList}
          </select>
          
          <hr/>

          <p>Due date</p>

          <input className='uk-input uk-form-blank' type="date" placeholder='dd/mm/yyyy'/>
          
          <hr/>

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
        </div>
        <div id='view' style={{visibility:'hidden',display:'none'}}><NotesView notes={this.state.notes} classes={this.state.classes} 
          editNote={this.editNote.bind(this)} removeNote={this.removeNote.bind(this)}/></div>
      </div>
    )
  }

  editNote(e) {
    UIkit.tab(document.getElementById('classNotesSwitcher')).show(0)
    document.getElementById('classNoteClass').selectedIndex = this.state.classes.indexOf(this.state.notes[e.target.getAttribute('noteid')].cnClass)
    document.getElementById('classNoteBody').value = this.state.notes[e.target.getAttribute('noteid')].body
    document.getElementById('classNoteTitle').value = this.state.notes[e.target.getAttribute('noteid')].title

    this.removeNote(e)

    console.log(this.state.notes)
  }

  removeNote(e) {
    console.log(this.state.notes)
    console.log('remove note')

    let n = this.state.notes
    this.state.notes.splice(e.target.getAttribute('noteid'), 1)
    this.setState({notes: n})

    localStorage.setItem('classNotesDB', btoa(JSON.stringify(this.state.notes)))
    let notesDB = { classNotes: btoa(JSON.stringify(this.state.notes)) }
    ref.update(notesDB)

    console.log(this.state.notes)
  }

  sync() {
    ref.on('value', (data) => {
      console.log('REF.ON CALLED')
      console.log(data.val())
      try {
        this.state.notes = JSON.parse(atob(data.val().classNotes))
        let n = this.state.notes
        this.setState({ n: this.state.notes })
      } catch (e) { }
    })
  }
}

const noteInClasses = (note, classes) => {
  for (let i = 0; i < classes.length; i++) {
    if (note.cnClass === classes[i]) {
      return true
    }
  }
  return false
}

const NotesView = (props) =>  {
  console.log('notesview: ' + props.notes)
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
    console.log('drafts is set')
  } else {
    console.log('drafts is empty')
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