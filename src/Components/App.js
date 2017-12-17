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

class App extends Component {
  constructor(props) {
    super(props)
    
    // Set default state on launch
    this.state = {visible: window.STATES.INFO}
  }

  showInfo = () => {
    const {visible} = this.state
    this.setState({visible: window.STATES.INFO}) //TODO change to window state vars
  }

  showSettings = () => {
    const {visible} = this.state
    this.setState({visible: window.STATES.SETTINGS})
  }

  render() {
    return (
      <div id='main' className='light'>
        <div id='navbar' className='navbarLight'>

          <div className='sidebarIcon'>
            <button className='ui compact icon button'>
              <i className='sidebar icon' />
            </button>
          </div>

          <div className='navButtons'>
            <button className='fluid ui labeled icon red button' onClick={this.showInfo}>
              Main
              <i className='wait icon' />
            </button>
            <p/>
            <button className='fluid ui labeled icon blue button' onClick={this.showSettings}>
              Settings
              <i className='settings icon' />
            </button>
            <p/>
            <button className='fluid ui labeled icon purple button' onClick={this.toggleTheme}>
              Theme
              <i className='theme icon' />  
            </button>
          </div>
        </div>
        <div className='content'>
          {this.state.visible === window.STATES.INFO && <Info />}
          {this.state.visible === window.STATES.SETTINGS && <Settings />}
        </div>
      </div>
    )
  }

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

export default App