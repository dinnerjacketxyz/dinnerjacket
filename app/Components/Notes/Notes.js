/* 
 * NOTES TO DO LIST
 * 
 *   DONE(ithink) when clicking off page the quill editor does not lose focus
 *   - conflicts on two seperate devices
 *   - offline indicator using firebase offline api
 *   - switching tabs too quickly bug
 *   - re add modals
 */

// Sync notes (list detailed modules this file covers later)
// George

// localstorage only - below is the WIP firebase code
import React, { Component } from 'react'
const http = require('http')
const css = require('./Notes.css')

let forceUpdate

let quill

let userID = ''

let currentID = 0
let noteTabID = 0
let firstLoad = false

let mouseX, mouseY = 0

let contextMenu

const MAX_CLASSES = 12

//const fb = require('../../fb')(window.firebase)
//let database = window.firebase.database()

let ref
let fb
let database

class Notes extends Component {
  /**
   * 
   * @param {*} props 
   */
  constructor(props) {
    super(props)

    this.state = {
      notes: [],
      classes: [],
      selected: 0,
      onContext: '',
      mousePos: {x: 0, y: 0},
      posSaved: false
    }

    userID = props.userID

    //fb = require('../../fb')(window.firebase)
    //database = window.firebase.database()

    // Encode fetched username to maintain user security
    userID = btoa(userID)
    //console.log('Username: ' + userID)

    // Link firebase reference to 'userNotes' database of this userID's index
    ref = props.database.ref('userNotes/' + userID)

    ///////
    ///////

    //restore notes from localstorage and selection from window var
    if (localStorage.getItem('notesDB') === null) {
      firstLoad = true
      this.state.notes.push(this.noteStruct('My Notes', '', currentID))    
    } else {
      this.state.notes = JSON.parse(atob(localStorage.getItem('notesDB')))
    }

    if (localStorage.getItem('content') !== null) {
      this.state.notes[0].content = atob(localStorage.getItem('content'))
      localStorage.removeItem('content')
    } else {
      ref.once('value', (data) => {
        this.retrieveFirebase(data)
      })
    }


    ////////
    
    this.generateClasses()
    
    // questionable innit
    window.addEventListener('beforeunload', (event) => {
      // Autosaves before enduser exits notes
      //console.log('ISTHISEVERUSEDBEFOREUNLEAD?')
    }, false)

    this.selectNote = this.selectNote.bind(this)
  }

  extractReminders() {
    let note
    for (let i = 0; i < this.state.notes.length; i++) {
      note = this.state.notes[i].content
    }
  }
  
  /**
   * Loop through all the user's classes
   * Add valid classes to classes array held in this.state
   */
  generateClasses() {
    this.state.classes = []
    for (let i = 1; i < MAX_CLASSES + 1; i++) {
      if (window.timetable.subjects[i] !== -1 && window.timetable.subjects[i].shortTitle[0] !== '_') {      
        let subject = window.timetable.subjects[i].year + window.timetable.subjects[i].shortTitle

        // Push class at index i only if a note for that class has not yet been created
        if (this.classUnused(subject)) {
          this.state.classes.push(subject)
        }
      }
    }
  }

  /**
   * Loop through created notes to check if a specific subject note has been created
   * @param {*} subject - subject that is being checked for current use
   */
  classUnused(subject) {
    for (let i = 0; i < this.state.notes.length; i++) {
      if (subject == this.state.notes[i].title) {
        return false
      }
    }
    return true
  }

