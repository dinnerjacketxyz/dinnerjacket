import React, { Component } from 'react'

let darkTheme = false

class Settings extends Component {
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

  render() {
    return (
      <div>
        Settings
      </div>
    )
  }
}

export default Settings