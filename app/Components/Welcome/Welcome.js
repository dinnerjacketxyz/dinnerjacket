import React, { Component } from 'react'
const css = require('./Welcome.css')

let counter = 0

class Welcome extends Component {
  toggleLogin() {
    // Ensure this toggles correctly between Login and Logout
    // A user may already have a token and therefore in that case
    // it needs to begin with 'Logout' functionality
    //console.log('Login clicked')
    let url = window.location.toString()
    if (url.substr(url.length - 11) === '/index.html') {
      alert('Run "npm start" to use server and login functions')
      //console.log('Run "npm start" to use server and login functions')
    } else {
      // also busted cause the entire page reloads on Login
      // therefore it gets initialised again and set to false
      //window.authSuccess = true
      //document.getElementById('DashboardLi').click()
      window.location.href = '/login'

      // this is busted
      //window.states.visible = window.STATES.DASHBOARD
    }
    localStorage.setItem('clicked',true)
    this.spinner()
  }

  spinner() {
      let button = document.getElementById('loginButton')
      let div = document.getElementById('loginDiv')
      let p = document.getElementById('loginP')
      button.className = 'uk-button uk-button-default uk-margin-top uk-margin-bottom disabled'
      div.className = 'uk-spinner uk-icon show'
      p.className = 'hide'
      //console.log(localStorage.getItem('clicked'))
  }

  componentWillMount() {
    console.log(localStorage.clicked)
    console.log(window.dashboard)
    if (window.dashboard === '' && localStorage.clicked===false) {
      console.log('yes')
    }
  }

  componentDidMount() {
    //console.log(localStorage.getItem('clicked'))
    if (localStorage.clicked=='true') {
      this.spinner()
      //console.log('clicked')
    }
  }

  logo() {
    //console.log('logo click')
    counter++
    if (counter === 5) {
      alert('spif')
      counter = 0
    }
  }

  render() {
    return (
      <div id='main' className='main uk-height-viewport centerParent'>
        <div className='uk-flex uk-flex-center uk-text-center centerCard'>
          <div className='uk-card uk-card-default uk-card-body uk-width-large uk-animation-slide-top-small '>
            <img id='logo'
              className='uk-disabled'
              alt='logo' src='256.png' width='150px' height='150px'>
            </img>
            <h1 id="djTitle" className='uk-h1'>DinnerJacket</h1>
            <p className='uk-label uk-label-danger'>alpha v0.1.1</p>
            <p className='uk-margin-top uk-margin-bottom'>This is an alpha release of DinnerJacket. New features are still in development and technical issues may occasionally arise. Please report any issues or suggestions in the feedback tab. Thanks!</p>
            <button id='loginButton' className='uk-button uk-button-primary uk-margin-top uk-margin-bottom' onClick={this.toggleLogin.bind(this)}>
              <div id='loginDiv' className='uk-spinner uk-icon hide' uk-spinner='true'>
                <svg width="20" height="20" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg" ratio="1"><circle fill="none" stroke="#000" cx="15" cy="15" r="14"></circle></svg>
              </div>
              <p id='loginP' className='show'>Login</p>
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default Welcome
