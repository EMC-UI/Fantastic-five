var express = require('express')

module.exports = function () {
  var router = express.Router()

  router.use('/users', require('./users'))

  return router
}