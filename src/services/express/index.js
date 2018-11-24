// Konfiguracja serwera Express

const express = require('express')
const bodyParser = require('body-parser')

const expressConfig = (apiRoot, routes) => {
  const app = express()

  app.use(bodyParser.json())  // obsluga dekodowania JSON
  app.use(apiRoot, routes)

  return app
}

module.exports = expressConfig
