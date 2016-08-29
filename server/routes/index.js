module.exports = function (express) {
  var router = express.Router()

  router.use('/users', require('./users')(express))
  router.use('/questions', require('./questions')(express))
  router.use('/answers', require('./answers')(express))

  router.get('/', function (req, res, next) {
    res.json({msg: 'Welcome to the api'})
  })
  return router
}