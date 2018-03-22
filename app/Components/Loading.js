import React, { Component } from 'react'

class Loading extends Component {
  render() {
    return (
      <div id='main' className='main uk-height-viewport'>
        <div uk-spinner="ratio: 4" className="uk-spinner uk-icon">
          <svg width="120" height="120" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg" ratio="4">
            <circle fill="none" stroke="#000" cx="15" cy="15" r="14"></circle>
          </svg>
        </div>
      </div>
    )
  }
}

export default Loading