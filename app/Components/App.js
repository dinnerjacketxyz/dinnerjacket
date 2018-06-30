import React, { Component } from 'react'
import Welcome from './Welcome/Welcome'
import Dashboard from './Dashboard/Dashboard'
import Timetable from './Timetable/Timetable'
import Notes from './Notes/Notes'
import Notices from './Notices/Notices'
import Calendar from './Calendar/Calendar'
import About from './About/About'
import Profile from './Profile/Profile'
import Feedback from './Feedback/Feedback'
import Changelog from './Changelog/Changelog'
import Settings from './Settings/Settings'
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
//window.publicCal = ''
window.diaryCal = ''
window.participation = ''
window.userInfo = ''

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
  CALENDAR: 4,
  ABOUT: 5,
  PROFILE: 9999,
  SETINGS: -123,
  CHANGELOG: 6,
  FEEDBACK: 7
}

let counter = 0

const nameArray = [
  'Dashboard',
  'Timetable',
  'Notes',
  'Notices',
  'Calendar',
  'Side'
]

//let loggedIn = false

class App extends Component {
  constructor(props) {
    super(props)

    //('Server Updated 3')

    // Set default state on open to Welcome page
    this.state = {
      visible: window.STATES.LOADING
    }

    document.addEventListener('touchstart', handleTouchStart, false)     
    document.addEventListener('touchmove', handleTouchMove, false)
    
    let xDown, yDown

    function handleTouchStart(evt) {                                         
      xDown = evt.touches[0].clientX
      yDown = evt.touches[0].clientY
    }                  
  
    function handleTouchMove(evt) {
      if (!xDown || !yDown) return
  
      let xUp = evt.touches[0].clientX
      let yUp = evt.touches[0].clientY
  
      let xDiff = xDown - xUp
      let yDiff = yDown - yUp
  
      if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if (xDiff > 0) {
          /* left swipe */ 
          console.log('left swipe')
        } else {
          /* right swipe */
          console.log('right swipe')
        }                       
      } else {
        if ( yDiff > 0 ) {
          /* up swipe */ 
          console.log('up swipe')
        } else { 
          /* down swipe */
          console.log('down swipe')
        }                                                                 
      }

      // reset values
      xDown, yDown = null                                             
    }
  }

  showLogin() {
    let visible = this.state.visible
    this.setState({ visible: window.STATES.WELCOME })
  }
  
  componentDidMount() {

    const mainApp = this
  
    //('checking tokens')
  
    // if refresh token doesn't exist (i.e. not logged on)
    if (localStorage.getItem('refreshToken') == null) {
      http.get('/gettoken', (res) => {
        //('starting gettoken req.')
        res.setEncoding('utf8')
        
        let data = ''
        res.on('data', (body) => {
          //('res data')
          data += body
          //(data)
        })
        
        res.on('end', () => {
          //('res end')
          if (data != 'false') {
            localStorage.setItem('accessToken', JSON.parse(data)[0])
            // 1 hour
            localStorage.setItem('accessTokenExpiry', new Date((new Date()).getTime() + 60*60*1000))
            localStorage.setItem('refreshToken', JSON.parse(data)[1])
            localStorage.setItem('refreshTokenExpiry', new Date(JSON.parse(data)[2]))
            mainApp.getData()
          } else {
            mainApp.showLogin()
          }
        })
      })
      
    // if refresh token exists, check its expiry
    } else if (new Date(localStorage.getItem('refreshTokenExpiry')) < new Date()) {
        //('refresh token expired')
        localStorage.clear()
        mainApp.showLogin()
      
    // refresh token is valid at this point
    } else {
      
      //('refresh token valid, checking access token')
      
      if (new Date(localStorage.getItem('accessTokenExpiry')) < new Date()) {
        //('access token expired, getting new access token')
        http.get('/getnewaccesstoken?rt=' + localStorage.getItem('refreshToken'), (res) => {
          let data = ''
          res.on('data', (body) => {
            data += body
          })
          res.on('end', () => {
            localStorage.setItem('accessToken', data)
            localStorage.setItem('accessTokenExpiry', new Date((new Date()).getTime() + 60*60*1000))
            mainApp.getData()
          })
        })
        
      // access token exists, get data
      } else {
        //('access token exists')
        mainApp.getData()
      }
    }

    //applies appearance settings from localstorage
    try {
      if (localStorage.getItem('bodyArray')!=null) {
        let temp = localStorage.getItem('bodyArray').split(',')
        document.body.className = temp.join(' ')
      }
    } catch(err) {
      //('error loading cosmetic settings')
      localStorage.removeItem('bodyArray')
      localStorage.removeItem('theme')
      localStorage.removeItem('color')
    } 
  }
  
  getData() {
    //('ACCESS: '   + localStorage.getItem('accessToken').substring(0, 5) + '...')
    //('A_EXPIRY: ' + localStorage.getItem('accessTokenExpiry'))
    //('REFRESH: '  + localStorage.getItem('refreshToken').substring(0, 5) + '...')
    //('R_EXPIRY: ' + localStorage.getItem('refreshTokenExpiry'))
    
    const token = localStorage.getItem('accessToken')
    
    document.getElementById('navbar').className = 'uk-navbar uk-navbar-container'
    let visible = this.state.visible
    this.setState({ visible: window.STATES.DASHBOARD })
    /*
    // Daily timetable
    http.get('/getdata?token=' + token + '&url=timetable/daytimetable.json', (res) => {
      res.setEncoding('utf8')
      let data = ''
      res.on('data', (body) => {
        data += body
      })
      
      res.on('end', () => {
        try {
          window.dashboard = JSON.parse(data)
        } catch (e) {
          //(e)
          //(data)
          this.showLogin()
          return
        }
        if (window.dashboard != '') {
          /et visible = this.state.visible
          document.getElementById('navbar').className = 'uk-navbar uk-navbar-container'
          let visible = this.state.visible
          this.setState({ visible: window.STATES.DASHBOARD })
        }
      })
    })
    */
    
    /* User Info
       {"username" : "436345789",     
        "studentId" : "436345789",
        "givenName" : "John",        
        "surname"   : "Citizen",        
        "rollClass" : "07E",        
        "yearGroup" : "7",        
        "role"      : "Student",      // may be valid for staff
        "department": "Year 7",       // may be valid for staff
        "office"    : "7E",           // may be valid for staff
        "email"     : "436345789@student.sbhs.nsw.edu.au",
        "emailAliases : [             // array of email addresses also valid for the user
          "john.citizen23@student.sbhs.nsw.edu.au"],
        "decEmail"  : "jcz@education.nsw.gov.au",
        "groups"    : []              // array of network group memberships
      }
    */
    
    http.get('/getdata?token=' + token + '&url=details/userinfo.json', (res) => {
      res.setEncoding('utf8')

      let a = ''
      res.on('data', (body) => {
        a += body
      })
      res.on('end', () => {
        try {
          window.userData = JSON.parse(a)
        } catch (e) {
          //(e)
          //(a)
          //this.showLogin()
          return
        }

        let name = document.getElementById('SideP')
        name.innerHTML = window.userData.givenName + ' ' + window.userData.surname
      })
    })

    // Get daily notices from SBHS API
    http.get('/getdata?token=' + token + '&url=dailynews/list.json', (res) => {
      res.setEncoding('utf8')
      let d = ''
      res.on('data', (body) => {
        d += body
      })
      res.on('end', () => {
        try {
          window.dailyNotices = JSON.parse(d)
        } catch (e) {
          //(e)
          //(d)
          //this.showLogin()
          return
        }
      })
    })

    // Get timetable data from SBHS API
    http.get('/getdata?token=' + token + '&url=timetable/timetable.json', (res) => {
      res.setEncoding('utf8')
      let b = ''
      res.on('data', (body) => {
        b += body
      })

      res.on('end', () => {
        try {
          window.timetable = JSON.parse(b)
        } catch (e) {
          //(e)
          //(b)
          //this.showLogin()
          return
        }
      })
    })

    http.get('/getdata?token=' + token + '&url=timetable/bells.json', (res) => {
      res.setEncoding('utf8')
      let c = ''
      res.on('data', (body) => {
        c += body
      })

      res.on('end', () => {
        try {
          window.bells = JSON.parse(c)
        } catch (e) {
          //(e)
          //(c)
          //this.showLogin()
          return
        }
      })
    })
    
    // get data for the whole month
    
    const year = (new Date()).getFullYear()
    const month = (new Date()).getMonth() + 1

    var from = year + '-' + (month > 9 ? month : '0' + month) + '-01'
    var to = year + '-' + (month > 9 ? month : '0' + month) + '-' + (new Date(year, month, 0).getDate())
    
    http.get('/getdata?token=' + token + '&url=diarycalendar/events.json?from=' + from + '&to=' + to, (res) => {
      res.setEncoding('utf8')
      let d = ''
      res.on('data', (body) => {
        d += body
      })
      res.on('end', () => {
        try {
          window.diaryCal = JSON.parse(d)
        } catch (e) {
          //(e)
          //(d)
          this.showLogin()
          return
        }
      })
    })
    
    /* Participation
      [                              // array of participation information
        {"year" : "2014",            // year of activity
          "activity" : "Smiling",     // name of activity
          "category" : "90",          // award scheme category number
          "categoryName" : "Bonus",   // name of category
          "points" : "1",             // number of points awarded
          "pointsCap" : 10            // maximum number of points achievable in the category
          },
          ...
      ]
    */
    http.get('/getdata?token=' + token + '&url=details/participation.json', (res) => {
      res.setEncoding('utf8')
      let data = ''
      res.on('data', (body) => {
        data += body
      })

      res.on('end', () => {
        try {
          window.participation = JSON.parse(data)
        } catch (e) {
          //(e)
          //(data)
          //this.showLogin()
          return
        }
      })
    })
  }

  blankNavbar() {
    //makes all navbar <li> look unselected
    for (let i = 0; i < nameArray.length; i++) {
      ////(i)
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
    ////(num)
    this.blankNavbar()

    //makes one specific <li> look selected

    let Li = document.getElementById(nameArray[num] + 'Li')
    let A = document.getElementById(nameArray[num] + 'A')
    let B = document.getElementById(nameArray[num] + 'B')
    let P = document.getElementById(nameArray[num] + 'P')

    Li.className = 'uk-animation-toggle uk-active'
    P.innerText = ''
    A.className = 'uk-box-shadow-hover-medium navbarActive'
    if (nameArray[num]!='Side') {
      B.innerText = nameArray[num]
    } else {
      B.innerText = window.userData.givenName + ' ' + window.userData.surname
    }
  }

  showDashboard() {
    ////('Dashboard tab clicked')
    //if (window.dashboard !== '') {
      let visible = this.state.visible
      this.setState({ visible: window.STATES.DASHBOARD })
      this.selectedNavbar(window.STATES.DASHBOARD)
    //}
  }

  showTimetable() {
    ////('Timetable tab clicked')
    if (window.timetable !== '') {
      let visible = this.state.visible
      this.setState({ visible: window.STATES.TIMETABLE })
      this.selectedNavbar(window.STATES.TIMETABLE)
    }
  }

  showNotes() {
    ////('User notes tab clicked')
    if (Quill != undefined) {
      let visible = this.state.visible
      this.setState({ visible: window.STATES.NOTES })
      this.selectedNavbar(window.STATES.NOTES)
    }
  }

  showNotices() {
    ////('Daily notices tab clicked')
    if (window.dailyNotices !== '') {
      let visible = this.state.visible
      this.setState({ visible: window.STATES.NOTICES })
      this.selectedNavbar(window.STATES.NOTICES)
    }
  }

  showCalendar() {
    ////('Calendar tab clicked')
    if (window.diaryCal !== '') {
      let visible = this.state.visible
      this.setState({ visible: window.STATES.CALENDAR })
      this.selectedNavbar(window.STATES.CALENDAR)
    }
  }

  showAbout() {
    ////('About tab clicked')
    let visible = this.state.visible
    this.setState({ visible: window.STATES.ABOUT })
    this.selectedNavbar(5)
  }

  showProfile() {
    if (window.participation !== '' && window.userData !== '') {
      let visible = this.state.visible
      this.setState({ visible: window.STATES.PROFILE })
      this.selectedNavbar(5)
    }
  }

  showSettings() {
    let visible = this.state.visible
    this.setState({ visible: window.STATES.SETTINGS })
    this.selectedNavbar(5)
  }

  showChangelog() {
    ////('Changelog tab clicked')
    let visible = this.state.visible
    this.setState({ visible: window.STATES.CHANGELOG })
    this.selectedNavbar(5)
  }

  showFeedback() {
    ////('Feedback tab clicked')
    let visible = this.state.visible
    this.setState({ visible: window.STATES.FEEDBACK })
    this.selectedNavbar(5)
  }

  logout() {
    window.location.href = '/logout'
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('accessTokenExpiry')
    localStorage.removeItem('refreshTokenExpiry')
    //DONTCLEARLOCALSTORAGEPK
    //REMOVEITEMSINDIVIDUALLYIFYOUNEEDTO
    localStorage.setItem('clicked',false)
  }

  logo() {
    ////('logo click')
    counter++
    if (counter >= 3) {
      //DONTCLEARLOCALSTORAGEPK
      alert('spif')
      window.location.href = '/test'
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
              <img
                className='djLogo uk-disabled uk-margin-small-left uk-margin-small-right uk-margin-small-top uk-margin-small-bottom'
                alt='logo' src='./icons/64.png'>
              </img>
            </div>
            <ul className='uk-navbar-nav'>

              <li id='DashboardLi' className='uk-animation-toggle uk-active' onClick={this.showDashboard.bind(this)}>
                <a id='DashboardA' className='uk-box-shadow-hover-small uk-card-primary'>
                  <span id='DashboardS' className='collapseSpan uk-icon uk-margin-small-right' uk-icon='icon: home'/>
                  <p className='collapseText' id='DashboardP'></p>
                  <b className='collapseText' id='DashboardB'>{nameArray[0]}</b>
                </a>
              </li>

              <li id='TimetableLi' className='uk-animation-toggle' onClick={this.showTimetable.bind(this)}>
                <a id='TimetableA' className='uk-box-shadow-hover-small'>
                  <span id='TimetableS' className='collapseSpan uk-icon uk-margin-small-right' uk-icon='icon: table' />
                  <p className='collapseText' id='TimetableP'>{nameArray[1]}</p>
                  <b className='collapseText' id='TimetableB'></b>
                </a>
              </li>

              <li id='NotesLi' className='uk-animation-toggle' onClick={this.showNotes.bind(this)}>
                <a id='NotesA' className='uk-box-shadow-hover-small'>
                  <span id='NotesS' className='collapseSpan uk-icon uk-margin-small-right' uk-icon='icon: file-edit' />
                  <p className='collapseText' id='NotesP'>{nameArray[2]}</p>
                  <b className='collapseText' id='NotesB'></b>
                </a>
              </li>

              <li id='NoticesLi' className='uk-animation-toggle' onClick={this.showNotices.bind(this)}>
                <a id='NoticesA' className='uk-box-shadow-hover-small'>
                  <span id='NoticesS' className='collapseSpan uk-icon uk-margin-small-right' uk-icon='icon: bell' />
                  <p className='collapseText' id='NoticesP'>{nameArray[3]}</p>
                  <b className='collapseText' id='NoticesB'></b>
                </a>
              </li>

              <li id='CalendarLi' className='uk-animation-toggle' onClick={this.showCalendar.bind(this)}>
                <a id='CalendarA' className='uk-box-shadow-hover-small'>
                  <span id='CalendarS' className='collapseSpan uk-icon uk-margin-small-right' uk-icon='icon: calendar' />
                  <p className='collapseText' id='CalendarP'>{nameArray[4]}</p>
                  <b className='collapseText' id='CalendarB'></b>
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
                      <a onClick={this.showProfile.bind(this)}>
                        <span className='uk-icon uk-margin-small-right' uk-icon='icon: user' />
                        Profile
                      </a>
                    </li>

                    <li>
                      <a onClick={this.showSettings.bind(this)}>
                        <span className='uk-icon uk-margin-small-right' uk-icon='icon: cog' />
                        Settings
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

        <div id='content' className = ''>
          {this.state.visible === window.STATES.DASHBOARD && <Dashboard />}
          {this.state.visible === window.STATES.TIMETABLE && <Timetable />}
          {this.state.visible === window.STATES.NOTES && <Notes />}
          {this.state.visible === window.STATES.NOTICES && <Notices />}
          {this.state.visible === window.STATES.CALENDAR && <Calendar />}
          {this.state.visible === window.STATES.ABOUT && <About />}
          {this.state.visible === window.STATES.PROFILE && <Profile />}
          {this.state.visible === window.STATES.SETTINGS && <Settings />}
          {this.state.visible === window.STATES.CHANGELOG && <Changelog />}
          {this.state.visible === window.STATES.FEEDBACK && <Feedback />}
        </div>

      </div>
    )
  }

  /*
              <li id='CalendarLi' className='uk-animation-toggle' onClick={this.showCalendar.bind(this)}>
                <a id='CalendarA' className='uk-box-shadow-hover-medium'>
                  <span id='CalendarS' className='collapseSpan uk-icon uk-margin-small-right' uk-icon='icon: calendar' />
                  <p className='collapseText' id='CalendarP'>{nameArray[4]}</p>
                  <b className='collapseText' id='CalendarB'></b>
                </a>
              </li>*/

}

export default App
