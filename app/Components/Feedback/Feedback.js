import React, { Component } from 'react'
const css = require('./Feedback.css')

class Feedback extends Component {
  render() {
    return (
      <div>
        <div className='container'>
          <iframe className='embed' src="https://docs.google.com/forms/d/e/1FAIpQLSds9ueVdjY4UvMM27KrdBoV8JW4cDeJa0vwLrlhviGBEndQDA/viewform?embedded=true"/>
        </div>
        <div className='loadingParent'> {/*Loading parent and loading child has properties to vertically and horizontally the spinner*/}
          <div className='loadingChild'> 
            <div uk-spinner="ratio: 4" className="uk-spinner uk-icon"> {/*Loading spinner*/}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Feedback
