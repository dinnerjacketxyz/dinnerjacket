import React, { Component } from 'react'

class Loading extends Component {
  render() {
    return (
      <div id='main' className='main uk-height-viewport'>
        <nav className='uk-navbar uk-navbar-container uk-margin'>
          <div className='uk-navbar-left'>
            <div>
              <img id='logo'
                className='djLogo uk-disabled uk-margin-small-left uk-margin-small-right uk-margin-small-top uk-margin-small-bottom'
                alt='logo' src='64.png'>
              </img>
            </div>
          </div>
        </nav>
        <div className='uk-spinner uk-icon' uk-spinner='true'>
          <svg width="20" height="20" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg" ratio="1"><circle fill="none" stroke="#000" cx="15" cy="15" r="14"></circle></svg>
        </div>
      </div>
    )
  }
}

export default Loading