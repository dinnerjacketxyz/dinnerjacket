import React, { Component } from 'react'
const css = require('./Feedback.css')

class Feedback extends Component {
  render() {
    return (
      <div className='container'>
          <iframe className='embed' src="https://docs.google.com/forms/d/e/1FAIpQLSds9ueVdjY4UvMM27KrdBoV8JW4cDeJa0vwLrlhviGBEndQDA/viewform?embedded=true">Loading...</iframe>
      </div>

    )
  }
}

export default Feedback