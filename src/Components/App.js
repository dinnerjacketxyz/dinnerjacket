import React, { Component } from 'react'
import Info from './Info/Info'
import Settings from './Settings/Settings'
import './App.css'

// Global variables
// Represents the current visible content
window.STATES = {
  INFO: 0,
  SETTINGS: 1
}

const W_DEFAULT = '150px'
const W_MIN = '58px'
const W_LOGO_MIN = '50px'

let navbarMin = false // Based on cookie from previous visit in future
let darkTheme = false
let loggedIn = false
const NAV_COLOURS = ['red', 'blue', 'purple', 'grey']
const NAV_TEXT = ['Main', 'Settings', 'Theme', 'Log In']
let btnNavDefault = []
let btnNavMin = []

for (let i = 0; i < NAV_COLOURS.length; i++) {
  btnNavDefault[i] = 'fluid ui labeled icon ' + NAV_COLOURS[i] + ' button'
  btnNavMin[i] = 'ui icon ' + NAV_COLOURS[i] + ' button'
}

 // global oauth stuff
const cred = {
  client: {
    id: 'dinnerjacket_1514947891',
    secret: 'REDACTED'
  },
  auth: {
    tokenHost: 'https://student.sbhs.net.au',
    tokenPath: '/api/token',
    authorizePath: '/api/authorize'
  }
}
const oauth2 = require('simple-oauth2').create(cred);
let redirect = ''
if (window.location.hostname === 'localhost') {
  console.log('App running in localhost')
  redirect = 'http://localhost:3000/callback'
} else {
  redirect = 'http://www.dinnerjacket.xyz/callback'
}
const authorizationUri = oauth2.authorizationCode.authorizeURL({
  redirect_uri: redirect,
  scope: 'all-ro',
  state: 'abc'
});

const http = require('http')
http.get('/callback', (res) => {

  // get url path
  const url = document.location.href

  // extract code from url
  const code = url.substr(36, 40)
  console.log(code)

  getToken(code)

});

function getToken(code) {
  const options = {
    code,
  };

  oauth2.authorizationCode.getToken(options, (error, result) => {
    if (error) {
      console.error('Access Token Error', error.message);
    }

    console.log('The resulting token: ', result);

  });
}

class App extends Component {
  constructor(props) {
    super(props)
    
    // Set default state on launch
    this.state = {visible: window.STATES.INFO}
  }
  
  // Gets called when navbar toggle icon is pressed
  toggleNavbar = () => {
    console.log('navbar toggled')
    let nav = document.getElementById('navbar')
    let logo = document.getElementById('logo')
    let content = document.getElementById('content')
    let btnNav1 = document.getElementById('btnNav1')
    let btnNav2 = document.getElementById('btnNav2')
    let btnNav3 = document.getElementById('btnNav3')
    let btnNav4 = document.getElementById('btnNav4')
    let sidebarIcon = document.getElementById('sidebarIcon')
    
    if (navbarMin) {
      nav.style.width = W_DEFAULT
      sidebarIcon.style.width = 'auto'
      logo.style.width = 'auto'
      logo.style.marginLeft = ''
      content.style.marginLeft = W_DEFAULT
    } else {
      nav.style.width = W_MIN
      sidebarIcon.style.width = W_MIN
      logo.style.width = W_LOGO_MIN
      logo.style.marginLeft = '-5.5px'
      content.style.marginLeft = W_MIN
    }

    navbarMin = !navbarMin

    let wait = 0
    if (navbarMin) {
      wait = 150
    }

    window.setTimeout(() => {
      console.log('time')
      toggleButton(btnNav1, 0)
      toggleButton(btnNav2, 1)
      toggleButton(btnNav3, 2)
      toggleButton(btnNav4, 3)
    }, wait)
  }

  showInfo = () => {
    const {visible} = this.state
    this.setState({visible: window.STATES.INFO})
  }

  showSettings = () => {
    const {visible} = this.state
    this.setState({visible: window.STATES.SETTINGS})
  }

  // Handles pressing of Log In/Log Out button in bottom left
  logInOut = () => {
    //console.log('log in/out pressed')
    if (loggedIn) {
      // Log user out
      console.log('logging out')
    } else {
      // Authenticate/Log user in
      console.log('logging in')
      window.location = authorizationUri
      
    }
  }



  // Always renders navbar
  // Renders active page
  render() {
    let nav = document.getElementById('navbar')
    return (
      <div id='main' className='main'>
        <div id='navbar' className='navbar'>

          <div id='sidebarIcon' className='sidebarIcon'>
            <button className='ui icon button' onClick={this.toggleNavbar}>
              <i className='sidebar icon' />
            </button>
            <img id='logo' className='sidebarLogo' type='image/png' />
          </div>

          <div className='navButtons'>
            <button className={btnNavDefault[0]} id='btnNav1' onClick={this.showInfo}>
              {NAV_TEXT[0]}
              <i className='wait icon' />
            </button>
            <p/>
            <button className={btnNavDefault[1]} id='btnNav2'onClick={this.showSettings}>
              {NAV_TEXT[1]}
              <i className='settings icon' />
            </button>
            <p/>
            <button className={btnNavDefault[2]} id='btnNav3' onClick={this.toggleTheme}>
              {NAV_TEXT[2]}
              <i className='theme icon' />  
            </button>
          </div>

          <div className='logInButton'>
            <button className={btnNavDefault[3]} id='btnNav4' onClick={this.logInOut}>
              {NAV_TEXT[3]}
              <i className='unlock icon' />  
            </button>
          </div>

        </div>
        <div className='content' id='content'>
          {this.state.visible === window.STATES.INFO && <Info />}
          {this.state.visible === window.STATES.SETTINGS && <Settings />}
        </div>
      </div>
    )
  }

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

function toggleButton(button, index) {
  if (!navbarMin) {
    button.className = btnNavDefault[index]
    button.childNodes[0].nodeValue = NAV_TEXT[index]
  } else {
    button.className = btnNavMin[index]
    button.childNodes[0].nodeValue = ''
  }
}

export default App

// TODO apply navbar margin-left in css based on 
// variables W_DEFAULT and W_MIN in this file