
var Question = require('../../mongo-models/questions');

module.exports = function (express) {
    var router = express.Router()
    // router.use(require('./answers')(express))

    // GET (SEARCH) /api/tags
    router.route('/')
    .get(function (req, res) {
      var tag = req.query.tag
      console.log('search text: ', tag)
      var query = {tags: tag}
      if (!tag) {
        query = ''
      }
      Question.find(query, function (err, questions) {
        res.status(200).json(questions);
      })
    })

    // GET by Id /api/questions/{id}
    router.route('/:tag')
    .get(function (req, res) {
      console.log('Getting by tag name: ', req.params._id)
      Question.findOne({_id: req.params._id}, function (err, questions) {
          res.status(200).json(questions);
      })
    })
  return router
}
