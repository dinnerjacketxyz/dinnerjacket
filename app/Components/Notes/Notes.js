import React, { Component } from 'react'
const css = require('./Notes.css')

let quill
window.notes = ''

let database = firebase.database()
let ref = database.ref('userNotes')

//let ref = new Firebase('1')

class Notes extends Component {
  componentDidMount() {
    quill = new Quill('#editor', {
      modules: {
        toolbar: true
      },
      theme: 'bubble'
    })

    if (window.notes === '') {
      quill.setContents([
        { insert: 'Notes\n\n', attributes: { header: true, bold: true } },
        { insert: '- Placeholder' },
        { insert: '\n' }
      ])
    } else {
      quill.setContents(window.notes)
    }
  }

  notesChanged() {
    window.notes = quill.getContents()
    console.log(window.notes)
  }

  sync() {
    // TODO this creates a new entry under each userID with a different unique key
    // Only latest note needs to be stored
    ref.child('123').push(quill.getContents())
  }

  render() {
    return (
      <div className='uk-flex uk-flex-center'>
        <button onClick={this.sync.bind(this)}>Sync</button>
        <div className='uk-margin-top uk-grid-collapse uk-width-xxlarge miniFill'>
          <div className='uk-card uk-card-default uk-card-body uk-animation-slide-top-small'>
            <div className='uk-margin'>
              <div id='editor' onInput={this.notesChanged.bind(this)} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Notes
