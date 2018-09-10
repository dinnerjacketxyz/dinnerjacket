import React, { Component } from 'react'
import debounce from 'lodash.debounce'
import throttle from 'lodash.throttle'
import { EEXIST } from 'constants';
const http = require('http')
const css = require('./Notes.css')

let forceUpdate

let quill

let userID = ''

let currentID = 0
let noteTabID = 0
let firstLoad = false

let mouseX, mouseY = 0

window.notesMouseTimer

let contextMenu

const MAX_CLASSES = 12

//const fb = require('../../fb')(window.firebase)
//let database = window.firebase.database()

let ref
let fb
let database

/**
 * User notes component
 * Support for multiple notes organised by classes and other custom notes
 * Syncs online with firebase database
 */
class Notes extends Component {
  /**
   * Called on component load
   * @param {*} props - includes firebase database and userID
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

    // Link firebase reference to 'userNotes' database of this userID's index
    ref = props.database.ref('userNotes/' + userID)

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

    this.selectNoteDebounced = throttle(this.selectNote, 1000)
  }
  
  /**
   * Enable loading spinner over the place of the notes editor
   * @param {boolean} bool - true -> enable spinner, false -> disable spinner
   */
  enableSpinner(bool) {
    if (bool) {
      document.getElementById('spinner').style.display = 'block'
      document.getElementById('spinner').style.visibility = 'visible'
    } else {
      document.getElementById('spinner').style.display = 'none'
      document.getElementById('spinner').style.visibility = 'hidden'
    }
    
  }

