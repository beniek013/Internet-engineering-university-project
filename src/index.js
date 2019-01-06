// Głowny plik aplikacji

const http = require('http')
const { env, port, ip, apiRoot, mongo } = require('./config')
const express = require('./services/express')
const api = require('./api')
const mongoose = require('./services/mongoose')
const user = require('./api/user')
const movie = require('./api/movie')
const room=require('./api/room')
const showing=require('./api/showing')

const app = express(apiRoot, api)
const server = http.createServer(app)
mongoose.connect(mongo.uri)
mongoose.Promise = global.Promise;

app.use((req, res, next) => {
    console.log(`${new Date().toString()} => ${req.originalUrl}`, req.body)
    next()
})
app.get('/', (req, res) => {
    res.status(200).send('working??')
});
app.use('/movie', movie)
app.use('/room', room)
app.use('/showing', showing)
app.use('/user', user)


setImmediate(() => {
  server.listen(port, () => {
    console.log('Express server listening on port %d, in %s mode', port, env)
  })
})


module.exports = app