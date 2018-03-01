import React, { Component } from 'react'

let notes = [
  {
    title: 'Untitled',
    content: 'Content'
  }
]

let selection

class Notes extends Component {
  constructor(props) {
    super(props)

    //this.displayList()
  }

  componentDidMount() {
    selection = 0
    this.displayList()
    this.updateEditor(selection)
  }

  addNote() {
    let temp = {title:"Untitled", content:"Content"}
    notes.unshift(temp)

    // GO TO NEW NOTE WHEN ADDED
    selection = 0
    this.displayList()
    this.updateEditor(selection)
  }

  displayList() {
    let titleList = ''
    for (let i = 0; i < notes.length; i++) {
      titleList += `<tr><td id='${i}'>${notes[i].title}</td></tr>`
    }
    let list = document.getElementById('noteList')
    list.innerHTML = titleList
  }

  updateEditor(e) {
    if (e != 0) {
      selection = e.target.id
    }

    let editorTitle = document.getElementById('inputTitle')
    let editorContent = document.getElementById('inputContent')
    editorTitle.value = notes[selection].title
    editorContent.value = notes[selection].content
  }

  syncTitle() {
    let editorTitle = document.getElementById('inputTitle')
    console.log(editorTitle.value)
    notes[selection].title = editorTitle.value
    this.displayList()
  }

  syncContent() {
    let editorContent = document.getElementById('inputContent')
    console.log(editorContent.value)
    notes[selection].content = editorContent.value
    this.displayList()
  }

  render() {
    return (
      <div className='uk-flex uk-flex-center'>
        <div className='uk-text-center uk-margin-large-left uk-margin-top uk-margin-large-right uk-grid-collapse uk-width-3-5@xl' uk-grid='true' uk-sortable = 'handle: .uk-sortable-handle' uk-height-match='target: > div > .uk-card'>
          <div className='uk-width-1-5@m uk-height-large@m'>
            <div className='uk-card uk-card-default uk-card-body'>
              <span className='uk-sortable-handle uk-float-left' uk-icon='icon: table' onClick={this.displayList.bind(this)}></span>
              <a className='uk-icon-link uk-float-right' uk-icon='icon: plus-circle' onClick={this.addNote.bind(this)}/>
              <h2></h2>
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
                    <a href='' uk-icon='icon: plus-circle'></a>
                    <a href='' uk-icon='icon: copy'></a>
                    <a href='' uk-icon='icon: trash'></a>
                  </div>
                  <div>
                    <select className='uk-select uk-form-small uk-form-width-small'>
                      <option>Arial</option>
                      <option>Comic Sans MS</option>
                      <option>Calibri</option>
                      <option>Cambria</option>
                      <option>Courier</option>
                      <option>Impact</option>
                      <option>Roboto</option>
                      <option>Source Sans</option>
                      <option>Times New Roman</option>
                    </select>
                  </div>
                  <div>
                    <select className='uk-select uk-form-small uk-form-width-xsmall'>
                      <option>8</option>
                      <option>10</option>
                      <option>12</option>
                      <option>14</option>
                      <option>18</option>
                      <option>24</option>
                      <option>36</option>
                    </select>
                  </div>
                  <div className=''>
                    <a href='' uk-icon='icon: bold'></a>
                    <a href='' uk-icon='icon: italic'></a>
                    <a href='' uk-icon='icon: strikethrough'></a>
                  </div>
                </div>
              </div>
              <div className='uk-margin'>
                <input id='inputTitle' className='uk-input uk-form-blank uk-form-large' type='Title' placeholder='Title' onInput={this.syncTitle.bind(this)}></input>
              </div>
              <div className='uk-margin'>
                <textarea id='inputContent' className='uk-textarea uk-form-blank' rows='10' placeholder='Body' onInput={this.syncContent.bind(this) }></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Notes