  /**
   * Loop through all the user's classes
   * Add valid classes to classes array held in this.state
   * TODO MAKE SURE THIS DOES NOT BUST WITH TEACHER WHO DO NOT HAVE 12 SUBJECTS
   */
  generateClasses() {
    this.state.classes = []
    let i = 0

    while (i > -1) {
      if (window.timetable.subjects[i]) {
        if (window.timetable.subjects[i] !== -1 && window.timetable.subjects[i].shortTitle[0] !== '_' &&
          window.timetable.subjects[i].subject !== '') {      

          let subject = window.timetable.subjects[i].year + window.timetable.subjects[i].shortTitle
  
          // Push class at index i only if a note for that class has not yet been created
          if (this.classUnused(subject)) {
            this.state.classes.push(subject)
          }
        }
      }

      if (window.timetable.subjects[i + 1]) {
        i++
      } else {
        i = -1
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
   * Called upon the component mounting
   */
  componentDidMount() {
    this.enableSpinner(false)

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
      'Write any notes here! Your notes are encrypted and are not visible to anyone else. Notes also sync in realtime across all of your devices!'
    })

    this.initNote()
    UIkit.switcher(notesLayout).show(window.selectedNote)

    let posSaved = this.state.posSaved
    this.setState({ posSaved: true })

    // Set interval for note sync
    setInterval(() => { this.updateDB() }, 1000) // 1sec

    // Get data from firebase reference
    ref.on('value', (data) => {
      if (forceUpdate || !quill.hasFocus()) {
        this.retrieveFirebase(data)      
      }
    })

    document.getElementById('notesLayout').addEventListener("touchstart", this.touchDown)
    document.getElementById('notesLayout').addEventListener("touchleave", this.touchUp)
  }

  touchDown() {
    this.touchUp
    window.notesMouseTimer = window.setTimeout(this.exec,1500); //set timeout to fire in 1.5 seconds when the user presses mouse button down
  }

  touchUp() {
    if (window.notesMouseTimer){
      window.clearTimeout(window.notesMouseTimer)
      console.log('released')
    }
  }

  exec(e) {
    contextMenu.style.visibility = 'visible'

    if ((e.touches[0].pageY+150.16)>window.innerHeight) {
      console.log('too close to the right')
      contextMenu.style.top = parseFloat(e.touches[0].pageY-150.16)+'px'
    } else {
      contextMenu.style.top = e.touches[0].pageY+'px'
    }

    if ((e.touches[0].pageX+137.45)>window.innerWidth) {
      console.log('too close to the right')
      contextMenu.style.left = parseFloat(e.touches[0].pageX-137)+'px'
    } else {
      contextMenu.style.left = e.touches[0].pageX+'px'
    }
    console.log(e.target.text)
    console.log(this.state)

    this.state.onContext = e.target.text//THIS IS THE LINE THAT DOES NOT work

    e.preventDefault()
  }

  /**
   * Retrieve synced data from online firebase database
   * @param {*} data - returned sync data containing notes
   */
  retrieveFirebase(data) {
    this.state.notes = JSON.parse(atob(data.val().notes))
    let n = this.state.notes
    this.generateClasses()
    this.setState({ n: this.state.notes })
    
    this.initNote()
    this.selectNoteInt(this.state.selected)
  }

  /**
   * Called upon thecomponent unmounting
   */
  componentWillUnmount() {
    // Autosaves before enduser exits notes
    this.updateDB()
    let notesLayout = document.getElementById('notesLayout')
    
    let oldNotes = this.state.notes
    let notes = []

    // Linear search through notes UI elements to save notes positions as they can shift
    for (let i = 0; i < notesLayout.childNodes.length; i++) {
      let title = notesLayout.childNodes[i].getAttribute('text')
      if (this.state.notes[i].title !== title) {
        for (let j = 0; j < this.state.notes.length; j++) {
          if (this.state.notes[j].title === title) {
            notes.push(this.state.notes[j])
          }
        }
      } else {
        notes.push(this.state.notes[i])
      }
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
   * Update firebase notes to be equivalent to current locally stored notes
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
   * Template notes structure
   * Called to add a noteStruct object to database
   * @param {*} ttl - note title
   * @param {*} cnt - note content
   * @param {*} ID - note ID
   */
  noteStruct(ttl, cnt, ID) {
    let note = {
      title: ttl,
      content: cnt,
      id: ID
    }
    return note
  }

  /**
   * Initialises notes and sets editor contents to current (default) note content
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
   * Handles creation of custom note from input field
   */
  createCustomNote() {
    this.updateDB()
    let title = document.getElementById('customTitle').value
    if (this.titleInUse(title)) {
      // Alert to warn users of duplicate notes
      UIkit.modal.alert('The note \'' + title.toUpperCase() + '\' already exists. Please enter a unique title.')
    } else {
      currentID++

      // Refresh
      let n = this.state.notes
      this.setState({ n: n.push(this.noteStruct(title, '', this.state.notes.length)) })
    }
  }

  /**
   * Checks if note title is already in use
   * @param {*} title - title to check for
   */
  titleInUse(title) {
    // Linear search through 'this.state.notes' array to check for duplicate from parameter, title
    for (let i = 0; i < this.state.notes.length; i++) {
      if (title.toLowerCase() === this.state.notes[i].title.toLowerCase()) {
        return true
      }
    }
    return false
  }

  /**
   * Handles creating a new note from the preset class fields
   * @param {*} e - event handler of selected class field
   */
  createNote(e) {
    this.updateDB()

    for (let i = this.state.classes.length-1; i >= 0; i--) {
      if (this.state.classes[i] === e.target.title) {
        this.state.classes.splice(i, 1)
      }
    }

    currentID++

    // Refreshes notes
    let n = this.state.notes
    this.setState({ n: n.push(this.noteStruct(e.target.title, '', this.state.notes.length)) })
  }

  /**
   * Saves screen position as mouse moves across component
   * @param {*} e - mouse move event
   */
  onMouseMove(e) {
    mouseX = e.screenX
    mouseY = e.screenY

    this.state.mousePos.x = e.screenX
    this.state.mousePos.y = e.screenY
  }

  /**
   * Opens the notes context menu which displays options for rename, clear and delete
   * @param {*} e - onContextMenu event
   */
  notesContextMenu(e) {
    contextMenu.style.visibility = 'visible'

    this.state.onContext = e.target.text

    let dropdown = document.getElementById('contextMenu')
    //UIkit.dropdown(dropdown).show()

    contextMenu.style.top = e.clientY+'px'
    contextMenu.style.left = e.clientX+'px'
    
    e.preventDefault()
  }

  /**
   * Removes the note which is currently right-clicked
   */
  removeNote() {
    if (this.state.notes.length > 1) {
      contextMenu.style.visibility = 'hidden'

      let title = ''
      // Linear search to find note title
      for (let j = 0; j < this.state.notes.length; j++) {
        if (this.state.notes[j].title === this.state.onContext) {
          title = this.state.notes[j].title
          break
        }
      }

      // Prompt to eliminate accidental deleting of notes
      UIkit.modal.confirm('Are you sure? \'' + title + '\' will be permanently deleted.').then(_ => {
        // Linear search to find note to delete
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
   * Clears content of the note which is right-clicked
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

    // Prompt to ensure users dont accidentally clear content
    UIkit.modal.confirm('Are you sure? The contents of \'' + title + '\' will be permanently deleted.').then(_=> {
      // Linear search to find note to clear
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
   * Renames note which is currently right-clicked 
   */
  rename() {
    contextMenu.style.visibility = 'hidden'

    for (let i = 0; i < this.state.notes.length; i++) {
      if (this.state.notes[i].title === this.state.onContext) {
        // Prompt asking for the new name of the note
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
   * Refreshes the list of notes and updates the database
   */
  refreshNotesList() {
    let notes = this.state.notes
    this.setState({ notes: notes })
    this.updateDB()
  }

  /**
   * Selects note out of the multiple in the database
   * @param {string} text - text contained within the note to select
   */
  selectNote(text) {

    //this.updateDB()

    let content
    for (let i = 0; i < this.state.notes.length; i++) {
      if (this.state.notes[i].title === text) {
        this.state.selected = i
        content = this.state.notes[i].content
      }
    }

    //this.updateDB()

    this.displayContent(content)
    this.enableSpinner(false)
  }

  /**
   * Selects note out of the multiple in the database by the integer ID
   * @param {int} int - ID to select
   */
  selectNoteInt(int) {
    this.updateDB()

    let content = this.state.notes[int].content
    this.displayContent(content)
  }

  /**
   * Event handler for clicking a new note title
   * @param {*} e - event for clicking the note title
   */
  handleClick(e) {
    this.enableSpinner(true)
    this.updateDB()
    this.selectNoteDebounced(e.target.innerHTML)
  }

  /**
   * Displays the desired content in the quill text editor
   * @param {*} content - content to be shown
   */
  displayContent(content) {
    if (content === '' || content === undefined) {
      quill.setText('')
    } else {
      // Exception handling in case of 'corrupted save'
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
        onClick={this.handleClick.bind(this)}><a id={note.id}>{note.title}</a></li>
    })

    let key2 = 0
    let classList = this.state.classes.map(cls => {
      key2++
      return <p className='notesClassList' key={key2} title={cls} onClick={this.createNote.bind(this)}>{cls}</p>
    })

    // Prevent users from removing the last note
    let removeNote = null
    if (this.state.notes.length > 1) {
      removeNote = (
        <li onClick={this.removeNote.bind(this)}><span className='uk-margin-right uk-icon' uk-icon='trash'/>Remove</li>
      )
    }

    return (
      <div id='parent' className='vcNavbarCard notesParent'>
        <div id='contextMenu' className='contextMenu card' 
          style={{visibility: 'hidden', minHeight: '50px',minWidth:'50px',position:'absolute',zIndex:1000}}>
          <ul className='uk-list'>
            <li onClick={this.rename.bind(this)}><span className='uk-margin-right uk-icon' uk-icon='pencil'/>Rename</li>
            <li onClick={this.clearContents.bind(this)}><span className='uk-margin-right uk-icon' uk-icon='ban'/>Clear</li>
            {removeNote}
          </ul>
        </div>
        
        <div className='notesChild card uk-animation-slide-top-small'>
          <div id='spinner' style={{position: 'fixed', display: 'none',visibility:'hidden', width: '100%',
            height: '100%',top: '0',left: '0', right: '0', bottom: '0', backgroundColor: 'rgba(0,0,0,0.3)', 
            zIndex: '2', cursor: 'pointer', borderRadius:'5px'}}><div className='calLoadingParent'>
            <div className='calLoadingChild uk-flex-center' uk-spinner="ratio: 4"/></div></div>
          <a uk-icon='icon: info' uk-tooltip='title: Right click note titles to rename, clear, or delete notes' className='doNotPrint uk-float-right' />
          <ul onClick={() => {UIkit.dropdown(document.getElementById('notesDropdown')).hide()}} 
            id='notesLayout' className='doNotPrint uk-subnav uk-subnav-pill uk-flex-center' 
            uk-switcher='animation: uk-animation-fade' 
            uk-sortable='cls-custom: uk-box-shadow-small uk-flex uk-flex-middle uk-background'>
            {notes}
          </ul>
          <div id='pad' className='pad'>
            <div id='editor' onInput={this.updateDB.bind(this)} onMouseMove={this.onMouseMove.bind(this)}/>
            <div style={{display:'none',visibility:'hidden'}} id='' uk-spinner='ratio: 4' className='uk-spinner uk-icon'></div>
          </div>
          <div>
            <a uk-icon='plus-circle' uk-tooltip='title: Add custom notes; pos: bottom-center;' className='doNotPrint'></a>
            <div id='notesDropdown' uk-dropdown='mode: click;pos: top-center' className='doNotPrint'>
            <a style={{marginLeft:'0px',marginBottom:'0px'}} uk-icon='icon: info' uk-tooltip='title: Select a class or type in a custom title and press ADD to create a new note. ' className='uk-align-right' />
              <p className='uk-text-left'>Classes</p>
              {classList}

              <hr/>

              <p className='uk-text-left'>Custom</p>
              <input style={{borderRadius:'5px 0 0 5px'}} id='customTitle' className='uk-input uk-width-2-3' 
                type='text' placeholder='Title' maxLength='20'/>
              <button style={{borderRadius:'0 5px 5px 0'}}  onClick={this.createCustomNote.bind(this)} 
                className='uk-button uk-button-default uk-width-1-3'>Add</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Notes
