const oauth2module = require('simple-oauth2')
const https = require('https')
const data = require('./data.js')

module.exports = (app) => {
  'use strict'

  // Set up OAuth2 parameters
  const cred = {
    client: {
      id: 'dinnerjacket_1514947891',

      /*
          *==================================================*
          |   REPLACE THIS WITH CLIENT SECRET WHEN RUNNING   |
          *==================================================*
                                                                */
      secret: REDACTED
      /*
          *==================================================*
          |   REMEMBER TO REMOVE IT AGAIN BEFORE YOU PUSH    |
          *==================================================*
                                                                */
    },

    auth: {
      tokenHost: 'https://student.sbhs.net.au',
      tokenPath: '/api/token',
      authorizePath: '/api/authorize'
    }
  }
  const oauth2 = oauth2module.create(cred)

  const authorizationURI = oauth2.authorizationCode.authorizeURL({
    // The redirect URI used by the SBHS API for OAuth2
    // Change this to URL 'https://dinnerjacket.xyz/callback' for production
    redirect_uri: 'http://localhost:3000/callback',
    scope: 'all-ro',
    state: 'abc'
  })

  // must change to client storage
  // This is where the token will be stored
  let token

  // redirect to SBHS API to start OAuth2 dance
  app.get('/login', (req, res) => {
    res.redirect(authorizationURI)
  })

  // SBHS API will redirect to this URL with code
  app.get('/callback', (req, res) => {
    const code = req.query.code;
    const options = {
      code: code,
      redirect_uri: 'http://localhost:3000/callback'
    }

    // exchange code for token
    oauth2.authorizationCode.getToken(options, (error, result) => {

      // handle error
      if (error) {
        return res.json('Access Token Error: ' + error.message)
      }

      // set token
      token = oauth2.accessToken.create(result)
      console.log('Token obtained')

      // Login done
      res.redirect('http://localhost:3000/loginsuccess')
    })
  })

  // exchange token for resources
  app.get('/loginsuccess', (req, res) => {

    // URLs for resources
    const URLs = [
      'dailynews/list.json',
      'diarycalendar/events.json',
      'timetable/daytimetable.json',
      'timetable/timetable.json',
      'details/participation.json',
      'details/userinfo.json',
      'timetable/bells.json',
      'calendar/days.json',
      'calendar/terms.json'
    ]

    // Get resources from API using token
    // URL is a String representing the URL of the resource to acquire (check authURL and publURL)
    function getFromAPI(URL) {

      // https GET options
      const httpsOptions = {
        hostname: 'student.sbhs.net.au',
        path: '/api/' + URL,
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token.token.access_token
        }
      }

      https.get(httpsOptions, (res) => {
        // parse result
        res.setEncoding('utf8')
        res.on('data', function (body) {
          // set data
          data.importData(URL, body)
        })
      })
    }

    // get resources for all URLs
    for (var i = 0; i < 9; i++) {
      getFromAPI(URLs[i])
    }

    // After finishing, redirect back to home page
    // Change this to URL 'https://dinnerjacket.xyz/' for production
    res.redirect('http://localhost:3000/')

  })

  // This is called by client to obtain resources
  // TO DO: to add parameters
  app.get('/getdata', (req, res) => {
    const data = require('./data.js')
    res.send(data.exportData('timetable/daytimetable.json'))
  })

  // TO DO: implement logout
  app.get('/logout', (req, res) => {
    // logout
  })
  let counter = 0
  // for testing
  app.get('/test', (req, res) => {
    console.log(counter++)
    res.redirect('http://localhost:3000/')
  })
}
