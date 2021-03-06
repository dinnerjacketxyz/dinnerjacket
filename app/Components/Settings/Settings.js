import React, { Component } from 'react'
const css = require('./Settings.css')

let timetable
let color
let theme
let bodyArray = ['uk-dark','Clean']

class Settings extends Component {
  constructor(props) {
    super(props)
  }

  /**
    * React lifecycle method that sets up the settings combination boxes from local storage
    */
  componentDidMount() {
    timetable = document.getElementById('timetableSelect')

    /*
    if (window.isMobile) {
      timetable.setAttribute('disabled', true)
    }*/

    //centers the content vertically
    let content = document.getElementById('content')
    content.className = 'full vcNavbarParent'


    this.loadBodyArray()
    this.init('colorSelect', 'color', 'Light')
    this.init('themeSelect', 'theme', 'Clean')
    this.init('timetableSelect', 'forceSmallTable', 'Dynamic')
  }

  /**
    * Generalised method to initialised the three combination boxes
    */

  init(elementID, option, defaultValue) {
    let element = document.getElementById(elementID)
    if (localStorage.getItem(option) != undefined
        && localStorage.getItem(option) != null
        && localStorage.getItem(option) != 'true'
        && localStorage.getItem(option) != 'false') {

      if (localStorage.getItem(option) !== 'Dynamic' && option==='forceSmallTable') {
        element.value = 'Force '+ localStorage.getItem(option)
      } else {
        element.value = localStorage.getItem(option)
      }
    } else { // first time load
      localStorage.setItem(option, defaultValue)
      element.value = defaultValue
    }
  }

  /**
    * Loads the body array which is an array that controls the properties of the <body> element
    * which control the appearance of the application
    */
  loadBodyArray() {
    if (bodyArray[1]!=null||bodyArray[1]!=undefined) {
      bodyArray[1] = localStorage.getItem('theme') 
    }
    if (localStorage.getItem('color') === 'Dark') {
      bodyArray[0] = 'uk-light'
    } else if (localStorage.getItem('color') ==='Light') {
      bodyArray[0] = 'uk-dark' 
    }
    localStorage.setItem('bodyArray',bodyArray)
  }

  /**
    * React lifecycle method called when the user leaves the page
    * clears vertically centering changes to parent elements
    */
  componentWillUnmount() {
    let content = document.getElementById('content')
    content.className = 'full'
  }

  /**
    * Saves the setting in local storage
    */
  timetable() {
    timetable = document.getElementById('timetableSelect')
    if(timetable.value.split(' ').length==2){
      localStorage.setItem('forceSmallTable', timetable.value.split(' ')[1])
      console.log(localStorage.getItem('forceSmallTable'))
    } else {
      localStorage.setItem('forceSmallTable', timetable.value)
    }
  }

  /**
    * Sets the color in localstorage
    */
  color() {
    color = document.getElementById('colorSelect')
    localStorage.setItem('color',color.value)
    this.changeBody(color.value)
  }

  /**
    * Saves the theme in local storage
    */
  theme() {
    theme = document.getElementById('themeSelect')
    localStorage.setItem('theme',theme.value)
    this.changeBody(theme.value)
  }

  /**
    * Changes the appearance of the body and saves it to local storage
    */
  changeBody(text) {
    theme = document.getElementById('themeSelect')
    if (text === 'Clean' || text === 'Material') {
      bodyArray[1] = text
      color = document.getElementById('colorSelect')
      if (color.value == 'Dark') {
        bodyArray[0] = 'uk-light' //dark
      } else if (color.va == 'Light') {
        bodyArray[0] = 'uk-dark' //light
      }
    } else if (text == 'Dark') {
      bodyArray[0] = 'uk-light' //dark
      bodyArray[1] = theme.value
    } else if (text == 'Light') {
      bodyArray[0] = 'uk-dark' //light
      bodyArray[1] = theme.value
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
                <option>Dynamic</option>
                <option>Force Full</option>
                <option>Force Small</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Settings

// PARENT ACCESS KEY

/*dec2hex(dec) {
  return ('0' + dec.toString(16)).substr(-2)
}

generateId(len) {
  let arr = new Uint8Array((len || 40) / 2)
  window.crypto.getRandomValues(arr)
  return Array.from(arr, this.dec2hex).join('')
}

generateParentAccess() {
  if (validParentKey) {
    console.log(validKey)
  } else {
    validKey = this.generateId(KEY_LENGTH)
    console.log(validKey)

    validParentKey = true
    let parentText = this.state.parentText
    this.setState({ parentText: 'View Parent Access Key' })
    this.parentTimer()

    let ptText = this.state.ptText
    this.setState({ ptText: 'Current key valid for ' + KEY_TIMEOUT + ' seconds'})
  }
}

parentTimer() {
  let seconds = KEY_TIMEOUT
  let parentInterval = setInterval(() => {
    console.log('interval')

    seconds--
    let ptText = this.state.ptText
    this.setState({ ptText: 'Current key valid for ' + seconds + ' seconds'})
    
    if (seconds <= 0) {
      validParentKey = false
      let parentText = this.state.parentText
      this.setState({ parentText: 'Generate Parent Access Key' })
      this.setState({ ptText: '' })
      seconds = KEY_TIMEOUT
      clearInterval(parentInterval)
    }
  }, 1000)
}*/

/*<button onClick={this.generateParentAccess.bind(this)}>{this.state.parentText}</button>
<p>{this.state.ptText}</p>*/
