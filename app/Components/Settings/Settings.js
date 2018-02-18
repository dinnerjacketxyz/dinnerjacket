import React, { Component } from 'react'

let darkTheme = false

class Settings extends Component {
  // BROKE nearly works tho
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
      <div className='uk-flex uk-flex-center uk-text-center uk-margin-left uk-margin-right'>
        <div className='uk-card uk-card-default uk-card-body uk-card large uk-width-2-5@xl uk-width-3-5@m uk-width-4-5@s'>
          <h1 className='uk-text-center uk-heading-secondary'>Settings</h1>
          <p className='uk-text-medium'>Nothing to see here...</p>
        </div>
      </div>
    )
  }
}

export default Settings
