import React, { Component } from 'react'

class App extends Component {
  toggleLogin() {
    // Ensure this toggles correctly between Login and Logout
    // A user may already have a token and therefore in that case 
    // it needs to begin with 'Logout' functionality
    console.log('Login clicked')
    window.location.href = '/login'
  }

  // No UI currently
  // Will be added when auth is working
  render() {
    return (
      <div>
        Test Pizza
        <p/>
        <button onClick={this.toggleLogin}>Login</button>
      </div>
    )
  }
}

export default App