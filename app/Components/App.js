import React, { Component } from 'react'
import Loading from './Loading/Loading'
import Welcome from './Welcome/Welcome'
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
const http = require('http')

//const retrieveNotices = require('./Notices/RetrieveNotices')

window.userData = ''
window.dailyNotices = ''
window.timetable = ''
window.dashboard = ''

// Requirements for beta release
// Daily timetable
// Full timetable
// User notes
// Daily notices
// [DONE] Student login

// Global variables
// Represents the current visible content

window.STATES = {
  LOADING: -2,
  WELCOME: -1,
  DASHBOARD: 0,
  TIMETABLE: 1,
  NOTES: 2,
  NOTICES: 3,
  ABOUT: 4,
  FEEDBACK: 5
}

const nameArray = [
  'Dashboard',
  'Timetable',
  'User Notes',
  'Daily Notices',
  'Side'
]

//let loggedIn = false

class App extends Component {
  constructor(props) {
    super(props)

    // Set default state on open to Welcome page
    this.state = {
      visible: window.STATES.WELCOME
    }

    //let visible = this.state.visible
    /*let url = window.location.toString()
    if (url.substr(url.length - 11) === '/index.html') {
      this.setState({ visible: window.STATES.DASHBOARD })
    } else {*/

    // Sample data request
    // If data is undefined, user is not logged in and therefore welcome page is shown
    // Otherwise it sets the state directly to Dashboard, the default homepage for logged in users
    // TODO there is a slight delay between it switching to the dashboard page (a lil flicker here and there innit)
    // Get daily timetable data from SBHS API
    http.get('/getdata?url=timetable/daytimetable.json', (res) => {
      res.setEncoding('utf8')
      let data = ''
      res.on('data', (body) => {
        data += body
      })

      res.on('end', () => {
        window.dashboard = JSON.parse(data)
        console.log('setting dashboard')
        if (window.dashboard != '') {
          document.getElementById('navbar').className = 'uk-navbar uk-navbar-container'
          let visible = this.state.visible
          this.setState({ visible: window.STATES.DASHBOARD })
          //loggedIn = true
        } else {localStorage.setItem('clicked',false)}
      })
    })

    http.get('/getdata?url=details/userinfo.json', (res) => {
      res.setEncoding('utf8')
      let a = ''
      res.on('data', (body) => {
        //console.log(body)
        a += body
        //let visible = this.state.visible
        //this.setState({ visible: window.STATES.WELCOME })
      })
      res.on('end', () => {
        //data.userData = JSON.parse(a)
        //Data.setUserData(JSON.parse(a))
        window.userData = JSON.parse(a)

        /*let visible = this.state.visible
        this.setState({ visible: window.STATES.WELCOME })
        if (loggedIn) {
          this.setState({ visible: wi.ndow.STATES.DASHBOARD })
        }*/



        let name = document.getElementById('SideP')
        name.innerHTML = window.userData.givenName + ' ' + window.userData.surname
      })
    })
    //}

    //if (this.state.visible != window.STATES.WELCOME) {

    // Get daily notices from SBHS API
    http.get('/getdata?url=dailynews/list.json', (res) => {
      res.setEncoding('utf8')
      let data = ''
      res.on('data', (body) => {
        data += body
      })
      res.on('end', () => {
        window.dailyNotices = JSON.parse(data)
      })
    })

    // Get timetable data from SBHS API
    http.get('/getdata?url=timetable/timetable.json', (res) => {
      res.setEncoding('utf8')
      let b = ''
      res.on('data', (body) => {
        b += body
      })

      res.on('end', () => {
        window.timetable = JSON.parse(b)
      })
    })

    // Initialize Firebase
    // var config = {
    //   apiKey: "AIzaSyAev2g0el9w9m_Ad6CAhCxH9hAJ9pYaazo",
    //   authDomain: "dinnerjacket-5b51a.firebaseapp.com",
    //   databaseURL: "https://dinnerjacket-5b51a.firebaseio.com",
    //   projectId: "dinnerjacket-5b51a",
    //   storageBucket: "dinnerjacket-5b51a.appspot.com",
    //   messagingSenderId: "503058640770"
    // };
    // firebase.initializeApp(config)
    //
    // console.log(firebase)
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
      A.className = 'uk-box-shadow-hover-medium'
      B.innerText = ''
      if (nameArray[i]!='Side') {
        P.innerText = nameArray[i]
      } else {
        P.innerText = window.userData.givenName + ' ' + window.userData.surname
      }
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
    if (nameArray[num]!='Side') {
      B.innerText = nameArray[num]
    } else {
      B.innerText = window.userData.givenName + ' ' + window.userData.surname
    }
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

  showAbout() {
    console.log('About tab clicked')
    let visible = this.state.visible
    this.setState({ visible: window.STATES.ABOUT })
    this.selectedNavbar(4)
  }

  showFeedback() {
    console.log('Settings tab clicked')
    let visible = this.state.visible
    this.setState({ visible: window.STATES.FEEDBACK })
    this.selectedNavbar(4)
  }
  
  logout() {
    window.location.href = '/logout'
  }

  // Always renders navbar
  // Renders active page
  render() {
    return (
      <div id='main' className='main'>
        {this.state.visible === window.STATES.WELCOME && <Welcome />}
        {this.state.visible === window.STATES.LOADING && <Loading />}

        <nav id='navbar' className='uk-navbar uk-navbar-container welcomeNav uk-sticky' uk-sticky='true' uk-navbar='true'>
          <div className='uk-navbar-left'>
            <img id='logo'
              className='djLogo uk-disabled uk-margin-small-left uk-margin-small-right uk-margin-small-top uk-margin-small-bottom'
              alt='logo' src='64.png'>
            </img>
            <ul className='uk-navbar-nav'>

              <li id='DashboardLi' className='uk-animation-toggle uk-active' onClick={this.showDashboard.bind(this)}>
                <a id='DashboardA' className='uk-box-shadow-hover-medium uk-card-primary'>
                  <span id='DashboardS' className='collapseSpan uk-icon uk-margin-small-right' uk-icon='icon: home'/>
                  <p className='collapseText' id='DashboardP'></p>
                  <b className='collapseText' id='DashboardB'>Dashboard</b>
                </a>
              </li>

              <li id='TimetableLi' className='uk-animation-toggle' onClick={this.showTimetable.bind(this)}>
                <a id='TimetableA' className='uk-box-shadow-hover-medium'>
                  <span id='TimetableS' className='collapseSpan uk-icon uk-margin-small-right' uk-icon='icon: star' />
                  <p className='collapseText' id='TimetableP'>Timetable</p>
                  <b className='collapseText' id='TimetableB'></b>
                </a>
              </li>

              <li id='User NotesLi' className='uk-animation-toggle' onClick={this.showNotes.bind(this)}>
                <a id='User NotesA' className='uk-box-shadow-hover-medium'>
                  <span id='User NotesS' className='collapseSpan uk-icon uk-margin-small-right' uk-icon='icon: file-edit' />
                  <p className='collapseText' id='User NotesP'>User Notes</p>
                  <b className='collapseText' id='User NotesB'></b>
                </a>
              </li>

              <li id='Daily NoticesLi' className='uk-animation-toggle' onClick={this.showNotices.bind(this)}>
                <a id='Daily NoticesA' className='uk-box-shadow-hover-medium'>
                  <span id='Daily NoticesS' className='collapseSpan uk-icon uk-margin-small-right' uk-icon='icon: bell' />
                  <p className='collapseText' id='Daily NoticesP'>Daily Notices</p>
                  <b className='collapseText' id='Daily NoticesB'></b>
                </a>
              </li>

            </ul>
          </div>

          <div className='uk-navbar-right'>
            <ul className='uk-navbar-nav'>
              <li id='SideLi' className='uk-animation-toggle'>
                <a id='SideA' className='uk-box-shadow-hover-medium'>
                  <p className='name' id='SideP' />
                  <b className='name' id='SideB'/>
                  <span uk-icon="icon: triangle-down"></span>
                </a>

                <div className='uk-navbar-dropdown' uk-dropdown='mode: click'>
                  <ul className='uk-nav uk-navbar-dropdown-nav'>

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
                      <a className='uk-text-danger' onClick={this.logout.bind(this)}>
                        <span className='uk-icon uk-margin-small-right' uk-icon='icon: sign-out' />
                        Log Out
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
          {this.state.visible === window.STATES.ABOUT && <About />}
          {this.state.visible === window.STATES.FEEDBACK && <Feedback />}
        </div>

      </div>
    )
  }
}

export default App
