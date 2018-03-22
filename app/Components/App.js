import React, { Component } from 'react'
import Welcome from './Welcome/Welcome'
import Dashboard from './Dashboard/Dashboard'
import Timetable from './Timetable/Timetable'
import Notes from './Notes/Notes'
import Notices from './Notices/Notices'
import About from './About/About'
import Feedback from './Feedback/Feedback'
import Changelog from './Changelog/Changelog'
const css = require('./App.css')
const icons = require('../uikit-icons.min')
const http = require('http')

import Loading from './Loading'

//const retrieveNotices = require('./Notices/RetrieveNotices')

window.userData = ''
window.dailyNotices = ''
window.timetable = ''
window.dashboard = ''
window.bells = ''

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
  CHANGELOG: 5,
  FEEDBACK: 6
}

let counter = 0

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
      visible: window.STATES.LOADING
    }

    let visible = this.state.visible
    http.get('/getsession', (res) => {
      res.setEncoding('utf8')
      
      res.on('data', (body) => {
        if (body == 'false') {
          this.setState({ visible: window.STATES.WELCOME })
        } else {
          try {
            this.getData()
          } catch (e) {
            console.log('Error recieving data')
          }
        }
      })
    })
  }
  getData() {
    http.get('/getdata?url=timetable/daytimetable.json', (res) => {
      res.setEncoding('utf8')
      let data = ''
      res.on('data', (body) => {
        data += body
      })
      
      res.on('end', () => {
        window.dashboard = JSON.parse(data)
        if (window.dashboard != '') {
          //let visible = this.state.visible
          document.getElementById('navbar').className = 'uk-navbar uk-navbar-container'
          let visible = this.state.visible
          this.setState({ visible: window.STATES.DASHBOARD })
        }
      })
    })

    http.get('/getdata?url=details/userinfo.json', (res) => {
      res.setEncoding('utf8')

      let a = ''
      res.on('data', (body) => {
        a += body
      })
      res.on('end', () => {
        window.userData = JSON.parse(a)

        let name = document.getElementById('SideP')
        name.innerHTML = window.userData.givenName + ' ' + window.userData.surname
      })
    })

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

    http.get('/getdata?url=timetable/bells.json', (res) => {
      res.setEncoding('utf8')
      let c = ''
      res.on('data', (body) => {
        c += body
      })

      res.on('end', () => {
        window.bells = JSON.parse(c)
      })
    })
  }

  blankNavbar() {
    //makes all navbar <li> look unselected
    let tabCount = document.getElementById('navbar').childNodes.length
    for (let i = 0; i < nameArray.length; i++) {
      ////console.log(i)
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
    //console.log('Dashboard tab clicked')
    if (window.dashboard !== '') {
      let visible = this.state.visible
      this.setState({ visible: window.STATES.DASHBOARD })
      this.selectedNavbar(window.STATES.DASHBOARD)
    }
  }

  showTimetable() {
    //console.log('Timetable tab clicked')
    if (window.timetable !== '') {
      let visible = this.state.visible
      this.setState({ visible: window.STATES.TIMETABLE })
      this.selectedNavbar(window.STATES.TIMETABLE)
    }
  }

  showNotes() {
    //console.log('User notes tab clicked')
    let visible = this.state.visible
    this.setState({ visible: window.STATES.NOTES })
    this.selectedNavbar(window.STATES.NOTES)
  }

  showNotices() {
    //console.log('Daily notices tab clicked')
    if (window.dailyNotices !== '') {
      let visible = this.state.visible
      this.setState({ visible: window.STATES.NOTICES })
      this.selectedNavbar(window.STATES.NOTICES)
    }
  }

  showAbout() {
    //console.log('About tab clicked')
    let visible = this.state.visible
    this.setState({ visible: window.STATES.ABOUT })
    this.selectedNavbar(4)
  }

  showChangelog() {
    //console.log('Changelog tab clicked')
    let visible = this.state.visible
    this.setState({ visible: window.STATES.CHANGELOG })
    this.selectedNavbar(4)
  }

  showFeedback() {
    //console.log('Feedback tab clicked')
    let visible = this.state.visible
    this.setState({ visible: window.STATES.FEEDBACK })
    this.selectedNavbar(4)
  }

  logout() {
    window.location.href = '/logout'
    localStorage.setItem('clicked',false)
    Welcome.spinner()
  }

  logo() {
    //console.log('logo click')
    counter++
    if (counter === 5) {
      alert('spif')
      counter = 0
    }
  }

  // Always renders navbar
  // Renders active page
  render() {
    return (
      <div id='main' className='main'>
        {this.state.visible === window.STATES.LOADING && <Loading />}
        {this.state.visible === window.STATES.WELCOME && <Welcome />}

        <nav id='navbar' className='uk-navbar uk-navbar-container welcomeNav uk-sticky' uk-sticky='true' uk-navbar='true'>
          <div className='uk-navbar-left'>
            <div onClick={this.logo.bind(this)}>
              <img id='logo'
                className='djLogo uk-disabled uk-margin-small-left uk-margin-small-right uk-margin-small-top uk-margin-small-bottom'
                alt='logo' src='64.png'>
              </img>
            </div>
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
                  <span id='TimetableS' className='collapseSpan uk-icon uk-margin-small-right' uk-icon='icon: table' />
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
                      <a onClick={this.showChangelog.bind(this)}>
                        <span className='uk-icon uk-margin-small-right' uk-icon='icon: code' />
                        Changelog
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
          {this.state.visible === window.STATES.CHANGELOG && <Changelog />}
          {this.state.visible === window.STATES.FEEDBACK && <Feedback />}
        </div>

      </div>
    )
  }


}

export default App
