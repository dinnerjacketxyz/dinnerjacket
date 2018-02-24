import React, { Component } from 'react'
import Dashboard from './Dashboard/Dashboard'
import Timetable from './Timetable/Timetable'
import Notes from './Notes/Notes'
import Notices from './Notices/Notices'
import Settings from './Settings/Settings'
import About from './About/About'
import Feedback from './Feedback/Feedback'
import Profile from './Profile/Profile'
const css = require('./App.css')
const icons = require('../uikit-icons.min')

// Requirements for beta release
// Daily timetable
// Full timetable
// User notes
// Daily notices
// [DONE] Student login

// Global variables
// Represents the current visible content

window.STATES = {
  DASHBOARD: 0,
  TIMETABLE: 1,
  NOTES: 2,
  NOTICES: 3,
  CALENDAR: 4,
  SETTINGS: 5,
  ABOUT: 6,
  FEEDBACK: 7,
  PROFILE: 8
}

const nameArray = [
  'Dashboard',
  'Timetable',
  'User Notes',
  'Daily Notices'
]

let loggedIn = false

class App extends Component {
  constructor(props) {
    super(props)

    // Set default state on launch
    this.state = {
      visible: window.STATES.DASHBOARD
    }
  }

  toggleLogin() {
    // Ensure this toggles correctly between Login and Logout
    // A user may already have a token and therefore in that case
    // it needs to begin with 'Logout' functionality
    console.log('Login clicked')

    let url = window.location.toString()
    if (url.substr(url.length - 11) === '/index.html') {
      alert('Run "npm start" to use server and login functions')
      console.log('Run "npm start" to use server and login functions')
    } else {
      window.location.href = '/login'
    }
  }

  blankNavbar() {
    //makes all navbar <li> look unselected
    let tabCount = document.getElementById('navbar').childNodes.length
    for (let i = 0; i < nameArray.length; i++) {
      //console.log(i)
      let Li = document.getElementById(nameArray[i] + 'Li')
      let A = document.getElementById(nameArray[i] + 'A')
      let B = document.getElementById(nameArray[i] + 'B')
      let P = document.getElementById(nameArray[i] + 'P')

      Li.className = 'uk-animation-toggle'
      P.innerText = nameArray[i]
      A.className = 'uk-box-shadow-hover-medium'
      B.innerText = ''
    }
  }

  selectedNavbar(num) {
    //makes all navbar <li> look unselected
    this.blankNavbar()

    //makes one specific <li> look selected

    let Li = document.getElementById(nameArray[num] + 'Li')
    let A = document.getElementById(nameArray[num] + 'A')
    let B = document.getElementById(nameArray[num] + 'B')
    let P = document.getElementById(nameArray[num] + 'P')

    Li.className = 'uk-animation-toggle uk-active'
    P.innerText = ''
    A.className = 'uk-box-shadow-hover-medium uk-card-primary'
    B.innerText = nameArray[num]

  }

  showDashboard() {
    console.log('Dashboard tab clicked')
    let visible = this.state.visible
    this.setState({ visible: window.STATES.DASHBOARD })
    this.selectedNavbar(window.STATES.DASHBOARD)
  }

  showTimetable() {
    console.log('Timetable tab clicked')
    let visible = this.state.visible
    this.setState({ visible: window.STATES.TIMETABLE })
    this.selectedNavbar(window.STATES.TIMETABLE)
  }

  showNotes() {
    console.log('User notes tab clicked')
    let visible = this.state.visible
    this.setState({ visible: window.STATES.NOTES })
    this.selectedNavbar(window.STATES.NOTES)
  }

  showNotices() {
    console.log('Daily notices tab clicked')
    let visible = this.state.visible
    this.setState({ visible: window.STATES.NOTICES })
    this.selectedNavbar(window.STATES.NOTICES)
  }

  showSettings() {
    console.log('Settings tab clicked')
    let visible = this.state.visible
    this.setState({ visible: window.STATES.SETTINGS })
  }

  showAbout() {
    console.log('About tab clicked')
    let visible = this.state.visible
    this.setState({ visible: window.STATES.ABOUT })
  }

