import React, { Component } from 'react'

class Loading extends Component {
  render() {
    return (
      <div id='main' className='main uk-height-viewport centerParent'>
        <div className='uk-flex uk-flex-center centerCard'>
          <div uk-spinner="ratio: 4" className="uk-spinner uk-icon">
          </div>
        </div>
      </div>
    )
  }
}

export default Loading