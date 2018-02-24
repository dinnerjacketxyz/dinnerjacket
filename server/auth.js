const oauth2module = require('simple-oauth2')
const https = require('https')

// change this to 'http://dinnerjacket.xyz' for release
const siteURL = 'http://localhost:3000'

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
    redirect_uri: siteURL + '/callback',
    scope: 'all-ro',
    state: 'abc'
  })

  // redirect to SBHS API to start OAuth2 dance
  app.get('/login', (req, res) => {
    res.redirect(authorizationURI)
  })
  
  /* TOKEN FORMAT
  
    { token:
     { access_token: '________________________________________',  (40 char alphanum.)
       expires_in: 3600,
       token_type: 'Bearer',
       scope: 'all-ro',
       refresh_token: '________________________________________', (40 char alphanum.)
       expires_at: '2018-02-24T02:54:54.925Z'
     }
    }
   
  */
  
  // SBHS API will redirect to this URL with code
  app.get('/callback', (req, res) => {
    const code = req.query.code;
    const options = {
      code: code,
      redirect_uri: siteURL + '/callback'
    }

    let promise = new Promise( function (resolve, reject) {
      
        // exchange code for token
      oauth2.authorizationCode.getToken(options, (error, result) => {
        
        // handle error
        if (error) {
          return res.json('Access Token Error: ' + error.message)
        }
        
        // use token
        resolve(oauth2.accessToken.create(result))
      })
    })
    
    promise.then(function(result) {
      // store token in user's session
      req.session.token = result
      // Login done, redirect back
      res.redirect(siteURL)
    })
  })

  // This is called by client to obtain resources
  // use a query to specify URL e.g. /getdata?url=dailynews/list.json
  // Returns undefined if no token exists
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
  
    if (req1.session.token === undefined) { res1.send(undefined) }
  
    const token = req1.session.token.token.access_token
    
    const httpsOptions = {
      hostname: 'student.sbhs.net.au',
      path: '/api/' + req1.query.url,
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }
  
    let promise = new Promise( function (resolve, reject) {
      
      https.get(httpsOptions, (res2) => {
        res2.setEncoding('utf8')
        // resolve the promise when data received
        res2.on('data', function (body) {
          resolve(body)
        })
      })
    })
    
    promise.then(function(result){
      // send resources
      res1.send(result)
    })

  })

  // TO DO: implement logout
  app.get('/logout', (req, res) => {
    req.session.destroy()
  })
  
  var session = require('express-session')
  app.use(session({secret: 'a'}))
  
  // for testing
  app.get('/test', (req, res) => {
    console.log(req.session.token)
    let returnVal =
       ' <p style="line-height:1">\
        &nbsp;∛3<br>\
       ⎰<i>t² dt </i> ⋅ cos(3π/9) = log(∛<i>e</i>)<br>\
        1</p>\
        Integral <i>t²</i><i> dt </i> , <br>\
        From 1 to the cube root of 3, <br>\
        Times the cosine <br>\
        of 3π over 9, <br>\
        Equals log of the cube root of <i>e</i>.<br><br>\
        <p style="line-height:1">\
        &nbsp;&nbsp;⎛ <i> e </i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;⎞⁷&nbsp;&nbsp;&nbsp;&nbsp; <i>iπ</i> ⋅ 3<br>\
        &nbsp; |⎰ <i>dv</i>/<i>v</i>⎟ = <i>e</i><br>\
        &nbsp;&nbsp;⎝<i>e</i>² &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;⎠</p>\
        Integral <i>dv</i> on<i> v</i>, <br>\
        Taken from <i>e</i>² to <i>e</i>, <br>\
        When raised to the prime, <br>\
        Between 5 and 9, <br>\
        Is <i>e</i> to the <i>iπ</i> times 3.';
    res.send(returnVal)
  })
}
