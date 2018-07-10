// Sync notes (list detailed modules this file covers later)
// George

// localstorage only - below is the WIP firebase code
import React, { Component } from 'react'
const http = require('http')
const css = require('./Notes.css')

let quill

let currentID = 0
let noteTabID = 0
let firstLoad = false

class Notes extends Component {
  constructor(props) {
    super(props)

    this.state = {
      notes: [],
      selected: 0
    }
  
    //restore notes from localstorage and selection from window var
    if (localStorage.getItem('notesDB') === null) {
      this.state.notes.push(this.noteStruct('My Notes', '', currentID))
    } else {
      this.state.notes = JSON.parse(atob(localStorage.getItem('notesDB')))
      if (localStorage.getItem('content') !== null) {
        firstLoad = true
        this.state.notes[0].content = atob(localStorage.getItem('content'))
        localStorage.removeItem('content')
      }
    }
  

    // questionable innit
    window.addEventListener('beforeunload', (event) => {
      // Autosaves before enduser exits notes
      this.updateDB()
    }, false)
  }

  componentDidMount() {
    let content = document.getElementById('content')
    content.className = 'full vcNavbarParent'
    
    // Initialise quill editor
    quill = new Quill('#editor', {
      modules: {
        toolbar: true
      },
      // Snow theme displays formatting options above text box
      theme: 'snow', // OK I CHANGED IT FRICKER !
      placeholder:
      'Write any notes here! Notes are encoded and are not visible to anyone else. Notes are currently stored locally on your device. In future, notes will seamlessly sync across all your devices.'
    })

    this.initNote()
  }

  componentWillUnmount() {
    // Autosaves before enduser exits notes
    this.updateDB()
    let content = document.getElementById('content')
    content.className = 'full'
  }

  updateDB() {
    // Save notes in localStorage in unreadable format
    //let content = btoa(JSON.stringify(quill.getContents()))
    //localStorage.setItem('content', content)


    let content = quill.getContents()
    this.state.notes[this.state.selected].content = JSON.stringify(content)

    localStorage.setItem('notesDB', btoa(JSON.stringify(this.state.notes)))
  }

  noteStruct(ttl, cnt, ID) {
    let note = {
      title: ttl,
      content: cnt,
      id: ID
    }
    return note
  }

  /*rows = this.state.notices.map(notice => {
    return <CollapsedNotices key={notice.ID} notices={notice} />
  })*/

  initNote() {
    let content = this.state.notes[this.state.selected].content
    if (firstLoad || content !== '') {
      quill.setContents(JSON.parse(content))
      firstLoad = false
    }
  }

  createNote(e) {
    this.updateDB()
    currentID++
    let n = this.state.notes
    this.setState({ n: n.push(this.noteStruct(e.target.title, '', this.state.notes.length)) })
    console.log(this.state.notes)
  }

  selectNote(e) {
    this.updateDB()
    //console.log(e.target.id)
    this.state.selected = e.target.id
    
    let content = this.state.notes[this.state.selected].content
    if (content === '') {
      quill.setText('')
    } else {
      quill.setContents(JSON.parse(content))
    }
  }

