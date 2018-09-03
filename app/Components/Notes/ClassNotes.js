import React, { Component } from 'react'
const http = require('http')
const css = require('./ClassNotes.css')
let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
let classNotesArray = []
let noteID = 0
const MAX_CLASSES = 12

let userData
let userID

let ref
let fb
let database

class ClassNotes extends Component {
  constructor(props) {
    super(props)

    userData = props.userData

    //fb = require('../../fb')(window.firebase)
    //database = window.firebase.database()

    userID = btoa(userData.username)
    console.log('Username: ' + userID)

    ref = props.database.ref('classNotes/' + userID) //sort by userID or subject or...????
  }

  render() {
    let classNotes
    if (userData.role === 'Student') {
      classNotes = <NotesView array={classNotesArray} />
    } else if (window.userData.role === 'Teacher') {
      classNotes = <TeacherNotes />
    }
    return (classNotes)
  }
}

export default ClassNotes

class TeacherNotes extends Component {
  constructor(props){
    super(props)
    this.state = {
      array: classNotesArray,
      classes: []
    }
    this.generateClasses()
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

  submitClassNote() {
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

      let cn = {
        title: title, 
        body: body, 
        cnClass: cnClass, 
        date: date, 
        author: author
      }

      classNotesArray.push(cn)
      this.setState({array: classNotesArray})
      console.log('teachernotes: '+ classNotesArray[0].title)
    } else {

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
              <textarea id='classNoteBody' className='uk-textarea uk-form-blank' rows='5' placeholder='Body' style={{margin: '0px', height: '110px', width: '100%', resize: 'none'}}></textarea>
            </div>
            <h3></h3>
            <a onClick={this.submitClassNote.bind(this)} className='uk-button uk-button-primary'>Submit</a>
            <a className='uk-button uk-button-default'>Save</a>
          </li>
          <li><NotesView array={this.state.array}/></li>
      </ul>
    </div>
    )
  }
}

const NotesView = (props) =>  {
  console.log('notesview: '+props.array)
  let rows
  if (props.array.length == 0) {
    rows = <h1 className='uk-heading-line uk-text-center' style={{marginTop:'50px',marginBottom:'50px'}}><span>No class notes</span></h1>
  } else {
    noteID++
    rows = props.array.map(note => {
      return <FillClassNote key={noteID} note={note} />
    })
  }
  
  return(
    <ul id='classNotesList' className='uk-accordion' uk-accordion='multiple: true'>
      {rows}
    </ul>
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