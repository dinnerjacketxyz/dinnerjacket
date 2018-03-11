import React, { Component } from 'react'
const css1 = require('./Notes.css')
const css = require('!style-loader!css-loader!react-simplemde-editor/dist/simplemde.min.css')
const SimpleMDE = require('react-simplemde-editor')

let note = {
  headings: ['# Welcome'],
  content: '# Welcome'
}

let selection = -1

let autosaveID = 'userNotes'

// testing
let headingIndex = -1
let concatHeading = true
let allowHeading = true

class Notes extends Component {
  componentDidMount() {
  }

  render() {
    return (
      <div className='uk-flex uk-flex-center'>
        <div className='uk-margin-top uk-grid-collapse uk-width-xxlarge miniFill'>
          <div className='uk-card uk-card-default uk-card-body uk-animation-slide-top-small'>
            <div className='uk-margin'>
              <SimpleMDE id='inputContent' value={note.content} options={{
                autofocus: true,
                autosave: {
                  enabled: true,
                  uniqueID: 'a',
                  delay: 1000
                }
              }}></SimpleMDE>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Notes
