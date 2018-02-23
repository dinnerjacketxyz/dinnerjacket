const oauth2module = require('simple-oauth2')
const https = require('https')

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
      res.redirect('http://localhost:3000/')
    })
  })

  // This is called by client to obtain resources
  // use a query to specify URL e.g. /getdata?url=dailynews/list.json
  /*============================================================*
   |   Acceptable URLs:                                         |
   |------------------------------*-----------------------------|
   |  dailynews/list.json         |  diarycalendar/events.json  |
   |  timetable/daytimetable.json |  timetable/timetable.json   |
   |  details/participation.json  |  details/userinfo.json      |
   |  timetable/bells.json        |  calendar/days.json         |
   |  calendar/terms.json         |                             |
   *==============================*============================*/
  
  app.get('/getdata', (req1, res1) => {
  
    const httpsOptions = {
      hostname: 'student.sbhs.net.au',
      path: '/api/' + req1.query.url,
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token.token.access_token
      }
    }
  
    let promise = new Promise( function (resolve, reject) {
      
      https.get(httpsOptions, (res2) => {
        // parse result
        res2.setEncoding('utf8')
        res2.on('data', function (body) {
          resolve(body)
        })
      })
    })
    
    promise.then(function(result){
      res1.send(result)
    })

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

