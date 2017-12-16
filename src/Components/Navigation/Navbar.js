import React, { Component } from 'react'
import './Navbar.css'

/* Returns a side navbar as a division
 * Contains test text for now */


class Navbar extends Component {
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
    console.log(__dirname)
  }

  mainClick() {
    window.location = '/'
    //window.state = window.STATES.MAIN
  }

  settingsClick() {
    window.location = '/settings'
    //window.state = window.STATES.SETTINGS
  }

  render() {
    return (
      <div id='navbar' className='navbarLight'>
        <p className='text'>
          Dinner
          Jacket
        </p>
        <p/>
        <div className='navButtons'>
        <button className='fluid ui red button' onClick={this.mainClick}>Main</button>
        <p/>
        <button className='fluid ui blue button' onClick={this.settingsClick}>Settings</button>
        <p/>
        <button className='fluid ui green loading button'>Loading</button>
        <p/>
        <button className='fluid ui purple button' onClick={this.toggleTheme}>
          Toggle Theme
        </button>
        </div>
      </div>
    );
  }
}

export default Navbar
