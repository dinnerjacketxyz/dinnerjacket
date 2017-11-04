import React, { Component } from 'react'
import './Time.css'


class Time extends Component {
  interval = setInterval(this.tick, 1000)

  tick() {
    const date = new Date()
    const text = document.getElementById('timeText')
    let times = [date.getHours(), date.getMinutes(), date.getSeconds()]
    for (let i = 0; i < times.length; i++) {
      times[i] = ('0' + times[i].toString()).slice(-2)
    }
    console.log(times)
    text.innerHTML = times.join(':')
  }

  render() {
    return (
      <div className='time'>
        <p id='timeText' className='timeText'>Loading...</p>
      </div>
    )
  }
}

export default Time
