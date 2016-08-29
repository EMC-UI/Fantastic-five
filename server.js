var express = require('express')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')

mongoose.connect('mongodb://10.7.84.87/ping')

var app = express()
var server = require('http').Server(app)

app.use(express.static('static'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))

server.listen(app.get('port') || 3000, app.get('ip') || '0.0.0.0', function () {
  console.log('ping has started..')
})