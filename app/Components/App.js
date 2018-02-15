import React, { Component } from 'react'
import Dashboard from './Dashboard/Dashboard'
import Timetable from './Timetable/Timetable'
import Notes from './Notes/Notes'
import Notices from './Notices/Notices'
const css = require('./App.css')
const data = require('../data')
const icons = require('../uikit-icons.min')

// Requirements for beta release
// Daily timetable
// Full timetable
// User notes
// Daily notices
// Student login

// TODO create different navbar elements depending on accessLevel


// Global variables
// Represents the current visible content
window.STATES = {
  DASHBOARD: 0,
  TIMETABLE: 1,
  NOTES: 2,
  NOTICES: 3,
  CALENDAR: 4,
  PROFILE: 5,
  SETTINGS: 6
}

let darkTheme = false
let loggedIn = false

class App extends Component {
  constructor(props) {
    super(props)

    // Set default state on launch
     //this.state = {visible: window.STATES.DASHBOARD}
     this.state = {
       visible: window.STATES.DASHBOARD
     }
  }

  toggleLogin() {
    // Ensure this toggles correctly between Login and Logout
    // A user may already have a token and therefore in that case 
    // it needs to begin with 'Logout' functionality
    console.log('Login clicked')
    window.location.href = '/login'
  }

  showDashboard() {
    console.log('Dashboard tab clicked')
    let visible = this.state.visible
    this.setState({ visible: window.STATES.DASHBOARD })
  }

  showTimetable() {
    console.log('Timetable tab clicked')
    let visible = this.state.visible
    this.setState({ visible: window.STATES.TIMETABLE })
  }

  // Always renders navbar
  // Renders active page
  render() {
    return (
      <div id='main' className='main'>
        <nav className='uk-navbar uk-navbar-container uk-margin' uk-navbar='true'>
          <div className='uk-navbar-left'>
            <img className='uk-icon uk-margin-left uk-margin-right sidebarLogo' type='image/png' width='60px' />      
            <ul className='uk-navbar-nav'>

              <li className='uk-animation-toggle' onClick={this.showDashboard.bind(this)}>
                <a className='uk-box-shadow-hover-medium'>
                  <span className='uk-icon uk-margin-small-right' uk-icon='icon: home' />
                  Dashboard
                </a>
              </li>

              <li className='uk-animation-toggle' onClick={this.showTimetable.bind(this)}>
                <a className='uk-box-shadow-hover-medium'>
                  <span className='uk-icon uk-margin-small-right' uk-icon='icon: star' />
                  Timetable
                </a>
              </li>

              <li className='uk-animation-toggle'>
                <a className='uk-box-shadow-hover-medium'>
                  <span className='uk-icon uk-margin-small-right' uk-icon='icon: file-edit' />
                  User Notes
                </a>
              </li>

              <li className='uk-animation-toggle'>
                <a className='uk-box-shadow-hover-medium'>
                  <span className='uk-icon uk-margin-small-right' uk-icon='icon: bell' />
                  Daily Notices
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
                    <li>
                      <a>
                        <span className='uk-icon uk-margin-small-right' uk-icon='icon: cog' />
                        Settings
                      </a>
                    </li>

                    <li>
                      <a>
                        <span className='uk-icon uk-margin-small-right' uk-icon='icon: comment' />
                        Feedback
                      </a>
                    </li>

                    <li>
                      <a>
                        <span className='uk-icon uk-margin-small-right' uk-icon='icon: user' />
                        Profile
                      </a>
                    </li>

                    <li>
                      <a>
                        <span className='uk-icon uk-margin-small-right' uk-icon='icon: sign-in' />
                        Log In
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </nav>

        <div className='content' id='content'>
          {this.state.visible === window.STATES.DASHBOARD && <Dashboard />}
          {this.state.visible === window.STATES.TIMETABLE && <Timetable />}
        </div>
        
      </div>
    )
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
