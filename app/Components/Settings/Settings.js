import React, { Component } from 'react'
const css = require('./Settings.css')

let selector

class Settings extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    let content = document.getElementById('content')
    content.className = 'full vcNavbarParent'

    this.colorInit()
  }

  componentWillUnmount() {
    let content = document.getElementById('content')
    content.className = 'full'
  }

  timetable() {
    selector = document.getElementById('timetableSelect')
    selector.value = (localStorage.getItem('forceSmallTable') === 'true') ? 'Small' : 'Full'
    let forceSmall = false
    if (selector.options[selector.selectedIndex].text === 'Small') {
      forceSmall = true
    }
    localStorage.setItem('forceSmallTable', forceSmall)
    console.log(localStorage.getItem('forceSmallTable'))
  }

  colorInit() {
    selector = document.getElementById('colorSelect')
    selector.value = (localStorage.getItem('color') === 'true') ? 'Light' : 'Dark'
    if (localStorage.getItem('color')==='true') {
      selector.options.selectedIndex = 1
    } else if (localStorage.getItem('color')==='false') {
      selector.options.selectedIndex = 0
    }
  }

  color() {
    //the select element
    selector = document.getElementById('colorSelect')
    selector.value = (localStorage.getItem('color') === 'true') ? 'Light' : 'Dark'

    //light is false and dark is true

    let bool

    if (selector.options[selector.selectedIndex].text === 'Dark') {
      bool = true
      selector.options.selectedIndex = 1
      this.changeColor(bool)
    } else if (selector.options[selector.selectedIndex].text === 'Light') {
      bool = false
      selector.options.selectedIndex = 0
    }

    localStorage.setItem('color', bool)
    this.changeColor(bool)
  }

  changeColor(bool) {
    if (bool == true) {
      document.body.className = 'uk-light' //dark
    } else if (bool == false) {
      document.body.className = 'uk-dark' //light
    }
  }

  render() {
    return (
      <div className='vcNavbarCard'>
        <div className='settingsParent'>
          <div className='settingsChild card uk-animation-slide-top-small'>
            <span className='settingsParent' uk-icon='icon: cog; ratio:2'></span>
            <h2 className='uk-text-center'>Settings</h2>
            <div id='settingsContent'>
              <hr/>
              <p>Colour</p>
              <select id='colorSelect' className='uk-select' onChange={this.color.bind(this)}>
                <option>Light</option>
                <option>Dark</option>
              </select>
              <hr/>
              <p>Theme</p>
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