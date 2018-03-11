import React, { Component } from 'react'
const css = require('./Notes.css')

window.notes = ''

class Notes extends Component {
  componentDidMount() {
    const quill = new Quill('#editor', {
      modules: {
        toolbar: true
      },
      theme: 'bubble'
    })
  }

  notesChanged() {
    let editor = document.getElementById('editor')
    window.notes = editor.innerHTML
  }

  render() {
    return (
      <div className='uk-flex uk-flex-center'>
        <div className='uk-margin-top uk-grid-collapse uk-width-xxlarge miniFill'>
          <div className='uk-card uk-card-default uk-card-body uk-animation-slide-top-small'>
            <div className='uk-margin'>
              <div id='editor' onInput={this.notesChanged.bind(this)}>{window.notes}</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Notes
