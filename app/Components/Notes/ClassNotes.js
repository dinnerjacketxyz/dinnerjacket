import React, { Component } from 'react'
const http = require('http')
const css= require('./ClassNotes.css')
let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
let classNotesArray = []
let noteID = 0

class ClassNotes extends Component {
  constructor(props) {
    super(props)
    
  }

  render() {
    let classNotes
    if (window.userData.role==='Student') {
      classNotes = <NotesView/>
    } else if (window.userData.role==='Teacher') {
      classNotes = <TeacherNotes/>
    }
    return (classNotes)
  }
}

export default ClassNotes

const TeacherNotes = () =>  {
  function submitClassNote() {
    let inputTitle = document.getElementById('classNoteTitle')
    let inputClass = document.getElementById('classNoteClass')
    let inputBody = document.getElementById('classNoteBody')
    let today = new Date()
    
    let date = today.getHours()+':'+today.getMinutes() +' on '+ today.getDate() + ' ' + (months[today.getMonth()]) + ' ' + today.getFullYear()
    let author = window.userData.givenName + ' ' + window.userData.surname
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
    console.log('teachernotes: '+ classNotesArray[0].title)
  }

  return(
    <div>
      <ul className="uk-subnav uk-subnav-pill uk-flex uk-flex-center" uk-switcher="">
          <li aria-expanded="true" className="uk-active"><a>Post</a></li>
          <li aria-expanded="false"><a>View</a></li>
      </ul>
      <ul className="uk-switcher uk-margin">
          <li className="uk-active">
            <div className="uk-flex uk-flex-center">
              <select id='classNoteClass' className="uk-select uk-form-small uk-form-width-small">
                <option>7 ENG 1</option>
                <option>8 ENG 1</option>
              </select>
            </div>
            <div className="uk-margin">
              <input id='classNoteTitle' className="uk-input uk-form-blank uk-form-large" type="Title" placeholder="Title"/>
            </div>
            <div className="uk-margin">
              <textarea id='classNoteBody' className="uk-textarea uk-form-blank" rows="5" placeholder="Body" style={{margin: '0px', height: '110px', width: '100%'}}></textarea>
            </div>
            <h3></h3>
            <a onClick={submitClassNote} className="uk-button uk-button-primary">Submit</a>
            <a className="uk-button uk-button-default">Save</a>
          </li>
          <li><NotesView/></li>
      </ul>
    </div>
  )
}

const NotesView = () =>  {
  console.log('notesview: '+classNotesArray)
  let rows
  if (classNotesArray.length == 0) {
    rows = <h1 className='uk-heading-line uk-text-center'><span>No class notes</span></h1>
  } else {
    noteID++
    rows = classNotesArray.map(note => {
      return <FillClassNote key={noteID} note={note} />
    })
  }
  
  return(
    <ul id="classNotesList" className="uk-accordion" uk-accordion="multiple: true">
      {rows}
    </ul>
  )
}

const FillClassNote = (props) => {
  return (
    <li className="uk-open">
      <span className="uk-label">{props.note.cnClass}</span>
      <a className="uk-accordion-title">{props.note.title}</a>
      <b>Posted at {props.note.date}</b>
      <div className="uk-accordion-content" aria-hidden="false">
        <p>{props.note.body}</p>
        <p className="uk-margin-small-top">
          <b>{props.note.author}</b>
        </p>
      </div>
    </li>
  )
}