  showProfile() {
    console.log('Settings tab clicked')
    let visible = this.state.visible
    this.setState({ visible: window.STATES.PROFILE })
  }

  showFeedback() {
    console.log('Settings tab clicked')
    let visible = this.state.visible
    this.setState({ visible: window.STATES.FEEDBACK })
  }

  // Always renders navbar
  // Renders active page
  render() {
    return (
      <div id='main' className='main'>
        <nav id='navbar' className='uk-navbar uk-navbar-container uk-margin' uk-navbar='true' height='70px'>
          <div className='uk-navbar-left'>
            <img id='logo'
              className='uk-disabled uk-margin-small-left uk-margin-small-right uk-margin-small-top uk-margin-small-bottom'
              alt='logo' src='https://i.imgur.com/xxuf1ni.png' width='60px' height='50px'>
            </img>
            <ul className='uk-navbar-nav'>

              <li id='DashboardLi' className='uk-animation-toggle uk-active' onClick={this.showDashboard.bind(this)}>
                <a id='DashboardA' className='uk-box-shadow-hover-medium uk-card-primary'>
                  <span className='uk-icon uk-margin-small-right' uk-icon='icon: home'/>
                  <p id='DashboardP'></p>
                  <b id='DashboardB'>Dashboard</b>
                </a>
              </li>

              <li id='TimetableLi' className='uk-animation-toggle' onClick={this.showTimetable.bind(this)}>
                <a id='TimetableA' className='uk-box-shadow-hover-medium'>
                  <span className='uk-icon uk-margin-small-right' uk-icon='icon: star' />
                  <p id='TimetableP'>Timetable</p>
                  <b id='TimetableB'></b>
                </a>
              </li>

              <li id='User NotesLi' className='uk-animation-toggle' onClick={this.showNotes.bind(this)}>
                <a id='User NotesA' className='uk-box-shadow-hover-medium'>
                  <span className='uk-icon uk-margin-small-right' uk-icon='icon: file-edit' />
                  <p id='User NotesP'>User Notes</p>
                  <b id='User NotesB'></b>
                </a>
              </li>

              <li id='Daily NoticesLi' className='uk-animation-toggle' onClick={this.showNotices.bind(this)}>
                <a id='Daily NoticesA' className='uk-box-shadow-hover-medium'>
                  <span className='uk-icon uk-margin-small-right' uk-icon='icon: bell' />
                  <p id='Daily NoticesP'>Daily Notices</p>
                  <b id='Daily NoticesB'></b>
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
                      <a onClick={this.showSettings.bind(this)}>
                        <span className='uk-icon uk-margin-small-right' uk-icon='icon: cog' />
                        Settings
                      </a>
                    </li>

                    <li>
                      <a onClick={this.showAbout.bind(this)}>
                        <span className='uk-icon uk-margin-small-right' uk-icon='icon: info' />
                        About
                      </a>
                    </li>

                    <li>
                      <a onClick={this.showFeedback.bind(this)}>
                        <span className='uk-icon uk-margin-small-right' uk-icon='icon: comment' />
                        Feedback
                      </a>
                    </li>

                    <li>
                      <a onClick={this.showProfile.bind(this)}>
                        <span className='uk-icon uk-margin-small-right' uk-icon='icon: user' />
                        Profile
                      </a>
                    </li>

                    <li>
                      <a onClick={this.toggleLogin.bind(this)}>
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

        <div id='content'>
          {this.state.visible === window.STATES.DASHBOARD && <Dashboard />}
          {this.state.visible === window.STATES.TIMETABLE && <Timetable />}
          {this.state.visible === window.STATES.NOTES && <Notes />}
          {this.state.visible === window.STATES.NOTICES && <Notices />}
          {this.state.visible === window.STATES.SETTINGS && <Settings />}
          {this.state.visible === window.STATES.ABOUT && <About />}
          {this.state.visible === window.STATES.FEEDBACK && <Feedback />}
          {this.state.visible === window.STATES.PROFILE && <Profile />}
        </div>

      </div>
    )
  }
}

export default App