  /**
   * 
   */
  componentDidMount() {
    let content = document.getElementById('content')
    content.className = 'full vcNavbarParent'

    contextMenu = document.getElementById('contextMenu')
    
    // Initialise quill editor
    quill = new Quill('#editor', {
      modules: {
        toolbar: true
      },
      theme: 'snow', // Snow theme enables permanent style and formatting options above note
      placeholder:
      'Write any notes here! Notes are encoded and are not visible to anyone else. Notes are currently stored locally on your device. In future, notes will seamlessly sync across all your devices.'
    })

    this.initNote()


    UIkit.switcher(notesLayout).show(window.selectedNote)

    //HELP BUSTOR
    /*//console.log(window.selectedNote)
    let notesLayout = document.getElementById('notesLayout')
    for (let i = 0; i < notesLayout.childNodes; i++) {
      if (i === window.selectedNote) {
        //console.log('At ' + i + ' TRUE')
        notesLayout.childNodes[i].setAttribute('aria-expanded', 'true')
        notesLayout.childNodes[i].className = 'uk-active'
      } else {
        //console.log('At ' + i + ' FALSE')
        notesLayout.childNodes[i].setAttribute('aria-expanded', 'false')
        notesLayout.childNodes[i].className = ''
      }
    }*/

    //console.log(notesLayout.childNodes)

    let posSaved = this.state.posSaved
    this.setState({ posSaved: true })

    setInterval(() => { this.updateDB() }, 2000) // 2sec

    //alsways get data n that
    ref.on('value', (data) => {
      //console.log('data changed')
      //console.log(!document.getElementById('editor').focus())

      if (forceUpdate || !quill.hasFocus()) {
        this.retrieveFirebase(data)      
      }
    })
  }

  /**
   * 
   * @param {*} data 
   */
  retrieveFirebase(data) {
    //console.log('firebase data accessed')
    this.state.notes = JSON.parse(atob(data.val().notes))
    let n = this.state.notes
    this.generateClasses()
    this.setState({ n: this.state.notes })
    
    this.initNote()
    this.selectNoteInt(this.state.selected)

    //console.log(this.state.notes)
  }

  /**
   * 
   */
  componentWillUnmount() {
    // Autosaves before enduser exits notes
    this.updateDB()
    //console.log(document.getElementById('notesLayout'))
    let notesLayout = document.getElementById('notesLayout')
    
    let oldNotes = this.state.notes
    let notes = []

    //console.log(this.state.notes)

    // IMPROVE EFFICIENCY
    for (let i = 0; i < notesLayout.childNodes.length; i++) {
      let title = notesLayout.childNodes[i].getAttribute('text')
      //console.log(title)
      //console.log(this.state.notes[i].title)
      
      if (this.state.notes[i].title !== title) {
        for (let j = 0; j < this.state.notes.length; j++) {
          if (this.state.notes[j].title === title) {
            notes.push(this.state.notes[j])
          }
        }
      } else {
        notes.push(this.state.notes[i])
      }

      // CURRENT SELECTION
      //if (notesLayout.childNodes[i].getAttribute('aria-expanded') === 'true') {
      //  window.selectedNote = 
      //}

      //this.selectNoteThrottled.cancel()
    }

    window.selectedNote = this.state.selected 

    this.state.notes = notes

    localStorage.setItem('notesDB', btoa(JSON.stringify(this.state.notes)))
    // Upload updated notes database to firebase
    this.updateFirebase()

    let content = document.getElementById('content')
    content.className = 'full'
  }

  /**
   * Called (by quill input box) when a change is made to any note
   * Saves newly updated notes to localstorage and realtime firebase database
   * Notes are encryted and stored in an unreadable format to maintain user security
   */
  updateDB() {
    forceUpdate = !document.hasFocus()

    // Save updated contents and last update time to notes database
    let content = quill.getContents()
    //let currentTime = new Date()
    this.state.notes[this.state.selected].content = JSON.stringify(content)

    // Save updated notes database in browser's localstorage
    localStorage.setItem('notesDB', btoa(JSON.stringify(this.state.notes)))
    //localStorage.setItem('notesLU', JSON.stringify(currentTime))

    // Upload updated notes database to firebase
    this.updateFirebase()
  }

  /**
   * 
   */
  updateFirebase() {
    // Consolidate encrypted notes database and last update time into a single notesDB
    let notesDB = { notes: btoa(JSON.stringify(this.state.notes)) }//, lastUpdated: currentTime }

    try {
      ref.update(notesDB)
    } catch (error) { // Exception handling in case of failed upload/bad internet etc.
      //console.log(error)
    }
  }

