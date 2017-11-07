import React, { Component } from 'react'
import './App.css'
import Navbar from './Components/Navigation/Navbar'
import Info from './Components/Info'

class App extends Component {
  render() {
    return (
      <div id='main' className='light'>
        <Navbar />
        <Info />
      </div>
    )
  }
}

export default App
