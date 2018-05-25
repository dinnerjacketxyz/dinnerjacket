import React, { Component } from 'react'
const css = require('./Settings.css')

let dark = false

let selector

class Settings extends Component {
  constructor(props) {
    super(props)
    
    dark = localStorage.getItem('dark')
  }

  componentDidMount() {
    let content = document.getElementById('content')
    content.className = 'full vcNavbarParent'

    selector = document.getElementById('timetableSelect')
    /*if (localStorage.getItem('forceSmallTable') === 'true') {
      selector.value = 'Small'
    } else {
      selector.value = 'Full'
    }*/

    selector.value = (localStorage.getItem('forceSmallTable') === 'true') ? 'Small' : 'Full'
  }

  componentWillUnmount() {
    let content = document.getElementById('content')
    content.className = 'full'
  }

  toggleTheme() {
    console.log('toggle theme')

    let main = document.getElementById('main')
    //let navbar = document.getElementById('navbar')

    if (dark) {
      main.style.backgroundColor = '#FFFFFF'
      main.style.color = '#000000'
    } else {
      main.style.backgroundColor = '#2a2c31'
      main.style.color = '#FFFFFF'
    }
    dark = !dark
    localStorage.setItem('dark', dark)
  }

  timetable() {
    let forceSmall = false
    if (selector.options[selector.selectedIndex].text !== 'Default') {
      forceSmall = true
    }
    localStorage.setItem('forceSmallTable', forceSmall)
  }

  render() {
    return (
      <div className='vcNavbarCard'>
        <div className='profileParent'>
          <div className='profileChild uk-animation-slide-top-small'>
            <span className='profileParent' uk-icon='icon: cog; ratio:2'></span>
            <h2 className='uk-text-center'>Settings</h2>
            <div id='profileContent'>
              <hr/>
              <p>Colour option</p>
              <select className='uk-select'>
                <option>Light</option>
                <option>Dark</option>
              </select>
              <hr/>
              <p>Theme option</p>
              <select className='uk-select'>
                <option>Material</option>
                <option>Clean</option>
              </select>
              <hr/>
              <p>Timetable</p>
              <select id='timetableSelect' onChange={this.timetable.bind(this)} className='uk-select'>
                <option>Full</option>
                <option>Small</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Settings