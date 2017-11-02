import React, { Component } from 'react'
import './App.css'
import Navbar from './Components/Navigation/Navbar'

class App extends Component {
  render() {
    return (
      <div id='main' className='light'>
        <Navbar />
      </div>
    )
  }
}

export default App
