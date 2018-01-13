module.exports = (app) => {
  'use strict'

  const redirectURI = 'http://localhost:3000/callback'
  console.log(redirectURI)

  const cred = {
    client: {
      id: 'dinnerjacket_1514947891',
      secret: 'REDACTED'
    },
    auth: {
      tokenHost: 'https://student.sbhs.net.au',
      tokenPath: '/api/token',
      authorizePath: '/api/authorize'
    }
  }

  const oauth2 = require('simple-oauth2').create(cred)

  const authorizationURI = oauth2.authorizationCode.authorizeURL({
    redirect_uri: redirectURI,
    scope: 'all-ro',
    state: 'abc'
  })

  app.get('/login', (req, res) => {
    console.log(authorizationURI)
    res.redirect(authorizationURI)
  })

  app.get('/callback', (req, res) => {
    const CODE = req.query.code
    console.log(CODE)
  })

  app.get('/logout', (req, res) => {
    // logout
  })
}
