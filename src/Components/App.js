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
    this.setState({visible: 0})
  }

  showSettings = () => {
    const {visible} = this.state
    this.setState({visible: 1})
  }

  render() {
    return (
      <div id='main' className='light'>
        <div id='navbar' className='navbarLight'>
          <p className='text'>
            Dinner
            Jacket
          </p>
          <p/>
          <div className='navButtons'>
            <button className='fluid ui red button' onClick={this.showInfo}>Main</button>
            <p/>
            <button className='fluid ui blue button' onClick={this.showSettings}>Settings</button>
            <p/>
            <button className='fluid ui purple button' onClick={this.toggleTheme}>Theme</button>
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