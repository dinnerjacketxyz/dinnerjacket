const express = require('express')
const session = require('express-session')
const compression = require('compression')
const path = require('path')
const pgSession = require('connect-pg-simple')(session)

const PORT = 3000
const IP = '0.0.0.0'

const app = express()

app.use(compression())

console.log('test')

app.use(session({
  store: process.env.NODE_ENV === 'production' ? new pgSession({
    conString: process.env.DATABASE_URL
      || process.env.OPENSHIFT_POSTGRESQL_DB_URL
  }) : null,

  /*
  |     REPLACE THIS WITH SESSION SECRET WHEN RUNNING
  */

  secret: 'REDACTED',

  /*
  |     DO NOT FORGET TO REMOVE IT AGAIN BEFORE YOU PUSH
  */

  saveUninitialized: false,
  resave: false,
  cookie: { maxAge: 90 * 24 * 60 * 60 * 1000 } // 90 Days
}))

// Perhaps 'docs' rather than 'public' for GitHub pages
// Although needs to be hosted elsewhere anyway before its used
app.use(express.static(path.join(path.dirname(__dirname), 'public')))

require('./auth')(app)

app.listen(PORT, IP, () => {
  console.log('Server up on port: ' + PORT)
})