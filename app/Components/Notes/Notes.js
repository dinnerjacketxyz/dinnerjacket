import React, { Component } from 'react'
const http = require('http')
const css = require('./Notes.css')

let quill

class Notes extends Component {
  constructor(props) {
    super(props)

    window.addEventListener('beforeunload', (event) => {
      this.updateDB()
    }, false)
  }

  componentDidMount() {
    let content = document.getElementById('content')
    content.className = 'full vcNavbarParent'

    quill = new Quill('#editor', {
      modules: {
        toolbar: true
      },
      theme: 'snow', // OK I CHANGED IT FRICKER !
      placeholder:
        "Write any notes here! Notes are encoded and are not visible to anyone else. Notes are currently stored locally on your device. In future, notes will seamlessly sync across all your devices."
    })

    if (localStorage.getItem('content') != '') {
      try {
        quill.setContents(JSON.parse(atob(localStorage.getItem('content'))))
      } catch (e) {
        console.log(e)
      }
    }
  }

  componentWillUnmount() {
    this.updateDB()
    let content = document.getElementById('content')
    content.className = 'full'
  }

  updateDB() {
    let content = btoa(JSON.stringify(quill.getContents()))
    localStorage.setItem('content', content)
  }

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
