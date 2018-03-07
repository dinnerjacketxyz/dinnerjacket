import React, { Component } from 'react'
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

let userData = ''

// Requirements for beta release
// Daily timetable
// Full timetable
// User notes
// Daily notices
// [DONE] Student login

// Global variables
// Represents the current visible content

window.STATES = {
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
  'Daily Notices'
]

//window.authSuccess = false

class App extends Component {
  constructor(props) {
    super(props)

    // Set default state on open to Welcome page
    this.state = { visible: window.STATES.WELCOME, 
                   width: 0, 
                   height:0,
                   renderedSmall: false,
                   renderedBig: false,
                   mounted: false }
    
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
    //let visible = this.state.visible
    /*let url = window.location.toString()
    if (url.substr(url.length - 11) === '/index.html') {
      this.setState({ visible: window.STATES.DASHBOARD })
    } else {*/

    // Sample data request
    // If data is undefined, user is not logged in and therefore welcome page is shown
    // Otherwise it sets the state directly to Dashboard, the default homepage for logged in users
    // TODO there is a slight delay between it switching to the dashboard page (a lil flicker here and there innit)
    http.get('/getdata?url=details/userinfo.json', (res) => {
      res.setEncoding('utf8')
      let a = ''
      res.on('data', (body) => {
        //console.log(body)
        a += body
        if (body != undefined) {
          let visible = this.state.visible
          this.setState({ visible: window.STATES.DASHBOARD})
        }
      })

      res.on('end', (body) => {
        userData = JSON.parse(a)
      })
    })
    //}
  }

  blankNavbar() {
    //makes all navbar <li> look unselected
    //let tabCount = document.getElementById('navbar').childNodes.length
    for (let i = 0; i < nameArray.length; i++) {
      let Li = document.getElementById(nameArray[i] + 'Li')
      let A = document.getElementById(nameArray[i] + 'A')
      let B = document.getElementById(nameArray[i] + 'B')
      let P = document.getElementById(nameArray[i] + 'P')
      let S = document.getElementById(nameArray[i] + 'S')
      
     
      Li.className = 'uk-animation-toggle'
      P.innerText = nameArray[i]
      A.className = 'uk-box-shadow-hover-medium'
      B.innerText = ''
      S.className = 'uk-icon uk-margin-small-right'
    }
  }

  selectedNavbar() {
    //makes all navbar <li> look unselected
    this.blankNavbar()

    //makes one specific <li> look selected
    console.log(nameArray[this.state.visible])
    /*let Li = document.getElementById(nameArray[this.state.visible] + 'Li')
    let A = document.getElementById(nameArray[this.state.visible] + 'A')
    let B = document.getElementById(nameArray[this.state.visible] + 'B')
    let P = document.getElementById(nameArray[this.state.visible] + 'P')
    let S = document.getElementById(nameArray[this.state.visible] + 'S')

    Li.className = 'uk-animation-toggle uk-active'
    P.innerText = ''
    A.className = 'uk-box-shadow-hover-medium uk-card-primary'
    B.innerText = nameArray[this.state.visible]
    S.className = 'uk-icon uk-margin-small-right'
    */
  }

  showDashboard() {
    console.log('Dashboard tab clicked')
    let visible = this.state.visible
    this.setState({ visible: window.STATES.DASHBOARD })
    this.selectedNavbar()
    let name = document.getElementById('sideA')
    name.innerHTML = userData.givenName + ' ' + userData.surname
  }

  showTimetable() {
    console.log('Timetable tab clicked')
    let visible = this.state.visible
    this.setState({ visible: window.STATES.TIMETABLE })
    this.selectedNavbar()
  }

  showNotes() {
    console.log('User notes tab clicked')
    let visible = this.state.visible
    this.setState({ visible: window.STATES.NOTES })
    this.selectedNavbar()
  }

  showNotices() {
    console.log('Daily notices tab clicked')
    let visible = this.state.visible
    this.setState({ visible: window.STATES.NOTICES })
    this.selectedNavbar()
  }

