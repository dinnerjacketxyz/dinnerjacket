import React, { Component } from 'react'

let dark = false

class Settings extends Component {
  constructor(props) {
    super(props)
    
    dark = localStorage.getItem('dark')
  }

  componentWillMount() {}

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

  render() {
    return (
      <div>
        <button onClick={this.toggleTheme.bind(this)}>dark</button>
      </div>
    )
  }
}

export default Settings