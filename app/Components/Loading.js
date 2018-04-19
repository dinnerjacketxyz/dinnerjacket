import React, { Component } from 'react'

class Loading extends Component {
  render() {
    return (
      <div id='main' className='main uk-height-viewport vcWelcomeParent'>
        <div className='uk-flex uk-flex-center vcWelcomeCard'>
          <div uk-spinner="ratio: 4" className="uk-spinner uk-icon">
          </div>
        </div>
      </div>
    )
  }
}

export default Loading