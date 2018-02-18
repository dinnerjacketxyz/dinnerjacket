module.exports = (app) => {
  'use strict'

  // IMBORTANT
  // Change this to URL 'https://dinnerjacket.xyz/callback' for production
  const redirectURI = 'http://localhost:3000/callback'
  console.log(redirectURI)

  const cred = {
    client: {
      id: 'dinnerjacket_1514947891',

      /*
      |     REPLACE THIS WITH CLIENT SECRET WHEN RUNNING
      */

      secret: REDACTED

      /*
      |     DO NOT FORGET TO REMOVE IT AGAIN BEFORE YOU PUSH
      */

    },
    auth: {
      tokenHost: 'https://student.sbhs.net.au',
      tokenPath: '/api/token',
      authorizePath: '/api/authorize'
    }
  }

  // This is where the token will be stored
  let token

  const oauth2module = require('simple-oauth2')
  const oauth2 = oauth2module.create(cred)

  const authorizationURI = oauth2.authorizationCode.authorizeURL({
    redirect_uri: redirectURI,
    scope: 'all-ro',
    state: 'abc'
  })

  app.get('/login', (req, res) => {
    res.redirect(authorizationURI)
	console.log(__dirname)
  })

  app.get('/callback', (req, res) => {
    const code = req.query.code;
    console.log('Code: ' + code)
    const options = {
      code: code,
      redirect_uri: 'http://localhost:3000/callback'
    }

    oauth2.authorizationCode.getToken(options, (error, result) => {
      if (error) {
        console.log('Access Token Error: ', error.message);
        return res.json('Authentication failed')
      }

      token = oauth2.accessToken.create(result)
      console.log('Token obtained')

      res.redirect('http://localhost:3000/loginsuccess')
    })
  })

  const https = require('https')
  const fs = require('fs')

  app.get('/loginsuccess', (req, res) => {
    // exchange token for resources
    // URLs for resources
    const URLs = [
      'dailynews/list.json',
      'diarycalendar/events.json',
      'timetable/daytimetable.json',
      'details/participation.json',
      'details/userinfo.json',
      'timetable/bells.json',
      'calendar/days.json',
      'calendar/terms.json'
    ]

    // URL is a String representing the URL of the resource to acquire (check authURL and publURL)
	  function getFromAPI(URL) {
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
          const baseURL = __dirname.substring(0, (__dirname.length - 7)) + '/app/Data/'
          const appendURL = URL.replace('/', '_')
          fs.writeFile(baseURL + appendURL, body, (err) => {})
        })
      })
  	}

    for (var i = 0; i < 8; i++) {
      getFromAPI(URLs[i])
    }

    // IMBORTANT
    // Change this to URL 'https://dinnerjacket.xyz/' for production
    res.redirect('http://localhost:3000/')
  })

  app.get('/logout', (req, res) => {
    // logout
  })
}