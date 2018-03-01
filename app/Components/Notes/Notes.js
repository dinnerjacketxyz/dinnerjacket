import React, { Component } from 'react'
const css = require('./styles.css')
const SimpleMDE = require('react-simplemde-editor')

let note = {
  headings: ['# Welcome'],
  content: '# Welcome'
}

let selection = -1

// testing
let headingIndex = -1
let concatHeading = true
let allowHeading = true

class Notes extends Component {
  componentDidMount() {
    selection = 0
    this.displayList()
    this.updateEditor(selection)
  }

  addNote() {
    note.headings.push('#')
    console.log(note.headings)
    this.displayList()
    //this.updateEditor()
  }

  displayList() {
    console.log('display list is being called')

    let titleList = ''
    for (let i = 0; i < note.headings.length; i++) {
      titleList += `<tr><td id='${i}'>${note.headings[i]}</td></tr>`
    }
    let list = document.getElementById('noteList')
    list.innerHTML = titleList
  }

  updateEditor(e) {
    // Scroll to appropriate heading when title in noteList is clicked innit

    let editor = document.getElementById('inputContent')
    editor.value = note.content
  }

  syncContent() {
    //let editor = document.getElementById('inputContent')
    console.log(simplemde.value)
    note.content = simplemde.value

    headingIndex = -1
    note.headings = []
    concatHeading = true
    allowHeading = true

    for (let i = 0; i < note.content.length; i++) {
      if (note.content[i] === '#' /*headingchar*/ && allowHeading) {
        headingIndex++
        concatHeading = true
        allowHeading = false
        this.addNote()
      } else if (note.content[i] == '\n') {
        concatHeading = false
        allowHeading = true
      } else {
        if (concatHeading && note.headings[headingIndex].length <= 50) {
          note.headings[headingIndex] += note.content[i]
        }
      }
    }
    console.log(headingIndex)

    this.displayList()
  }

  render() {
    return (
      <div className='uk-flex uk-flex-center'>
        <div className='uk-text-center uk-margin-large-left uk-margin-top uk-margin-large-right uk-grid-collapse uk-width-3-5@xl' uk-grid='true' uk-sortable = 'handle: .uk-sortable-handle' uk-height-match='target: > div > .uk-card'>
          <div className='uk-width-1-5@m uk-height-large@m'>
            <div className='uk-card uk-card-default uk-card-body'>
              <span className='uk-sortable-handle uk-float-left' uk-icon='icon: table' />
              <a className='uk-icon-link uk-float-right' uk-icon='icon: plus-circle' />
              <h2 />
              <div className='uk-overflow-auto'>
                <table className='uk-table uk-table-small uk-table-hover uk-margin-top' onClick={this.updateEditor}>
                  <tbody id='noteList'>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className='uk-width-expand'>
            <div className='uk-card uk-card-default uk-card-body'>
              <span className='uk-sortable-handle uk-float-left' uk-icon='icon: table'></span>
              <div className='uk-flex uk-flex-center'>
                <div className='uk-grid-divider uk-grid-small' uk-grid='true'>
                  <div className=''>
                    <a uk-icon='icon: plus-circle' />
                    <a uk-icon='icon: copy' />
                    <a uk-icon='icon: trash' />
                  </div>
                </div>
              </div>
              <div className='uk-margin'>
                <h1 id='noteTitle'>Notes</h1>
              </div>
              <div className='uk-margin'>
                <SimpleMDE id='inputContent' value={note.content} onChange={this.syncContent.bind(this)}></SimpleMDE>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Notes
