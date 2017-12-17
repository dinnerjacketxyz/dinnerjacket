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
const W_MIN = '52px'

let navbarMin = false // Based on cookie from previous visit in future
const NAV_COLOURS = ['red', 'blue', 'purple']
const NAV_TEXT = ['Main', 'Settings', 'Theme']
let btnNavDefault = []
let btnNavMin = []

for (let i = 0; i < NAV_COLOURS.length; i++) {
  btnNavDefault[i] = 'fluid ui labeled icon ' + NAV_COLOURS[i] + ' button'
  btnNavMin[i] = 'ui compact icon ' + NAV_COLOURS[i] + ' button'
}

class App extends Component {
  constructor(props) {
    super(props)
    
    // Set default state on launch
    this.state = {visible: window.STATES.INFO}
  }
  
  toggleNavbar = () => {
    console.log('navbar toggled')
    let nav = document.getElementById('navbar')
    let content = document.getElementById('content')
    let btnNav1 = document.getElementById('btnNav1')
    let btnNav2 = document.getElementById('btnNav2')
    let btnNav3 = document.getElementById('btnNav3')
    
    if (navbarMin) {
      nav.style.width = W_DEFAULT
      content.style.marginLeft = W_DEFAULT
    } else {
      nav.style.width = W_MIN
      content.style.marginLeft = W_MIN
    }

    toggleButton(btnNav1, 0)
    toggleButton(btnNav2, 1)
    toggleButton(btnNav3, 2)
    navbarMin = !navbarMin
  }

  showInfo = () => {
    const {visible} = this.state
    this.setState({visible: window.STATES.INFO})
  }

  showSettings = () => {
    const {visible} = this.state
    this.setState({visible: window.STATES.SETTINGS})
  }

  // Always renders navbar
  // Renders active page
  render() {
    let nav = document.getElementById('navbar')
    return (
      <div id='main' className='light'>
        <div id='navbar' className='navbarLight'>

          <div className='sidebarIcon'>
            <button className='ui compact icon button' onClick={this.toggleNavbar}>
              <i className='sidebar icon' />
            </button>
            <img className='sidebarLogo' type='image/png' />
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
    let mainClass = document.getElementById('main').className
    let navClass = document.getElementById('navbar').className
    if (mainClass === 'light') {
      mainClass = 'dark'
      navClass = 'navbarDark'
    } else if (mainClass === 'dark') {
      mainClass = 'light'
      navClass = 'navbarLight'
    }
    document.getElementById('main').className = mainClass
    document.getElementById('navbar').className = navClass
  }
}

function toggleButton(button, index) {
  if (navbarMin) {
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