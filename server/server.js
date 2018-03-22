const express = require('express')
//const session = require('client-sessions')
const session = require('express-session')
const compression = require('compression')
const pgSession = require('connect-pg-simple')(session)
const path = require('path')
const PORT = 3000
const IP = '0.0.0.0'

const app = express()
app.use(compression())

app.use(session({
  store: process.env.NODE_ENV === 'production' ? new pgSession({
    conString: process.env.DATABASE_URL
      || process.env.OPENSHIFT_POSTGRESQL_DB_URL
  }) : null,
  //cookieName: 'session',

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

  //duration: 90 * 24 * 60 * 60 * 1000,
  //activeDuration: 90 * 24 * 60 * 60 * 1000
  saveUninitialized: false,
  resave: false,
  cookie: { maxAge: 90 * 24 * 60 * 60 * 1000 }
}))

app.use(express.static('./public'))
require('./auth')(app)
app.listen(PORT, IP, () => {
  console.log('Server up on port: ' + PORT)
})
