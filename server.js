var express = require('express')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var routes = require('./server/routes/')
mongoose.connect('mongodb://10.7.84.87/ping')

var app = express()
var server = require('http').Server(app)

app.use(express.static('static'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, token")
  next();
});

app.use('/api', routes(express));

server.listen(app.get('port') || 3000, app.get('ip') || '0.0.0.0', function () {
  console.log('ping has started..')
})