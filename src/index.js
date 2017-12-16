import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import registerServiceWorker from './registerServiceWorker'
import './semantic-ui-css/semantic.min.css'

import { BrowserRouter, Route } from 'react-router-dom'

import Navbar from './Components/Navigation/Navbar'
import Info from './Components/Main/Info'
import Settings from './Components/Settings/Settings'

console.log(Route.path)

window.STATES = {
  MAIN: 0,
  SETTINGS: 1
}

window.state = window.STATES.MAIN

ReactDOM.render((
  <BrowserRouter>
    <div id='main' className='light'>
      <Navbar />
      <Route exact path='/' component={Info}/>
      <Route path='/settings' component={Settings}/>
    </div>
  </BrowserRouter>
  ), document.getElementById('root')
)
registerServiceWorker()

// <Route path='/settings' component={Settings}/>
