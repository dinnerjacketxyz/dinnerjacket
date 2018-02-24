import React, { Component } from 'react'

/*let notes = {
  title: [],
  content: []
}*/

// Hopefully the bottom one works otherwise we can use the one above

let notes = [
  {
    title: '',
    content: ''
  }
]

let selectedNote = 1

class Notes extends Component {
  constructor(props) {
    super(props)

    // Prints note content to the console every 5000ms (5 seconds)
    /*setInterval(() => {
      console.log(document.getElementById('note').value)
    }, 5000)*/

    this.state = {
      rows: []
    }
  }

  addNote() {
    let nextState = this.state
    nextState.rows.push(this.state.rows.length)
    this.setState(nextState)
  }

  notesClicked() {
    console.log('note clicked')
    console.log(event)
  }

  render() {
    return (
      <div className='uk-flex uk-flex-center'>
        <div className='uk-text-center uk-margin-large-left uk-margin-top uk-margin-large-right uk-grid-collapse uk-width-3-5@xl' uk-grid='true' uk-sortable = 'handle: .uk-sortable-handle' uk-height-match='target: > div > .uk-card'>
          <div className='uk-width-1-5@m uk-height-large@m'>
            <div className='uk-card uk-card-default uk-card-body'>
              <span className='uk-sortable-handle uk-float-left' uk-icon='icon: table'></span>
              <a className='uk-icon-link uk-float-right' uk-icon='icon: plus-circle' onClick={this.addNote.bind(this)}/>
              <h2></h2>
              <div className='uk-overflow-auto'>
                <table className='uk-table uk-table-small uk-table-hover' onClick={this.notesClicked.bind(this)}>
                  <tbody id='noteList'>
                    {this.state.rows.map(row => <tr><td>Lorem ipsum</td></tr>)}
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


// Old stuff delete when notes are working
/*
<div className='uk-flex uk-flex-center'>
  <div className='uk-text-center uk-margin-large-left uk-margin-large-right uk-grid-collapse uk-width-3-5@xl' uk-grid='true' uk-sortable = 'handle: .uk-sortable-handle' uk-height-match='target: > div > .uk-card'>
    <div className='uk-width-1-5@m uk-height-large@m'>
      <div className='uk-card uk-card-default uk-card-body'>
        <span className='uk-sortable-handle uk-float-left' uk-icon='icon: table'></span>
        <a className='uk-icon-link uk-float-right' uk-icon='icon: plus-circle' onClick={this.addNote.bind(this)}/>
        <h2></h2>
        <div className='uk-overflow-auto'>
          <table id='noteList' className='uk-table uk-table-small uk-table-hover'>
            <tbody>
              {this.state.rows.map(row => <tr onClick={this.notesClicked(this.state.rows.length-1)}><td>Lorem ipsum</td></tr>)}
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

constructor(props) {
  super(props)

  // Prints note content to the console every 5000ms (5 seconds)
  /*setInterval(() => {
    console.log(document.getElementById('note').value)
  }, 5000)*/

/*  this.state = {
    rows: []
  }

  this.notesClicked = this.notesClicked.bind(this)
}

addNote() {/*
  let table = document.getElementById('noteList')
  let rows = table.getElementsByTagName('tr')
  console.log(rows.length)*/

/*  let nextState = this.state/*
  nextState.rows.onClick = () => {
    console.log('testing')
  }*/
  /*nextState.rows.push(this.state.rows.length)
  this.setState(nextState)

  console.log(this.state.rows)

}

notesClicked(noteIndex) {
  console.log(noteIndex)
}

*/
