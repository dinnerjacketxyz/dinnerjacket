import React, { Component } from 'react'
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
        <div className='uk-margin-large-left uk-margin-top uk-margin-large-right uk-grid-collapse uk-width-3-5@xl' uk-grid='true' uk-sortable = 'handle: .uk-sortable-handle'>
          <div className='uk-width-expand'>
            <div className='uk-card uk-card-default uk-card-body'>
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
      </div>
    )
  }
}

export default Notes