  /**
   * 
   * @param {*} ttl 
   * @param {*} cnt 
   * @param {*} ID
   */
  noteStruct(ttl, cnt, ID) {
    let note = {
      title: ttl,
      content: cnt,
      id: ID
    }
    return note
  }

  /*rows = this.state.notices.map(notice => {
    return <CollapsedNotices key={notice.ID} notices={notice} />
  })*/

  /**
   * 
   */
  initNote() {
    let content = this.state.notes[this.state.selected].content
    if (firstLoad || content !== '') {
      try {
        quill.setContents(JSON.parse(content))
      } catch (e) {
        quill.setText('')
      }
      firstLoad = false
    }
  }

  /**
   * 
   */
  createCustomNote() {
    this.updateDB()
    let title = document.getElementById('customTitle').value
    if (this.titleInUse(title)) {
      // QUIGLEY
      // I would keep the alert message contents but maybe present it in some uikit element that looks better innit
      //alert('The note \'' + title.toUpperCase() + '\' already exists.')
      UIkit.modal.alert('The note \'' + title.toUpperCase() + '\' already exists. Please enter a unique title.')
    } else {
      currentID++
      let n = this.state.notes
      this.setState({ n: n.push(this.noteStruct(title, '', this.state.notes.length)) })
      ////console.log(this.state.notes)
    }
  }

  /**
   * 
   * @param {*} title 
   */
  titleInUse(title) {
    for (let i = 0; i < this.state.notes.length; i++) {
      if (title.toLowerCase() === this.state.notes[i].title.toLowerCase()) {
        return true
      }
    }
    return false
  }

  /**
   * 
   * @param {*} e 
   */
  createNote(e) {
    this.updateDB()

    for (let i = this.state.classes.length-1; i >= 0; i--) {
      if (this.state.classes[i] === e.target.title) {
        this.state.classes.splice(i, 1)
      }
    }

    currentID++
    let n = this.state.notes
    this.setState({ n: n.push(this.noteStruct(e.target.title, '', this.state.notes.length)) })
    ////console.log(this.state.notes)
  }

  /**
   * 
   * @param {*} e 
   */
  onMouseMove(e) {
    //this.setState({ mousePos: { x: e.screenX, y: e.screenY } })
    mouseX = e.screenX
    mouseY = e.screenY
    ////console.log(mouseX,mouseY)

    this.state.mousePos.x = e.screenX
    this.state.mousePos.y = e.screenY
  }
  /**
   * 
   * @param {*} e 
   */
  notesContextMenu(e) {
    //console.log('context opened')
    contextMenu.style.visibility = 'visible'

    this.state.onContext = e.target.text
    ////console.log(this.state.onContext)

    let dropdown = document.getElementById('contextMenu')
    //UIkit.dropdown(dropdown).show()

    contextMenu.style.top = e.clientY+'px'
    contextMenu.style.left = e.clientX+'px'
    
    e.preventDefault()
  }

  /**
   * 
   */
  removeNote() {
    if (this.state.notes.length > 1) {
      contextMenu.style.visibility = 'hidden'

      let title = ''
      for (let j = 0; j < this.state.notes.length; j++) {
        if (this.state.notes[j].title === this.state.onContext) {
          title = this.state.notes[j].title
          break
        }
      }

      UIkit.modal.confirm('Are you sure? \'' + title + '\' will be permanently deleted.').then(_ => {
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
      })
    }
  }

