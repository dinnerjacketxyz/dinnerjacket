module.exports = (app) => {
  'use strict'
   
  const redirectURI = 'http://localhost:3000/callback'
  console.log(redirectURI)

  const cred = {
    client: {
      id: 'dinnerjacket_1514947891',

      /*
      |     REPLACE THIS WITH CLIENT SECRET WHEN RUNNING
      */

      secret: 'a'

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
  })

  app.get('/callback', (req, res) => {
    const code = req.query.code;
    console.log('Code: ' + code)
    const options = {
      code: code,
      redirect_uri: 'http://localhost:3000/callback'
    };

    oauth2.authorizationCode.getToken(options, (error, result) => {
      if (error) {
        console.log('Access Token Error', error.message);
        return res.json('Authentication failed');
      }

      token = oauth2.accessToken.create(result);
      console.log('Token obtained')

      res.redirect('http://localhost:3000/loginsuccess')
    });
  })

  const https = require('https')
 
  app.get('/loginsuccess', (req, res) => {
    // exchange token for resources here

    const httpsOptions = {
      hostname: 'student.sbhs.net.au',
      path: '/api/details/participation.json', // swap out this path to get different resources
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token.token.access_token
      }
    }

    https.get(httpsOptions, (res) => {
      // parse result
      res.setEncoding('utf8');
      res.on('data', function (body) {
        console.log(body);
      });
    });

    res.redirect('http://localhost:3000/')
  })

  app.get('/logout', (req, res) => {
    // logout
  })
}
