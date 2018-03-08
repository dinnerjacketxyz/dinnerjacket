import React, { Component } from 'react'

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
              className='uk-disabled uk-margin-small-left uk-margin-small-right uk-margin-small-top uk-margin-small-bottom'
              alt='logo' src='64.png'>
            </img>
          </div>
          <div className='uk-navbar-right'>
            <ul className='uk-navbar-nav'>
              <li className='uk-animation-toggle'>
                  <a className='uk-box-shadow-hover-medium' onClick={this.toggleLogin.bind(this)}>
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
            <br/>

            <span className='uk-margin-top uk-h1'>DinnerJacket</span>
            <br/>
            <span className='uk-label uk-label-danger'>alpha</span>

            <p className='uk-text-small uk-margin-small-top uk-margin-small-bottom'>alpha v0.1.0</p>
            <p className=''>This is an alpha. That means that you might try out new features that are still in development, or even run into technical issues from time to time.</p>
            <hr/>
            <h2 className='uk-h2 uk-margin-bottom'>Welcome!</h2>
            <button className='uk-button uk-button-primary' onClick={this.toggleLogin.bind(this)}>Login</button>
          </div>
        </div>
      </div>
    )
  }
}

export default Welcome
