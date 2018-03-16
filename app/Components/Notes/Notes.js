import React, { Component } from 'react'
import { pbkdf2 } from 'crypto';

// TODO reset database ID and all that innit
// otherwise we getting haced innit

let quill
let database = firebase.database()
let ref
let userID

class Notes extends Component {
  componentDidMount() {
    userID = window.userData.username // FIX THIS
    ref = database.ref('userNotes/' + userID)

    quill = new Quill('#editor', {
      modules: {
        toolbar: true
      },
      theme: 'bubble',
      placeholder: 'test placeholder'
    })

    // Local Storage
    // Retrieve locally stored notes upon load, before database sync
    if (typeof(Storage) !== 'undefined') {
      // Local storage supported
      quill.setContents(JSON.parse(localStorage.getItem('content')))
    } else {
      // Local storage not supported
    }  
    this.retrieveDB()
  }

  retrieveDB() {
    ref.once('value', (data) => {
      console.log('FB Time ' + JSON.stringify(data.val().time))
      console.log('Local Time ' + JSON.stringify(localStorage.getItem('time')))
      if (data.val().time > localStorage.getItem('time')) {
        // Firebase DB Newer
        quill.setContents(JSON.parse(data.val().content))
        localStorage.setItem('content', data.val().content)
        localStorage.setItem('time', data.val().time)
      } /*else {
        quill.setContents(JSON.parse(localStorage.getItem('content')))
      }*/
    })
  }

  componentWillUnmount() {
    this.updateDB()
  }

  updateDB() {
    let content = JSON.stringify(quill.getContents())
    let time = new Date()
    
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

// OLD CODE


    /*ref.once('value', (data) => {
      console.log(data.val())
      quill.setContents(data.val())
    })*/

    /*let localTime

    // Local Storage
    // Retrieve locally stored notes upon load, before database sync
    if (typeof(Storage) !== 'undefined') {
      // Local storage supported
      quill.setContents(JSON.parse(localStorage.getItem('content')))
      localTime = localStorage.getItem('time')
    } else {
      // Local storage not supported
    }    

    // Notes Hosting - Firebase Database
    ref.once('value', (data) => {
      console.log(data.val().time)

      if (data.val().time > localTime) {
        localStorage.setItem('content', data.val().content)
        localStorage.setItem('time', data.val().time)
        quill.setContents(JSON.parse(data.val().content))
      }
    })*/

    //this.retrieveDB()

    //abc = setInterval(() => { this.retrieveDB() }, 5000)

     /*retrieveDB() {
    console.log('retrieveDB')
    let content
    let time
    ref.once('value', (data) => {
      content = JSON.parse(data.val().content)
      time = data.val().time
    })
    
    if (time > localStorage.getItem('time')) {
      localStorage.setItem('content', JSON.stringify(content))
      localStorage.setItem('time', time)
      quill.setContents(content)
    }
  }*/

  /*retrieveDB() {
    let time
    let content

    ref.once('value', (data) => {
      content = JSON.parse(data.val().content)
      time = data.val().time
    })

    if (time > localStorage.getItem('time')) {
      // DB newer
      localStorage.setItem('content', JSON.stringify(content))
      localStorage.setItem('time', time)
    } else {
      // Local storage newer
      content = JSON.parse(localStorage.getItem('content'))
      let data = {
        content: content,
        time: new Date()
      }
      ref.update(data)
    }

    quill.setContents(content)
  }*/
  
  /*
   * Newer date > Older date
   * Check if firebase time > localStorage time
   * If true, quill.setContent(firebase note)
   * Else, do nothing
   */

 /*updateDB() {
    if (!firstSync) {
      let data = {
        content: quill.getContents()
      }

      ref.update(data)
    }
    firstSync = false
  }

  retrieveFromDB() {
    ref.once('value', (data) => {
      console.log(data.val())
    })
  }*/