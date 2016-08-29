module.exports = function (express) {
  var router = express.Router()

  router.use('/users', require('./users')(express))
  router.get('/', function (req, res, next) {
    res.json({msg: 'welcome to the api'})
  })
  return router
}