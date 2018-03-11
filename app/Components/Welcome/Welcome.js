import React, { Component } from 'react'
const css = require('./Welcome.css')

class Welcome extends Component {
  toggleLogin() {
    // Ensure this toggles correctly between Login and Logout
    // A user may already have a token and therefore in that case
    // it needs to begin with 'Logout' functionality
    console.log('Login clicked')

    let url = window.location.toString()
    if (url.substr(url.length - 11) === '/index.html') {
      alert('Run "npm start" to use server and login functions')
      console.log('Run "npm start" to use server and login functions')
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

  render() {
    return (
      <div id='main' className='main uk-height-viewport'>
        <nav className='uk-navbar uk-navbar-container uk-margin'>
          <div className='uk-navbar-left'>
            <img id='logo'
              className='djLogo uk-disabled uk-margin-small-left uk-margin-small-right uk-margin-small-top uk-margin-small-bottom'
              alt='logo' src='64.png'>
            </img>
          </div>
          <div className='uk-navbar-right'>
            <ul className='uk-navbar-nav'>
              <li className='uk-animation-toggle'>
                  <a className='uk-box-shadow-hover-small uk-padding-large' onClick={this.toggleLogin.bind(this)}>
                    Login
                  </a>
              </li>
            </ul>
          </div>
        </nav>
        <div className='uk-flex uk-flex-center uk-text-center'>
          <div className='uk-card uk-card-default uk-card-body uk-width-large uk-animation-slide-top-small'>
            <img id='logo'
              className='uk-disabled'
              alt='logo' src='256.png' width='150px' height='150px'>
            </img>
            <h1 className='uk-h1'>DinnerJacket</h1>
            <p className='uk-label uk-label-danger'>alpha v0.1.0</p>
            <p className='uk-margin-top uk-margin-bottom'>This is an alpha. That means that you might try out new features that are still in development, or even run into technical issues from time to time.</p>
            <button className='uk-button uk-button-primary uk-margin-top uk-margin-bottom' onClick={this.toggleLogin.bind(this)}>Login</button>
          </div>
        </div>
      </div>
    )
  }
}

export default Welcome
