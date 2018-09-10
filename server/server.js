const express = require('express')
const session = require('express-session')
const compression = require('compression')
var pgSession = require('connect-pg-simple')(session);
//const path = require('path')
const PORT = 3000
const IP = '0.0.0.0'

const app = express()
app.use(compression())

app.use(session({

  /*
          *==================================================*
          |   REPLACE THIS WITH CLIENT SECRET WHEN RUNNING   |
          *==================================================*
                                                                */
 
  secret: 'a',

  /*
          *==================================================*
          |   REMEMBER TO REMOVE IT AGAIN BEFORE YOU PUSH    |
          *==================================================*
                                                                */

  saveUninitialized: false,
  resave: false,
  //cookie: { maxAge: 90 * 24 * 60 * 60 * 1000 }
}))

app.use(express.static('./public'))
require('./auth')(app)
app.listen(PORT, IP, () => {
  console.log('Server up on port: ' + PORT)
})
