import React, { Component } from 'react'

import ClassNotes from './ClassNotes'
import Notes from './Notes'

let notes

class NotesSwitcher extends Component {
  constructor(props) {
    super(props)

    this.state = {
      tab: 'Notes'
    }
  }

  tabInput(e) {
    this.state.tab = e.target.innerHTML
    this.forceUpdate()
  }

  componentDidMount() {
    let content = document.getElementById('content')
    content.className = 'full vcNavbarParent'
  }

  componentWillUnmount() {
    let content = document.getElementById('content')
    content.className = 'full'
  }

  removeNote() {
    if (this.state.notes.length > 1) {
      contextMenu.style.visibility = 'hidden'
      UIkit.modal.confirm('r u sure innit').then(_ => {
        for (let i = 0; i < this.state.notes.length; i++) {
          if (this.state.notes[i].title === this.state.onContext) {
            this.state.notes.splice(i, 1)

            if (i === this.state.selected && this.state.selected === this.state.notes.length) {
              this.state.selected--
            }

            this.displayContent(this.state.notes[this.state.selected].content)
            this.refreshNotesList()
            this.generateClasses()
            break
          }
        }
      }, _ => {
        UIkit.modal.alert('No!')
      })
    }
  }

  clearContents() {
    contextMenu.style.visibility = 'hidden'
    UIkit.modal.confirm('r u sure innit').then(_=> {
      for (let i = 0; i < this.state.notes.length; i++) {
        if (this.state.notes[i].title === this.state.onContext) {
          this.state.notes[i].content = ''
          quill.setText('')
          this.refreshNotesList()
          break
        }
      }
    })
  }

  rename() {
    contextMenu.style.visibility = 'hidden'

    for (let i = 0; i < this.state.notes.length; i++) {
      if (this.state.notes[i].title === this.state.onContext) {
        UIkit.modal.prompt('Name:', 'Your name').then(title => {
          if (title !== null && /\S/.test(title)) {
            this.state.notes[i].title = title
            this.refreshNotesList()
          }
        })
        break
      }
    }
  }

  render() {
    notes = (this.state.tab === 'Notes') ? <Notes /> : <ClassNotes />
    return (
        <div className='vcNavbarCard notesParent'>
          <div id='contextMenu' className='contextMenu card' style={{visibility: 'hidden', minHeight: '50px',minWidth:'50px',position:'absolute',zIndex:1000}}>
            <ul className='uk-list'>
              <li onClick={this.rename.bind(this)}><span className='uk-margin-right uk-icon' uk-icon='pencil'/>Rename</li>
              <li onClick={this.clearContents.bind(this)}><span className='uk-margin-right uk-icon' uk-icon='ban'/>Clear</li>
              <li onClick={this.removeNote.bind(this)}><span className='uk-margin-right uk-icon' uk-icon='trash'/>Remove</li>
            </ul>
          </div>
          <div className='notesChild card uk-animation-slide-top-small'>
            <ul className='uk-flex-center uk-margin-bottom' onClick={this.tabInput.bind(this)} uk-tab=''>
              <li className="uk-active"><a>Notes</a></li>
              <li><a>Class Notes</a></li>
            </ul>
            {notes}
          </div>
        </div>
    )
  }
}

export default NotesSwitcher