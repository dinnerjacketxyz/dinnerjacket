import React, { Component } from 'react'
const css = require('./App.css')
const data = require('../data')

// Global variables
// Represents the current visible content
window.STATES = {}

const W_DEFAULT = '150px'
const W_MIN = '58px'
const W_LOGO_MIN = '50px'

let navbarMin = false // Based on cookie from previous visit in future
let darkTheme = false
let loggedIn = false
const NAV_COLOURS = ['red', 'blue', 'purple', 'green', 'grey']
const NAV_TEXT = ['Bells', 'Notes', 'Notices', 'Settings', 'Log In']
let btnNavDefault = []
let btnNavMin = []

for (let i = 0; i < NAV_COLOURS.length; i++) {
  btnNavDefault[i] = 'fluid ui labeled icon ' + NAV_COLOURS[i] + ' button'
  btnNavMin[i] = 'ui icon ' + NAV_COLOURS[i] + ' button'
}

class App extends Component {
  constructor(props) {
    super(props)

    // Set default state on launch
    // this.state = {visible: window.whatever}
  }

  toggleLogin() {
    // Ensure this toggles correctly between Login and Logout
    // A user may already have a token and therefore in that case 
    // it needs to begin with 'Logout' functionality
    console.log('Login clicked')
    window.location.href = '/login'
  }

  // Gets called when navbar toggle icon is pressed
  toggleNavbar() {
    console.log('navbar toggled')
    let nav = document.getElementById('navbar')
    let logo = document.getElementById('logo')
    let content = document.getElementById('content')
    let btnNav1 = document.getElementById('btnNav1')
    let btnNav2 = document.getElementById('btnNav2')
    let btnNav3 = document.getElementById('btnNav3')
    let btnNav4 = document.getElementById('btnNav4')
    let btnNav5 = document.getElementById('btnNav5')
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
      toggleButton(btnNav5, 4)
    }, wait)
  }

  test() {
    console.log(data.data['details/participation'])
  }

  // Always renders navbar
  // Renders active page
  render() {
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
            <button className={btnNavDefault[0]} id='btnNav1' onClick={this.test}>
              {NAV_TEXT[0]}
              <i className='bell icon' />
            </button>
            <p/>
            <button className={btnNavDefault[1]} id='btnNav2'>
              {NAV_TEXT[1]}
              <i className='sticky note icon' />
            </button>
            <p/>
            <button className={btnNavDefault[2]} id='btnNav3'>
              {NAV_TEXT[2]}
              <i className='announcement icon' />  
            </button>
            <p/>
            <button className={btnNavDefault[3]} id='btnNav4'>
              {NAV_TEXT[3]}
              <i className='settings icon' />  
            </button>
          </div>

          <div className='logInButton'>
            <button className={btnNavDefault[4]} id='btnNav5' onClick={this.toggleLogin}>
              {NAV_TEXT[4]}
              <i className='unlock icon' />  
            </button>
          </div>

        </div>
        <div className='content' id='content'>
          Test Content
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

/*
 *{this.state.visible === window.STATES.INFO && <Info />}
 *{this.state.visible === window.STATES.SETTINGS && <Settings />}
 */

// TODO apply navbar margin-left in css based on 
// variables W_DEFAULT and W_MIN in this file