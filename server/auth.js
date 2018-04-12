const oauth2module = require('simple-oauth2')
const https = require('https')
var session = require('express-session')

const siteURL = 'http://localhost:3000'

module.exports = (app) => {
  'use strict'
  /*app.use(session({
    secret: 'a',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
  }))*/
  // Set up OAuth2 parameters
  const cred = {
    client: {
      id: 'DinnerJacket_dev',

      /*
          *==================================================*
          |   REPLACE THIS WITH CLIENT SECRET WHEN RUNNING   |
          *==================================================*
                                                                */
      secret: 'bGDDFl_qy6P3sYJxu70wBmeIqkk'

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
      console.log('getting token')
      // exchange code for token
      oauth2.authorizationCode.getToken(options, (error, result) => {

        // handle error
        if (error) {
          console.log(error)
          return res.json(error)
        }

        // use token
        resolve(oauth2.accessToken.create(result))
      })
    })

    promise.then(function(result) {
      // store token in user's session
      console.log('storing token')
      req.session.token = result
      console.log('logged in, token stored: ' + req.session.token.token.access_token )
      
      // Login done, redirect back
      res.redirect('/')
      console.log('* PAGE RELOADED *')
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
   *==============================*=============================*/

  app.get('/getsession', (req, res) => {
    console.log('/getsession === Validating session')
    console.log('Session ID: '+req.session.id)

    if (req.session.token === undefined) {
      console.log('no token found')
      res.send(false)
    } else {
      console.log('access token found')
      // validate session, inc. tokens
      
      /*
      // check refresh token
      console.log(req.session.token)
      const refreshTokenExpiry = req.session.token.token.expires_at
      console.log(new Date() + ' ' + new Date(refreshTokenExpiry))
      if (new Date() > refreshTokenExpiry) {
        req.session.destroy()
        res.send(false)
      }*/
      //console.log('access token needs to be refreshed: ' + (new Date() > new Date(req.session.token.token.expires_at)))
      // check access token
      if (new Date() > new Date(req.session.token.token.expires_at)) {
        console.log('refreshing access token')
        const querystring = require('querystring');
        
        const postData = querystring.stringify({
          refresh_token: req.session.token.token.refresh_token,
          grant_type: 'refresh_token',
          client_id: cred.client.id,
          client_secret: cred.client.secret
        })
        
        const httpsOptions = {
          hostname: 'student.sbhs.net.au',
          path: '/api/token',
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(postData)
          }
        }
        
        let promise = new Promise( function (resolve, reject) {
          const req1 = https.request(httpsOptions, (res1) => {
            res1.setEncoding('utf8')
            var body = ''
            res1.on('data', (data)=>{
              body += data
            })
            
            res1.on('end', ()=> {
              resolve(body)
            })
          })
          req1.write(postData)
          req1.end()
        })
        
        promise.then(function(result) {
          console.log(result)
          // store token in user's session
          req.session.token.token.access_token = result
          console.log('token refreshed')
          // set access token expiry date
          //var now = new Date()
          //req.session.accessTokenExpiry = now.setHours(now.getHours() + 1)
          res.send(true)
        })
      } else {
        console.log('valid access token')
        res.send(true)
      }
    }
    console.log('/getsession === finished validating session')
  })

  app.get('/getdata', (req, res) => {
    console.log('Token getdata')
    console.log('Token exists: ' + (req.session.token != undefined))
    var token = req.session.token.token.access_token
    
    const httpsOptions = {
      hostname: 'student.sbhs.net.au',
      path: '/api/' + req.query.url,
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }
    
    let promise = new Promise( function (resolve, reject) {

      https.get(httpsOptions, (res2) => {

        res2.setEncoding('utf8')
        // resolve the promise when data received
        let data = ''
        res2.on('data', function (body) {
          data += body
          //console.log('Data incoming: ' + data)
        })
        res2.on('end', function(body) {
          //console.log(data + '\n')
          resolve(data)
        })
      })
    })

    promise.then(function(result) {
      /*
      const fs = require('fs')
      let jason = JSON.parse(result)
      fs.writeFile("test.txt", JSON.stringify(jason, null, 2), function(err) {
        console.log('saved, ' + err)
      });*/

      // send resources

      res.send(result)

    })
  })

  app.get('/logout', (req, res) => {
    console.log('logging out')
    console.log('Session ID: '+req.session.id)
    req.session.destroy(function(err) {
      console.log('* PAGE RELOADED *')
      res.redirect('/')
    })
  })

  var counter = 0
  // for testing
  app.get('/test', (req, res) => {
    counter += 1
    console.log(counter)
    /*let returnVal =
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
    res.send(returnVal)*/
  })
}
