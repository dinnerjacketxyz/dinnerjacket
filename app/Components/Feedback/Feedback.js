import React, { Component } from 'react'
const css = require('./Feedback.css')

// TODO
// google forms iframe takes a few secs to Load
// can we dump a lil spinny wheel underneath the iframe that shows its loading
// and then the iframe loads on top and hides it innit
// because if you've read the textbook you'll find that if the ui takes
// more than one second to load, the user feels as if the computer has taken control
// and we dont want that

class Feedback extends Component {
  render() {
    return (
      <div>
        <div className='uk-animation-slide-top-small container'>
          <iframe className='embed' src="https://docs.google.com/forms/d/e/1FAIpQLSds9ueVdjY4UvMM27KrdBoV8JW4cDeJa0vwLrlhviGBEndQDA/viewform?embedded=true">Loading...</iframe>
        </div>
        <div className='main uk-height-viewport vcWelcomeParent behind'>
          <div className='uk-flex uk-flex-center vcWelcomeCard'>
            <div uk-spinner="ratio: 4" className="uk-spinner uk-icon">
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Feedback
