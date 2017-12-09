import React, { Component } from 'react'
import './Info.css'

class Info extends Component {
  interval = setInterval(this.tick, 1000)

  tick() {
    const text = document.getElementById('timeText')
    if (text != null) {
      const date = new Date()
      let times = [date.getHours(), date.getMinutes(), date.getSeconds()]
      for (let i = 0; i < times.length; i++) {
        times[i] = ('0' + times[i].toString()).slice(-2)
      }
      text.innerHTML = times.join(':')
    }
  }

  render() {
    return (
      <div className='time'>
        <p id='timeText' className='timeText'>Loading...</p>
        <p className='infoText'>
          dinnerjacket.xyz is currently in development<br/>
          In the meantime, please take our short
            <a className='infoText' href='https://goo.gl/forms/hfEYOtGlBHiOQFwU2'
              target='_blank'> survey </a>
          to help us improve the site. Thanks!
        </p>
        <iframe className='yt' width="560" height="315" 
          src="https://www.youtube.com/embed/JZ01cmdwhfg?autoplay=1" 
          frameBorder="0" gesture="media" allow="encrypted-media" allowFullScreen>
        </iframe>
      </div>
    )
  }
}

export default Info
