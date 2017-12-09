import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
//import App from './App'
import registerServiceWorker from './registerServiceWorker'
import './semantic-ui-css/semantic.min.css'
import { HashRouter, Route } from 'react-router-dom'
//import './App.css'

import Navbar from './Components/Navigation/Navbar'
import Info from './Components/Main/Info'
import Settings from './Components/Settings/Settings'

console.log(Route.path)

ReactDOM.render((
  <HashRouter>
    <div id='main' className='light'>
      <Navbar />
      <Route exact path='/settings' component={Settings}/>
      <Route path='/' component={Info}/>
    </div>
  </HashRouter>
  ), document.getElementById('root')
)
registerServiceWorker()

// <Route path='/settings' component={Settings}/>
