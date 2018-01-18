import React, { Component } from 'react'
import Bells from './Bells/Bells'
import Notes from './Notes/Notes'
import Notices from './Notices/Notices'
const css = require('./App.css')
const data = require('../data')

// Global variables
// Represents the current visible content
window.STATES = {
  BELLS: 0,
  NOTES: 1,
  NOTICES: 2
}

let darkTheme = false
let loggedIn = false

class App extends Component {
  constructor(props) {
    super(props)

    // Set default state on launch
     this.state = {visible: window.STATES.BELLS}
  }

  toggleLogin() {
    // Ensure this toggles correctly between Login and Logout
    // A user may already have a token and therefore in that case 
    // it needs to begin with 'Logout' functionality
    console.log('Login clicked')
    window.location.href = '/login'
  }

  // Always renders navbar
  // Renders active page
  render() {
    return (
      <div id='main' className='main'>
        <nav className='uk-navbar-container uk-margin' uk-navbar>
          <div className='uk-navbar-left'>
            <a href='' className='uk-navbar-item uk-logo' uk-icon='icon: star'>Logo</a>
            <ul className='uk-navbar-nav'>
              <li className='uk-animation-toggle'>
                <a href='#' className='uk-animation-shake uk-animation-fast'>
                  <span className='uk-icon uk-margin-small-right' uk-icon='icon: star'></span>
                  Timetable
                </a>
              </li>
              <li className='uk-animation-toggle'>
                <a href='#' className='uk-animation-shake uk-animation-fast'>
                  <span className='uk-icon uk-margin-small-right' uk-icon='icon: star'></span>
                  Notes
                </a>
              </li>
              <li className='uk-animation-toggle'>
                <a href='#' className='uk-animation-shake uk-animation-fast'>
                  <span className='uk-icon uk-margin-small-right' uk-icon='icon: star'></span>
                  Daily Notices
                </a>
              </li>
            </ul>
        </div>
        <div className='uk-navbar-right'>
          <ul className='uk-navbar-nav'>
            <li>
              <a href='#' uk-icon='icon: triangle-down'>Mr Magnoots</a>
                <div className='uk-navbar-dropdown'>
                  <ul className='uk-nav uk-navbar-dropdown-nav'>
                    <li><a href='#'>Settings</a></li>
                    <li><a href='#'>Profile</a></li>
                    <li><a href='#' className='uk-text-danger'>Log Out</a></li>
                  </ul>
                </div>
            </li>
          </ul>
        </div>
      </nav>
    </div>
    )
  }

  showBells() {
    const {visible} = this.state
    this.setState({visible: window.STATES.BELLS})
  }

  showNotes() {
    const {visible} = this.state
    this.setState({visible: window.STATES.NOTES})
  }

  showNotices() {
    const {visible} = this.state
    this.setState({visible: window.STATES.NOTICES})
  }

  // Probably will be moved into settings file
  // Toggles display theme between light and dark
  toggleTheme() {
    let content = document.getElementById('content')
    let nav = document.getElementById('navbar')
    let main = document.getElementById('main')
    
    if (darkTheme) {
      content.style.backgroundColor = 'white'
      nav.style.backgroundColor = '#DEDEDF'
      main.style.color = 'black'
    } else {
      content.style.backgroundColor = '#2a2c31'
      nav.style.backgroundColor = '#202225'
      main.style.color = 'white'
    }

    darkTheme = !darkTheme
  }
}

export default App

/*
 *{this.state.visible === window.STATES.INFO && <Info />}
 *{this.state.visible === window.STATES.SETTINGS && <Settings />}
 */
