import React, { Component } from 'react'
const css = require('./Notes.css')

let quill
window.notes = ''

class Notes extends Component {
  componentDidMount() {
    quill = new Quill('#editor', {
      modules: {
        toolbar: true
      },
      theme: 'bubble'
    })

    quill.setContents(window.notes)
  }

  notesChanged() {
    window.notes = quill.getContents()
    console.log(window.notes)
  }

  render() {
    return (
      <div className='uk-flex uk-flex-center'>
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
