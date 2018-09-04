
/**
 * CLASS NOTES TO DO LIST
 *   - Ability to delete notes as teacher - Greg (i have a good idea about how i want to do this)
 *   - Fix CSS that broke when it became its own tab.
 *   - Look at possibly making this more uniform with notes. Entries start closed and an expand all button can open them all.
 *   - There is no 0 in front of one digit times. E.g. when i tested a post at 22:06 it showed 22:6
 *   - Modals where i wrote the comment below?
 *   - Some sort of visual feedback when a note is Submitted or saved to drafts
 *   - Currently the class changes back to option 1 after sending a note. Stop this. keep it at the same class by default
 *   - Fix up drafts style like i said in the draft i may or may not have posted in the software class!
 */



import React, { Component } from 'react'
const http = require('http')
const css = require('./ClassNotes.css')
let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
let noteID = 0
const MAX_CLASSES = 12

//
// TEMPORARY - FIX THIS QUIGLEY
//
const css2 = require('../Notes/Notes.css')

let userData
let userID

let ref
let fb
let database
let key = 0

class ClassNotes extends Component {
  constructor(props) {
    super(props)
    
    let notesState = []
    if (localStorage.getItem('classNotesDB')) {
      try {
        notesState = JSON.parse(atob("W10="))
        console.log(notesState)
      } catch (e) { console.log(e) }
    }
    
    this.state = {
      notes: notesState,
      classes: []
    }

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
    } else if (userData.role === 'Teacher') {
      classNotes = <TeacherNotes notes={this.state.notes} classes={this.state.classes} />
    }
    return classNotes
  }

  /** thief innit
   * Loop through all the user's classes
   * Add valid classes to classes array held in this.state
   */
  generateClasses() {
    this.state.classes = []
    for (let i = 1; i < MAX_CLASSES + 1; i++) {
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
  }

  submitClassNote(e) {
    let inputTitle = document.getElementById('classNoteTitle')
    let inputClass = document.getElementById('classNoteClass')
    let inputBody = document.getElementById('classNoteBody')
    let today = new Date()
    
    let date = today.getHours()+':'+today.getMinutes() +' on '+ today.getDate() + ' ' + (months[today.getMonth()]) + ' ' + today.getFullYear()
    let author = window.userData.givenName + ' ' + window.userData.surname
    
    if (inputTitle.value.length > 0 || inputBody.value.length > 0) {
      let title = inputTitle.value
      let cnClass = inputClass.value
      let body = inputBody.value
      let draft = e.target.innerHTML === 'Save'

      console.log(draft)
      console.log(e.target.innerHTML)

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

    } else {
      // modal, error?
    }
  }

  render() {
    let classList = this.state.classes.map(cls => {
      key++
      return <option key={key} title={cls}>{cls}</option>
    })

    return (
      <div>
        <ul className='uk-subnav uk-subnav-pill uk-flex uk-flex-center' uk-switcher=''>
            <li aria-expanded='true' className='uk-active'><a>Post</a></li>
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
                <textarea id='classNoteBody' className='uk-textarea uk-form-blank' rows='20' placeholder='Body' style={{margin: '0px', height: '110px', width: '100%', resize: 'none'}}></textarea>
              </div>
              <h3></h3>
              <a onClick={this.submitClassNote.bind(this)} className='uk-button uk-button-primary'>Submit</a>
              <a onClick={this.submitClassNote.bind(this)} className='uk-button uk-button-default'>Save</a>
            </li>
            <li><NotesView notes={this.state.notes} classes={this.state.classes} /></li>
        </ul>
      </div>
    )
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

const SingleNote = () => {
          return (
            <div>
              <FillClassNote key={noteID} note={note} />
              {noteOptions}
            </div>
          )
}

const NotesView = (props) =>  {
  console.log('notesview: ' + props.notes)
  let rows
  let drafts = null
  noteID = 0

  let noteOptions = null
  if (userData.role === 'Teacher') {
    noteOptions = (
      <div>
        <button>Edit</button>
        <button onClick={() => {props.notes}}>Remove</button>
      </div>
    )
  }

  if (props.notes.length === 0) {
    rows = <h1 className='uk-heading-line uk-text-center' style={{marginTop:'50px',marginBottom:'50px'}}><span>No class notes</span></h1>
  } else {
    if (userData.role === 'Teacher') {
      drafts = props.notes.map(note => {
        if (note.draft && noteInClasses(note, props.classes)) {
          noteid++
          SingleNote()
        }
      })
    }
    rows = props.notes.map(note => {
      if (!note.draft && noteInClasses(note, props.classes)) {
        noteid++
        SingleNote()
      }
    })
  }

  let draftUI
  if (userData.role === 'Teacher' && drafts !== null) {
    draftUI = (
      <div>
        <ul id='classNotesList' className='uk-accordion' uk-accordion='multiple: true'>
        {drafts}
        </ul>
        <hr />
      </div>
    )
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
  return (
    <li className='uk-open'>
      <span className='uk-label'>{props.note.cnClass}</span>
      <a className='uk-accordion-title'>{props.note.title}</a>
      <b>Posted at {props.note.date}</b>
      <div className='uk-accordion-content' aria-hidden='false'>
        <p>{props.note.body}</p>
        <p className='uk-margin-small-top'>
          <b>{props.note.author}</b>
        </p>
      </div>
    </li>
  )
}