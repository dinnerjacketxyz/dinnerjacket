import React, { Component } from 'react'
const http = require('http')
const css = require('./Notes.css')

// TODO reset database ID and all that innit
// otherwise we getting haced innit

let quill
let database = firebase.database()
let ref
let userID
let interval

class Notes extends Component {
  constructor(props) {
    super(props)

    window.addEventListener('beforeunload', (event) => {
      this.updateDB()
    }, false)
  }

  componentDidMount() {
    //userID = window.userData.username // FIX THIS
    http.get('/getdata?url=details/userinfo.json', (res) => {
      res.setEncoding('utf8')
      let data = ''
      res.on('data', (body) => {
        data += body
      })

      res.on('end', () => {
        userID = JSON.parse(data).username
        ref = database.ref('userNotes/' + userID)
        //this.init()
        this.retrieveDB()
      })
    })

    quill = new Quill('#editor', {
      modules: {
        toolbar: true
      },
      theme: 'snow', // OK I CHANGED IT FRICKER !
      placeholder: 'Write any notes here! Your notes are encoded and synced both locally and to the cloud. Highlight text or use keyboard shortcuts for formatting options such as bold, italics and headings.'
    })

    // Local Storage
    // Retrieve locally stored notes upon load, before database sync
    if (typeof(Storage) !== 'undefined') {
      // Local storage supported
      try {
        if (localStorage.getItem('content') != '') {
          quill.setContents(JSON.parse(atob(localStorage.getItem('content'))))
        }
      } catch (e) {
        console.log('Error setting note content')
      }
    } else {
      // Local storage not supported
    }
  }

  componentWillUnmount() {
    this.updateDB()
  }

  retrieveDB() {
    try {
      ref.once('value', (data) => {
        //console.log('FB Time ' + data.val().time)
        //console.log('Local Time ' + localStorage.getItem('time'))
        if (data.val().time > localStorage.getItem('time')) {
          // Firebase DB Newer
          quill.setContents(JSON.parse(atob(data.val().content)))
          localStorage.setItem('content', data.val().content)
          localStorage.setItem('time', data.val().time)
        } else {
          // Local Storage Newer
          if (quill.getText() != '') {
            quill.setContents(JSON.parse(atob(localStorage.getItem('content'))))
            let data = {
              content: localStorage.getItem('content'),
              time: localStorage.getItem('time')
            }
            ref.update(data)
          }
        }
      })

      console.log(JSONparse)
    } catch (e) {
      console.log('Error retrieving notes')
    }
  }

  updateDB() {
    try {
      let content = btoa(JSON.stringify(quill.getContents()))
      let time = new Date().getTime()
      //console.log(time)

      // Local storage
      // Sync string of notes object locally on text input to retrieve on component load
      if (typeof(Storage) !== 'undefined') {
        // Local storage supported
        localStorage.setItem('content', content)
        localStorage.setItem('time', time)
      } else {
        // Local storage not supported
      }

      // Notes Hosting - Firebase Database
      let data = {
        content: content,
        time: time
      }
      ref.update(data)
    } catch (e) {
      console.log('Error updating notes')
    }
  }

  render() {
    return (
      <div className='notesParent'>
        <div className='notesChild uk-animation-slide-top-small'>
          <div id='editor'onInput={this.updateDB.bind(this)}/>
        </div>
      </div>
    )
  }
}

export default Notes
