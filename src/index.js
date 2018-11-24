// Głowny plik aplikacji

const http = require('http')
const { env, port, ip, apiRoot, mongo } = require('./config')
const express = require('./services/express')
const api = require('./api')
const mongoose = require('./services/mongoose')
const customer = require('./api/customer')
const movie = require('./api/movie')

const app = express(apiRoot, api)
const server = http.createServer(app)
mongoose.connect(mongo.uri)


app.use((req, res, next) => {
    console.log(`${new Date().toString()} => ${req.originalUrl}`, req.body)
    next()
})
app.get('/', (req, res) => {
    res.status(200).send('working??')
});
app.use('/movie', movie)
app.use('/customer', customer)


setImmediate(() => {
  server.listen(port, () => {
    console.log('Express server listening on port %d, in %s mode', port, env)
  })
})


module.exports = app
/*


const path=require('path')
const bodyParser=require('body-parser')


mongoose.connect(`mongodb://${user}:${password}@${serveruri}/${database}`, {useCreateIndex: true, useNewUrlParser: true})
/*
app.use(bodyParser.json())

app.use((req, res, next) => {
    console.log(`${new Date().toString()} => ${req.originalUrl}`, req.body)
    next()
})

//app.use(customerRoute)
//app.use(express.static('public'))


// 404
app.use((req, res, next) => {
    res.status(404).send('Resource not found')
})

// 500
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.sendFile(path.join(__dirname, '../public/500.html'))
})

const PORT=process.env.PORT || 3000

server.listen(PORT, () => console.info(`${new Date().toString()} Server started on port ${PORT}`))
*/