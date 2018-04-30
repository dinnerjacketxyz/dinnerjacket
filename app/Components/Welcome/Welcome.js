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
      <div className='main vcWelcomeParent'>
        <div className='vcWelcomeCard'>
          <div id='welcomeContent' className='uk-animation-slide-top-small'>
            <img id='welcomelogo' alt='logo' src='./icons/256.png' width='150px' height='150px'/>
            <h1 id='welcomeTitle'>DinnerJacket</h1>
            <p id='welcomeLabel'>alpha v0.1.2</p>
            <p id='welcomeText'>This is an alpha release of DinnerJacket. 
                                New features are still in development and technical issues may occasionally arise. 
                                Please report any issues or suggestions in the feedback tab. 
                                Thanks!</p>
            <button id='loginButton' className='uk-button uk-button-primary' onClick={this.toggleLogin.bind(this)}>Login</button>
          </div>
        </div>
      </div>
    )
  }
}

export default Welcome
