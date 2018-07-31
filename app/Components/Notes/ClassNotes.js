import React, { Component } from 'react'
const http = require('http')
const css= require('./ClassNotes.css')

class Timetable extends Component {
  constructor(props) {
    super(props)

    this.state = {
      classNotes: [], // Array containing all notices to be rendered
      subject: window.subject, // Value in year filter dropdown
      openOrClose: 'EXPAND', // State indicating whether all notices are expanded or collapsed
      keywords: [] // Current search keywords entered into input box
    }
    console.log(window.userData.role)
  }

  selectSub() {}

  search() {}

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

export default Timetable

/*
        <div>
          <div>
            <ul id="classNotesList" className="uk-accordion" uk-accordion="multiple: true">
              <li className="uk-open"><span className="uk-label">ALL</span><a className="uk-accordion-title">NCSS Programming Challenge</a><b>Aug 30, Lunch 1</b><div className="uk-accordion-content" aria-hidden="false">If you have signed up to the NCSS Programming Challenge or are helping as a mentor, please meet in room 802 at the start of lunch today.<p className="uk-margin-small-top"><b>D Comben</b></p></div></li>
            </ul>
          </div>
        </div>


          
*/

const TeacherNotes = () =>  {
  return(
    <div>
      <ul className="uk-subnav uk-subnav-pill uk-flex uk-flex-center" uk-switcher="">
          <li aria-expanded="true" className="uk-active"><a href="#">Post</a></li>
          <li aria-expanded="false"><a href="#">View</a></li>
      </ul>
      <ul className="uk-switcher uk-margin">
          <li className="uk-active">
            <div className="uk-flex uk-flex-center">
              <select className="uk-select uk-form-small uk-form-width-small">
                <option>7 ENG 1</option>
              </select>
            </div>
            <div className="uk-margin">
              <input className="uk-input uk-form-blank uk-form-large" type="Title" placeholder="Title"/>
            </div>
            <div className="uk-margin">
              <textarea className="uk-textarea uk-form-blank" rows="5" placeholder="Body" style={{margin: '0px', height: '110px', width: '100%'}}></textarea>
            </div>
            <h3></h3>
            <button className="uk-button uk-button-primary" href="">Submit</button>
            <button className="uk-button uk-button-default" href="">Save</button>
          </li>
          <li><NotesView/></li>
      </ul>
    </div>
  )
}

const NotesView = () =>  {
  return(
    <ul id="classNotesList" className="uk-accordion" uk-accordion="multiple: true">
      <li className="uk-open"><span className="uk-label">ALL</span><a className="uk-accordion-title">Title</a><b>Date</b><div className="uk-accordion-content" aria-hidden="false">Body<p className="uk-margin-small-top"><b>Author</b></p></div></li>
    </ul>
  )
}