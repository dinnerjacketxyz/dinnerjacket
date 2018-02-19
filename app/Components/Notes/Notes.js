import React, { Component } from 'react'

let notes = {
  title: [],
  content: []
}
let noteCount = 0
let selectedNote = 0

const NEW_NOTE_LIST = (<tr>
    <td>
      Lorem ipsum
    </td>
  </tr>)

class Notes extends Component {
  constructor(props) {
    super(props)

    // Prints note content to the console every 5000ms (5 seconds)
    setInterval(() => {
      console.log(document.getElementById('note').value)
    }, 5000)
  }

  addNote() {
    console.log('Adding note')
    let noteList = document.getElementById('noteList')
    noteList.innerHTML += NEW_NOTE_LIST
  }

  render() {
    return (
      <div className='uk-flex uk-flex-center'>
        <div className='uk-text-center uk-margin-large-left uk-margin-large-right uk-grid-collapse uk-width-3-5@xl' uk-grid='true' uk-sortable = 'handle: .uk-sortable-handle' uk-height-match='target: > div > .uk-card'>
          <div className='uk-width-1-5@m uk-height-large@m'>
            <div className='uk-card uk-card-default uk-card-body'>
              <span className='uk-sortable-handle uk-float-left' uk-icon='icon: table'></span>
              <a className='uk-icon-link uk-float-right' uk-icon='icon: plus-circle' onClick={this.addNote.bind(this)}/>
              <h2></h2>
              <div className='uk-overflow-auto'>
                <table className='uk-table uk-table-small uk-table-hover'>
                  <tbody id='noteList'>
                    <tr>
                      <td>
                        Lorem ipsum
                      </td>
                    </tr>
                    <tr>
                      <td>
                        Lorem ipsum
                      </td>
                    </tr>
                      <tr>
                        <td>
                          Lorem ipsum
                        </td>
                      </tr>
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
                <input className='uk-input uk-form-blank uk-form-large' type='Title' placeholder='Title' />
              </div>
              <div className='uk-margin'>
                <textarea className='uk-textarea uk-form-blank' rows='10' placeholder='Body'></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>

    )
  }
}

export default Notes
