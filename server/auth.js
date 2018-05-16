const oauth2module = require('simple-oauth2')
const https = require('https')

const siteURL = 'http://localhost:3000'

module.exports = (app) => {
  'use strict'

  // Set up OAuth2 parameters
  const cred = {
    client: {
      id: 'DinnerJacket_dev',

      /*
          *==================================================*
          |   REPLACE THIS WITH CLIENT SECRET WHEN RUNNING   |
          *==================================================*
                                                                */
      secret: 'lve26aPJH_zzKPHBUrVAcpIGhjQ'

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

  /* === TOKEN FORMAT =================================================================*
  |                                                                                    |
  |  { token:                                                                          |
  |   { access_token: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',  (40 char alphanum.) |
  |     expires_in: 3600,                                                              |
  |     token_type: 'Bearer',                                                          |
  |     scope: 'all-ro',                                                               |
  |     refresh_token: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', (40 char alphanum.) |
  |     expires_at: '2018-02-24T02:54:54.925Z'                                         |
  |   }                                                                                |
  |  }                                                                                 |
  |                                                                                    |
  *====================================================================================*/

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
          console.log(error)
          return res.json(error)
        }

        // use token
        resolve(oauth2.accessToken.create(result))
      })
    })

    promise.then(function(result) {
      // store token in user's session
      req.session.token = result
      // 90 days expiry
      req.session.refreshTokenExpiry = new Date((new Date).getTime() + 90*24*60*60*1000)
      console.log('token stored, redirecting')

      // Login done, redirect back
      res.redirect(siteURL)
    })
  })
  
  // returns access and refresh tokens with expiry
  app.get('/gettoken', (req, res) => {
    console.log('gettoken: ' + req.session.token)
    if ((req.session.token != undefined) && (req.session.refreshTokenExpiry != undefined)) {
      console.log('gettoken: sending data')
      res.send([req.session.token.token.access_token, req.session.token.token.refresh_token, req.session.refreshTokenExpiry])
    } else {
      console.log('gettoken: sending false')
      res.send(false)
    }
  })
  
  /*
  // checks the client's session to determine the presence of valid tokens
  app.get('/getsession', (req, res) => {
    console.log('validating session')
    if (req.session.token === undefined || req.session.token.token === undefined) {
      console.log('no token found')
      res.send(false)
    } else {
      
      // validate session, inc. tokens
      
      // check refresh token
      console.log(req.session.token)
      if (req.session.refreshTokenExpiry != undefined) {
        const refreshTokenExpiry = req.session.refreshTokenExpiry
        console.log(new Date() + ' ' + new Date(refreshTokenExpiry))
        if (new Date() > refreshTokenExpiry) {
          req.session.destroy()
          res.send(false)
        }
      }
      
      // refresh token is valid from here
      
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
          console.log('token refreshed, valid access token')
          // set access token expiry date
          var now = new Date()
          req.session.accessTokenExpiry = now.setHours(now.getHours() + 1)
          res.send([req.session.token.token.refresh_token, req.session.refreshTokenExpiry])
        })
      } else {
        console.log('valid access token')
        res.send([req.session.token.token.refresh_token, req.session.refreshTokenExpiry])
      }
    }
    
  })
  */
  
  /*
      This is called by client to obtain resources.
      Use a query to specify URL e.g. /getdata?url=dailynews/list.json
   
      (returns undefined if no token exists)
   
  /*============================================================*
   |   Acceptable URLs:                                         |
   |------------------------------*-----------------------------|
   |  dailynews/list.json         |  diarycalendar/events.json  |
   |  timetable/daytimetable.json |  timetable/timetable.json   |
   |  details/participation.json  |  details/userinfo.json      |
   |  timetable/bells.json        |  calendar/days.json         |
   |  calendar/terms.json         |                             |
   *==============================*=============================*/
  
  app.get('/getdata', (req1, res1) => {
    console.log('getdata: ' + req1.query.url + (req1.query.to != undefined ? '&to=' + req1.query.to : ''))
    var token = req1.query.token
    const httpsOptions = {
      hostname: 'student.sbhs.net.au',
      path: '/api/' + req1.query.url + (req1.query.to != undefined ? '&to=' + req1.query.to : ''),
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
      
      /* Use this to save API data to file (pretty printed)
      const fs = require('fs')
      let jason = JSON.parse(result)
      fs.writeFile("test.txt", JSON.stringify(jason, null, 2), function(err) {
        console.log('saved, ' + err)
      });
      */

      res1.send(result)
    })
  })

  // handles logout
  app.get('/logout', (req, res) => {
    console.log('logging out')
    req.session.destroy()
    res.redirect(siteURL)
  })

  // for testing
  app.get('/test', (req, res) => {
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
