import React, { Component } from 'react'

const css = require('./App.css')
const icons = require('../uikit-icons.min')

//hmm dont know if we need this
let loggedIn = false

const AUTH = {
  NO_AUTH: 0,
  PARENT: 1,
  TEACHER: 2,
  STUDENT: 3
}


class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      auth: AUTH.NO_AUTH
    }
  }

  // Always renders navbar
  // Renders active page
  render() {
    return (
      <div>
        {this.state.auth === AUTH.NO_AUTH && <NoAuth />}
        {this.state.auth === AUTH.STUDENT && <Student />}
      </div>
    )
  }
}

export default App
