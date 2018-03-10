import React, { Component } from 'react'

class Loading extends Component {
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
        </nav>
        <div className='uk-spinner'></div>
      </div>
    )
  }
}

export default Loading
