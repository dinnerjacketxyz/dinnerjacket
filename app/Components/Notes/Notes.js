// Sync notes (list detailed modules this file covers later)
// George

// localstorage only - below is the WIP firebase code
import React, { Component } from 'react'
const http = require('http')
const css = require('./Notes.css')

let quill

class Notes extends Component {
  constructor(props) {
    super(props)

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
        "Write any notes here! Notes are encoded and are not visible to anyone else. Notes are currently stored locally on your device. In future, notes will seamlessly sync across all your devices."
    })

    // Add previously saved text into quill editor
    if (localStorage.getItem('content') != '') {
      try {
        quill.setContents(JSON.parse(atob(localStorage.getItem('content'))))
      } catch (e) {
        console.log(e)
      }
    }
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
        "Write any notes here! Notes are encrypted and are not visible to anyone else. Notes are currently stored locally on your device. In future, notes will seamlessly sync across all your devices."
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