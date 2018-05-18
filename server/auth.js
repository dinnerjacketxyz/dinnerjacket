const https = require('https')
const querystring = require('querystring')

const siteURL = 'http://localhost:3000'

module.exports = (app) => {
  'use strict'
  
  const redirect_uri = siteURL + '/callback'
  const client_id = 'DinnerJacket_dev'
  const client_secret = 'lve26aPJH_zzKPHBUrVAcpIGhjQ'
  
  // redirect to SBHS API to start OAuth2 dance
  app.get('/login', (req, res) => {
    console.log('redirecting to SBHS API')
    res.redirect('https://student.sbhs.net.au/api/authorize?response_type=code&scope=all-ro&state=abc&client_id='+client_id+'&client_secret='+client_secret+'&redirect_uri='+redirect_uri)
  })

  /* === TOKEN FORMAT =================================================================*
  |                                                                                    |
  |   {                                                                                |
  |     access_token: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',  (40 char alphanum.) |
  |     expires_in: 3600,                                                              |
  |     token_type: 'Bearer',                                                          |
  |     scope: 'all-ro',                                                               |
  |     refresh_token: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', (40 char alphanum.) |
  |     expires_at: '2018-02-24T02:54:54.925Z'                                         |
  |   }                                                                                |
  |                                                                                    |
  *====================================================================================*/

  // SBHS API will redirect to this URL with code
  app.get('/callback', (req, res) => {
    console.log('exchanging auth code for tokens')
    let promise = new Promise( function (resolve, reject) {
      const postData = querystring.stringify({
                        code: req.query.code,
                        grant_type: 'authorization_code',
                        client_id: client_id,
                        client_secret: client_secret,
                        redirect_uri: siteURL + '/callback'
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
      
      const req1 = https.request(httpsOptions, (res1) => {
        res1.setEncoding('utf8')
        var body = ''
        res1.on('data', (data) => {
          body += data
        })
        
        res1.on('end', ()=> {
          resolve(body)
        })
      })
    
      // write post data to req.
      req1.write(postData)
      req1.end()

    })

    promise.then(function(result) {
      // store token in user's session
      req.session.token = JSON.parse(result)
      // 90 days expiry
      req.session.refreshTokenExpiry = new Date((new Date).getTime() + 90*24*60*60*1000)
      console.log('token stored, redirecting')

      // Login done, redirect back
      res.redirect(siteURL)
    })
  })
  
  // returns access and refresh tokens with expiry
  app.get('/gettoken', (req, res) => {
    const token = req.session.token
    console.log('gettoken: ' + token)
    if ((token != undefined) && (req.session.refreshTokenExpiry != undefined)) {
      console.log('gettoken: sending data')
      res.send([token.access_token, token.refresh_token, req.session.refreshTokenExpiry])
    } else {
      console.log('gettoken: sending false')
      res.send(false)
    }
  })
  
  // called by client to use refresh token to get a new access token
  app.get('/getnewaccesstoken', (req, res) => {
    console.log('getting new access token')
    
    const postData = querystring.stringify({
                       refresh_token: req.query.rt,
                       grant_type: 'refresh_token',
                       client_id: client_id,
                       client_secret: client_secret
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
      
      // write post data to req.
      req1.write(postData)
      
      req1.end()
    })
    
    promise.then(function(result) {
      console.log('access token refreshed')
      res.send(JSON.parse(result).access_token)
    })
  })
  
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