  // Render uikit card and quill editor
  render() {
    let key = 0
    let notes = this.state.notes.map(note => {
      key++
      return <li key={key} onClick={this.selectNote.bind(this)}><a id={note.id}>{note.title}</a></li>
    })

    return (
      <div className='vcNavbarCard notesParent'>
        <div className='notesChild card uk-animation-slide-top-small'>
          <ul className='uk-subnav uk-subnav-pill uk-flex-center' uk-switcher='animation: uk-animation-fade'>
            {notes}
          </ul>
          <div className='pad'>
            <div id='editor' onInput={this.updateDB.bind(this)}/>
          </div>
          <div className="">
            <a uk-icon="plus-circle" uk-tooltip="title: Add custom notes; pos: bottom-center;"></a>
            <div uk-dropdown="mode: click;pos: top-center">
              <p id='77' title='Item' onClick={this.createNote.bind(this)}>Item</p>
              <p className='uk-text-left'>Title</p>
              <input className="uk-input" type="text" placeholder="Title" maxLength='10'/>
              <button className="uk-margin-top uk-button uk-button-default">Add</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Notes

/*
<ul className='uk-switcher uk-margin'>
              <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</li>
              <li>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</li>
              <li>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur, sed do eiusmod.</li>
          </ul>

*/


//fb code innit

/*// Sync notes (list detailed modules this file covers later)
// George

import React, { Component } from 'react'
const http = require('http')
const css = require('./Notes.css')

let ref
let quill
let userID
let offline
const firebase = require('firebase')
const fb = require('./fb')(firebase)
let database = firebase.database()

let lastNotes

class Notes extends Component {
  constructor(props) {
    super(props)

    this.getUserID()

    // questionable innit
    window.addEventListener('beforeunload', (event) => {
      // Autosaves before enduser exits notes
      this.updateDB()
    }, false)
  }

  interval() {
    console.log('test')

    /*if (quill.getText() === lastNotes) {
      console.log('test2')
      // no edits have been made in the last 5 seconds
      //this.retrieveDB()
      this.retrieveDB
    }*/

/*    ref.once('value', (data) => {
      if (data.val().content !== localStorage.getItem('content')) {
        console.log('test')
        retrieveDB(data.val().content)
      }
    })

    lastNotes = quill.getText()

    function retrieveDB(content) {
      quill.setContents(JSON.parse(atob(content)))
      localStorage.setItem('content', content)
    }
  }

  componentDidMount() {
    let content = document.getElementById('content')
    content.className = 'full vcNavbarParent'

    // Initialise quill editor
    quill = new Quill('#editor', {
      modules: {
        toolbar: true
      },
      // Snow theme displays formatting options above text box
      theme: 'snow', // OK I CHANGED IT FRICKER !
      placeholder:
        'Write any notes here! Notes are encrypted and are not visible to anyone else. Notes are currently stored locally on your device. In future, notes will seamlessly sync across all your devices.'
    })

    // Add previously saved text into quill editor
    if (localStorage.getItem('content') !== '') {
      try {
        quill.setContents(JSON.parse(atob(localStorage.getItem('content'))))
      } catch (e) {
        console.log(e)
      }
    }

    lastNotes = quill.getText()
  }

  getUserID() {
    http.get('/getdata?token=' + localStorage.getItem('accessToken') + '&url=details/userinfo.json', (res) => {
      res.setEncoding('utf8')
      let data = ''
      res.on('data', (body) => {
        data += body
      })
      res.on('end', () => {
        try {
          userID = btoa(JSON.parse(data).username)
          if (userID !== undefined) {
            console.log(userID)
            ref = database.ref('userNotes/' + userID)
            ref.once('value', (data) => {
              this.retrieveDB(data.val().content)
            })
            setInterval(this.interval, 5000)
          }
        } catch (e) {
          console.log('error getting userID')
          //getUserID()
        }
      })
    })
  }

  componentWillUnmount() {
    // Autosaves before enduser exits notes
    this.updateDB()
    let content = document.getElementById('content')
    content.className = 'full'
  }

  updateDB() {
    // Save notes in localStorage in unreadable format
    let content = btoa(JSON.stringify(quill.getContents()))
    let data = { content: content }
    localStorage.setItem('content', content)
    try {
      ref.update(data)
    } catch (e) {
      console.log(e)
    }
  }

  retrieveDB(content) {
    //ref.once('value', (data) => {
    //  quill.setContents(JSON.parse(atob(data.val().content)))
    //  localStorage.setItem('content', data.val().content)
    //})
    quill.setContents(JSON.parse(atob(content)))
    localStorage.setItem('content', content)
  }

  // Render uikit card and quill editor
  render() {
    return (
      <div className='vcNavbarCard notesParent'>
        <div className='notesChild card uk-animation-slide-top-small'>
          <div className='pad'>
            <div id='editor' onInput={this.updateDB.bind(this)}/>
          </div>
        </div>
      </div>
    )
  }
}

export default Notes
*/