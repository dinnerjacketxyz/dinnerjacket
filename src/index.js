import React from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
import './semantic-ui-css/semantic.min.css'
import App from './Components/App'

ReactDOM.render(
  <App />,
  document.getElementById('root'))
registerServiceWorker()