  showAbout() {
    console.log('About tab clicked')
    let visible = this.state.visible
    this.setState({ visible: window.STATES.ABOUT })
  }

  showFeedback() {
    console.log('Settings tab clicked')
    let visible = this.state.visible
    this.setState({ visible: window.STATES.FEEDBACK })
  }

  componentDidMount() {
    this.updateWindowDimensions()
    window.addEventListener('resize', this.updateWindowDimensions)
    this.setState({mounted: true})
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions)
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight})
    let nav = document.getElementById('navbar')
    if (this.state.width <= 820 && this.state.renderedSmall == false && this.state.mounted == true) {
      for (let i = 0; i < nameArray.length; i++) {
        //console.log(i)
        let B = document.getElementById(nameArray[i] + 'B')
        let P = document.getElementById(nameArray[i] + 'P')
        let S = document.getElementById(nameArray[i] + 'S')
        P.innerText = ''
        B.innerText = ''
        S.className = 'uk-icon'
      }
      //nav.height = '50px'
      this.setState({renderedSmall:true})
      this.setState({renderedBig:false})
    } else if (this.state.width > 820 && this.state.renderedBig == false && this.state.mounted == true) {
      this.selectedNavbar()
      this.setState({renderedBig:true})
      this.setState({renderedSmall:false})
    }
  }

  // Always renders navbar
  // Renders active page
  render() {
    return (
      <div id='main' className='main'>
        {this.state.visible === window.STATES.WELCOME && <Welcome />}

        <nav id='navbar' className='uk-navbar uk-navbar-container' uk-navbar='true'>
          <div className='uk-navbar-left'>
            <img id='logo'
              className='djLogo uk-disabled uk-margin-small-left uk-margin-small-right uk-margin-small-top uk-margin-small-bottom'
              alt='logo' src='64.png'>
            </img>
            <ul className='uk-navbar-nav'>

              <li id='DashboardLi' className='uk-animation-toggle uk-active' onClick={this.showDashboard.bind(this)}>
                <a id='DashboardA' className='uk-box-shadow-hover-medium uk-card-primary'>
                  <span id='DashboardS' className='uk-icon uk-margin-small-right' uk-icon='icon: home'/>
                  <p id='DashboardP'></p>
                  <b id='DashboardB'>Dashboard</b>
                </a>
              </li>

              <li id='TimetableLi' className='uk-animation-toggle' onClick={this.showTimetable.bind(this)}>
                <a id='TimetableA' className='uk-box-shadow-hover-medium'>
                  <span id='TimetableS' className='uk-icon uk-margin-small-right' uk-icon='icon: star' />
                  <p id='TimetableP'>Timetable</p>
                  <b id='TimetableB'></b>
                </a>
              </li>

              <li id='User NotesLi' className='uk-animation-toggle' onClick={this.showNotes.bind(this)}>
                <a id='User NotesA' className='uk-box-shadow-hover-medium'>
                  <span id='User NotesS' className='uk-icon uk-margin-small-right' uk-icon='icon: file-edit' />
                  <p id='User NotesP'>User Notes</p>
                  <b id='User NotesB'></b>
                </a>
              </li>

              <li id='Daily NoticesLi' className='uk-animation-toggle' onClick={this.showNotices.bind(this)}>
                <a id='Daily NoticesA' className='uk-box-shadow-hover-medium'>
                  <span id='Daily NoticesS' className='uk-icon uk-margin-small-right' uk-icon='icon: bell' />
                  <p id='Daily NoticesP'>Daily Notices</p>
                  <b id='Daily NoticesB'></b>
                </a>
              </li>

            </ul>
          </div>

          <div className='uk-navbar-right'>
            <ul className='uk-navbar-nav'>
              <li className='uk-animation-toggle'>
                <a id='sideA' className='uk-box-shadow-hover-medium' uk-icon='icon: chevron-down'>
                  Stu Studentson
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
                      <a className='uk-text-danger'>
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