  /**
   * 
   */
  clearContents() {
    contextMenu.style.visibility = 'hidden'

    let title = ''
    for (let i = 0; i < this.state.notes.length; i++) {
      if (this.state.notes[i].title === this.state.onContext) {
        title = this.state.notes[i].title
        break
      }
    }

    UIkit.modal.confirm('Are you sure? The contents of \'' + title + '\' will be permanently deleted.').then(_=> {
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

  /**
   * 
   */
  rename() {
    contextMenu.style.visibility = 'hidden'

    for (let i = 0; i < this.state.notes.length; i++) {
      if (this.state.notes[i].title === this.state.onContext) {
        UIkit.modal.prompt('Enter a title to rename \'' + this.state.notes[i].title + '\'', 'Title').then(title => {
          if (title !== null && /\S/.test(title)) {
            this.state.notes[i].title = title
            this.refreshNotesList()
          }
        })
        break
      }
    }
  }

  /**
   * 
   */
  refreshNotesList() {
    let notes = this.state.notes
    this.setState({ notes: notes })
    this.updateDB()
  }

  /**
   * 
   * @param {*} e 
   */
  selectNote(e) {
    this.updateDB()

    let content
    for (let i = 0; i < this.state.notes.length; i++) {
      if (this.state.notes[i].title === e.target.text) {
        this.state.selected = i
        content = this.state.notes[i].content
      }
    }
    this.displayContent(content)
  }

  /**
   * 
   * @param {*} int 
   */
  selectNoteInt(int) {
    this.updateDB()

    let content = this.state.notes[int].content
    this.displayContent(content)
  }

  /**
   * 
   * @param {*} content 
   */
  displayContent(content) {
    if (content === '' || content === undefined) {
      quill.setText('')
    } else {
      try {
        quill.setContents(JSON.parse(content))
      } catch (e) {
        //console.log(content)
        //console.log(e)
      }
    }
  }

  /**
   * Render uikit card and quill editor
   */
  render() {
    let key = 0
    let notes = this.state.notes.map(note => {
      key++
      return <li key={key} text={note.title} onContextMenu={this.notesContextMenu.bind(this)} 
        onClick={this.selectNote}><a id={note.id}>{note.title}</a></li>
    })

    let key2 = 0
    let classList = this.state.classes.map(cls => {
      key2++
      return <p key={key2} title={cls} onClick={this.createNote.bind(this)}>{cls}</p>
    })

    let removeNote = null
    if (this.state.notes.length > 1) {
      removeNote = (
        <li onClick={this.removeNote.bind(this)}><span className='uk-margin-right uk-icon' uk-icon='trash'/>Remove</li>
      )
    }

    return (
      <div id='parent' className='vcNavbarCard notesParent'>
        <div id='contextMenu' className='contextMenu card' style={{visibility: 'hidden', minHeight: '50px',minWidth:'50px',position:'absolute',zIndex:1000}}>
          <ul className='uk-list'>
            <li onClick={this.rename.bind(this)}><span className='uk-margin-right uk-icon' uk-icon='pencil'/>Rename</li>
            <li onClick={this.clearContents.bind(this)}><span className='uk-margin-right uk-icon' uk-icon='ban'/>Clear</li>
            {removeNote}
          </ul>
        </div>
        <div className='notesChild card uk-animation-slide-top-small'>
        <a uk-icon='icon: info' uk-tooltip='title: Right click to rename, clear, or delete notes' className='uk-float-right'/>
        <ul id='notesLayout' className='uk-subnav uk-subnav-pill uk-flex-center' uk-switcher='animation: uk-animation-fade' uk-sortable='cls-custom: uk-box-shadow-small uk-flex uk-flex-middle uk-background'>
          {notes}
        </ul>
          <div className='pad'>
            <div id='editor' onInput={this.updateDB.bind(this)} onMouseMove={this.onMouseMove.bind(this)}/>
          </div>
          <div className=''>
            <a uk-icon='plus-circle' uk-tooltip='title: Add custom notes; pos: bottom-center;'></a>
            <div uk-dropdown='mode: click;pos: top-center'>
              <p className='uk-text-left'>Classes</p>
              {classList}
              <p className='uk-text-left'>Custom</p>
              <input id='customTitle' className='uk-input' type='text' placeholder='Title' maxLength='10'/>
              <button onClick={this.createCustomNote.bind(this)} className='uk-margin-top uk-button uk-button-default'>Add</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Notes
