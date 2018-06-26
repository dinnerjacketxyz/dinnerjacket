import React, { Component } from 'react'
const css = require('./Settings.css')

let selector
let color
let theme
let bodyArray = ['uk-dark','material']

let width = 0
let height = 0
let timetable

class Settings extends Component {
  constructor(props) {
    super(props)
    width = window.innerWidth
    height = window.innerHeight
  }

  componentDidMount() {
    timetable = document.getElementById('timetableSelect')
    if (width < 530 || height < 620) {
      timetable.setAttribute('disabled', true)
    }

    let content = document.getElementById('content')
    content.className = 'full vcNavbarParent'

    this.colorInit()
    this.themeInit()
    this.loadBodyArray()

    selector = document.getElementById('timetableSelect')
    selector.value = (localStorage.getItem('forceSmallTable') === 'true') ? 'Small' : 'Full'
    let bodyArray = ['uk-dark','material']
  }

  loadBodyArray() {
    if (localStorage.getItem('theme') === 'true') {
      bodyArray[1] = 'clean' //Clean
    } else if (localStorage.getItem('theme') === 'false') {
      bodyArray[1] = 'material' //Material
    } else if (localStorage.getItem('color') === 'true') {
      bodyArray[0] = 'uk-light' //dark
      
    } else if (localStorage.getItem('color') ==='false') {
      bodyArray[0] = 'uk-dark' //light
    }
    localStorage.setItem('bodyArray',bodyArray)
  }

  componentWillUnmount() {
    let content = document.getElementById('content')
    content.className = 'full'
  }

  timetable() {
    let forceSmall = false
    if (selector.options[selector.selectedIndex].text === 'Small') {
      forceSmall = true
    }
    localStorage.setItem('forceSmallTable', forceSmall)
    //(localStorage.getItem('forceSmallTable'))
  }

  themeInit() {
    theme = document.getElementById('themeSelect')
    let bool = localStorage.getItem('theme')
    if (bool==='true') {
      theme.options.selectedIndex = 1
    } else if (bool==='false') {
      theme.options.selectedIndex = 0
    }
  }

  colorInit() {
    color = document.getElementById('colorSelect')
    let bool = localStorage.getItem('color')
    if (bool==='true') {
      color.options.selectedIndex = 1
    } else if (bool==='false') {
      color.options.selectedIndex = 0
    }
  }

  color() {
    //the select element
    color = document.getElementById('colorSelect')
    color.value = (localStorage.getItem('color') === 'true') ? 'Light' : 'Dark'

    //light is false and dark is true

    let bool

    if (color.options[color.selectedIndex].text === 'Dark') {
      bool = true
      color.options.selectedIndex = 1
      this.changeBody(color.options[color.selectedIndex].text)
    } else if (color.options[color.selectedIndex].text === 'Light') {
      bool = false
      color.options.selectedIndex = 0
      this.changeBody(color.options[color.selectedIndex].text)
    }

    localStorage.setItem('color', bool)
    this.changeBody(bool, color.options[color.selectedIndex].text)
    this.changeBody(theme.options[theme.selectedIndex].text)
  }

  theme() {
    //the select element
    theme = document.getElementById('themeSelect')
    theme.value = (localStorage.getItem('theme') === 'true') ? 'Material' : 'Clean'

    let bool

    if (theme.options[theme.selectedIndex].text === 'Clean') {
      bool = true
      theme.options.selectedIndex = 1
      this.changeBody(theme.options[theme.selectedIndex].text)
    } else if (theme.options[theme.selectedIndex].text === 'Material') {
      bool = false
      theme.options.selectedIndex = 0
      this.changeBody(theme.options[theme.selectedIndex].text)
    }

    localStorage.setItem('theme', bool)
    this.changeBody(bool, theme.options[theme.selectedIndex].text)
    this.changeBody(color.options[color.selectedIndex].text)
  }

  changeBody(text) { 
    //(bodyArray)
    if (text == 'Clean') {
      bodyArray[1] = 'clean' //Clean
    } else if (text == 'Material') {
      bodyArray[1] = 'material' //Material
    } else if (text == 'Dark') {
      bodyArray[0] = 'uk-light' //dark
    } else if (text == 'Light') {
      bodyArray[0] = 'uk-dark' //light
    }
    //(bodyArray)
    document.body.className = bodyArray.join(' ')
    localStorage.setItem('bodyArray',bodyArray)
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
              <select id='themeSelect' className='uk-select' onChange={this.theme.bind(this)}>
                <option>Material</option>
                <option>Clean</option>
              </select>
              <hr/>
              <div>
                <p className='uk-align-left'>Timetable</p><a id='ttableInfo' uk-icon="info" className='uk-align-right' uk-tooltip="title: Allows you to choose to display single-day timetable regardless of screen size; pos: top-right; delay: 500"></a>
              </div>
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