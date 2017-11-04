import React, { Component } from 'react'
import './App.css'
import Navbar from './Components/Navigation/Navbar'
import Time from './Components/Time'

class App extends Component {
  render() {
    return (
      <div id='main' className='light'>
        <Navbar />
        <Time />
      </div>
    )
  }
}

export default App
