import React, { Component } from 'react'
const http = require('http')

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
      theme: 'bubble',
      placeholder: 'Notes\n\n- Use this tab to take note of homework, or anything else.\n- Notes are stored locally and in an online database so they stay with you on every device.\n- Your notes are encoded so they are visible only to you.\n- Finally, highlight text or use keyboard shortcuts to format text (bold, italics, headings etc.)'
    })
  
    // Local Storage
    // Retrieve locally stored notes upon load, before database sync
    if (typeof(Storage) !== 'undefined') {
      // Local storage supported
      quill.setContents(JSON.parse(atob(localStorage.getItem('content'))))
    } else {
      // Local storage not supported
    }
  }

  retrieveDB() {
    ref.once('value', (data) => {
      console.log('FB Time ' + data.val().time)
      console.log('Local Time ' + localStorage.getItem('time'))
      if (data.val().time > localStorage.getItem('time')) {
        // Firebase DB Newer
        quill.setContents(JSON.parse(atob(data.val().content)))
        localStorage.setItem('content', data.val().content)
        localStorage.setItem('time', data.val().time)
      } else {
        // Local Storage Newer
        quill.setContents(JSON.parse(atob(localStorage.getItem('content'))))
        let data = {
          content: localStorage.getItem('content'),
          time: localStorage.getItem('time')
        }
        ref.update(data)
      }
    })
  }

  componentWillUnmount() {
    this.updateDB()
  }

  updateDB() {
    let content = btoa(JSON.stringify(quill.getContents()))
    let time = new Date().getTime()
    console.log(time)
  
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
  }

  render() {
    return (
      <div className='uk-flex uk-flex-center'>
        <div className='uk-margin-top uk-grid-collapse uk-width-xxlarge miniFill'>
          <div className='uk-card uk-card-default uk-card-body uk-animation-slide-top-small'>
            <div className='uk-margin'>
              <div id='editor' onInput={this.updateDB.bind(this)}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Notes
