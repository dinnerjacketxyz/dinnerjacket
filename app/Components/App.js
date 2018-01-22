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
        <nav className='uk-navbar-container uk-margin' uk-navbar='true'>
          <div className='uk-navbar-left'>
            <ul className='uk-navbar-nav'>
              <li className='uk-animation-toggle'>
                <a className='uk-box-shadow-hover-medium'>
                  Dashboard
                </a>
              </li>
              <li className='uk-animation-toggle'>
                <a className='uk-box-shadow-hover-medium'>
                  Timetable
                </a>
              </li>
              <li className='uk-animation-toggle'>
                <a className='uk-box-shadow-hover-medium'>
                  Notes
                </a>
              </li>
              <li className='uk-animation-toggle'>
                <a className='uk-box-shadow-hover-medium'>
                  Daily Notices
                </a>
              </li>
              <li className='uk-animation-toggle'>
                <a className='uk-box-shadow-hover-medium'>
                  Calendar
                </a>
              </li>
            </ul>
          </div>
          
          <div className='uk-navbar-right'>
            <ul className='uk-navbar-nav'>
              <li className='uk-animation-toggle'>
                <a className='uk-box-shadow-hover-medium' uk-icon='icon: chevron-down'>
                  Stu Studentson
                </a>
                <div className='uk-navbar-dropdown' uk-dropdown='mode: click'>
                  <ul className='uk-nav uk-navbar-dropdown-nav'>
                    <li><a>Profile</a></li>
                    <li><a>Settings</a></li>
                    <li><a>SBHS Login</a></li>
                    <li><a>Parent Login</a></li>
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
