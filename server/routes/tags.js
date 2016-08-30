
var Tags = require('../../mongo-models/tag');

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
      Tags.find(query, 'tags', function (err, questions) {
        res.status(200).json(questions);
      })
    })

    // GET by Id /api/questions/{id}
    router.route('/:tag')
    .get(function (req, res) {
      console.log('Getting by tag name: ', req.params.tag)
      Tags.findOne({content: req.params.tag}, function (err, questions) {
          res.status(200).json(questions);
      })
    })
  return router
}
