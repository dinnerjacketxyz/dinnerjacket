import React, { Component } from 'react'
const css = require('./Settings.css')

let timetable
let color
let theme
let bodyArray = ['uk-dark','Clean']

let width = 0
let height = 0

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

    this.loadBodyArray()
    this.colorInit()
    this.themeInit()
    this.ttableInit()
  }

  ttableInit() { //Default, Full, Small
    timetable = document.getElementById('timetableSelect')
    if (typeof localStorage.getItem('forceSmallTable') !== 'undefined' 
        && localStorage.getItem('forceSmallTable') !== null 
        && localStorage.getItem('forceSmallTable') !== 'true'
        && localStorage.getItem('forceSmallTable') !== 'false') {
      timetable.value = localStorage.getItem('forceSmallTable')
    } else {
      localStorage.setItem('forceSmallTable', 'Default')
      theme.value = 'Default'
    }
  }

  themeInit() { //Clean, Material
    theme = document.getElementById('themeSelect')
    if (typeof localStorage.getItem('theme') !== 'undefined' 
        && localStorage.getItem('theme') !== null 
        && localStorage.getItem('theme') !== 'true'
        && localStorage.getItem('theme') !== 'false') {
      theme.value = localStorage.getItem('theme')
    } else { //first time load
      localStorage.setItem('theme', 'Clean')
      theme.value = 'Clean'
    }
  }

  colorInit() { //light, dark
    color = document.getElementById('colorSelect')
    if (typeof localStorage.getItem('color') !== 'undefined' 
        && localStorage.getItem('color') !== null 
        && localStorage.getItem('color') !== 'true'
        && localStorage.getItem('color') !== 'false') {
      color.value = localStorage.getItem('color')
    } else { //first time load
      localStorage.setItem('color', 'Light')
      color.value = 'Light'
    }
  }

  loadBodyArray() {
    bodyArray[1] = localStorage.getItem('theme') 
    if (localStorage.getItem('color') === 'Dark') {
      bodyArray[0] = 'uk-light'
    } else if (localStorage.getItem('color') ==='Light') {
      bodyArray[0] = 'uk-dark' 
    }
    localStorage.setItem('bodyArray',bodyArray)
  }

  componentWillUnmount() {
    let content = document.getElementById('content')
    content.className = 'full'
  }

  timetable() {
    timetable = document.getElementById('timetableSelect')
    localStorage.setItem('forceSmallTable', timetable.value)
    console.log(localStorage.getItem('forceSmallTable'))
  }

  color() {
    color = document.getElementById('colorSelect')
    localStorage.setItem('color',color.value)
    this.changeBody(color.value)
  }

  theme() {
    theme = document.getElementById('themeSelect')
    localStorage.setItem('theme',theme.value)
    this.changeBody(theme.value)
  }

  changeBody(text) { 
    if (text == 'Clean') {
      bodyArray[1] = 'Clean' //Clean
    } else if (text == 'Material') {
      bodyArray[1] = 'Material' //Material
    } else if (text == 'Dark') {
      bodyArray[0] = 'uk-light' //dark
    } else if (text == 'Light') {
      bodyArray[0] = 'uk-dark' //light
    }
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
                <option>Clean</option>
                <option>Material</option>
              </select>
              <hr/>
              <div>
                <p className='uk-align-left'>Timetable</p><a id='ttableInfo' uk-icon="info" className='uk-align-right' uk-tooltip="title: Allows you to choose to display single-day timetable regardless of screen size; pos: top-right; delay: 500"></a>
              </div>
              <select id='timetableSelect' onChange={this.timetable.bind(this)} className='uk-select'>
                <option>Default</option>
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