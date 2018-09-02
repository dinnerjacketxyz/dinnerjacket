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

  render() {
    notes = (this.state.tab === 'Notes') ? <Notes userID={window.userData.username}/> : <ClassNotes />
    return (
        <div className='vcNavbarCard notesParent'>
          <div className='notesChild card uk-animation-slide-top-small'>
            <ul className='doNotPrint uk-flex-center uk-margin-bottom' onClick={this.tabInput.bind(this)} uk-tab=''>
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