
var Question = require('../../mongo-models/questions');

module.exports = function (express) {
    var router = express.Router()

    // POST /api/questions
    router.route('/')
        .post(function (req, res) {
            console.log('body: ', req.body)
            if (req.user) {
                console.log('authenticated request')
            }
            if(!req.body) {
                return res.status(400).json({'error':'empty payload'})
            }
            var newQ = new Question(req.body)
            newQ.save(function (err, savedQuestion) {
                if(err) {
                    console.error(err)
                    res.status(400).json({'error':err})
                } else {
                    console.info("Question added for the user")
                    res.status(200).json(savedQuestion)
                }
            })
        })

        // GET (SEARCH) /api/questions
        router.route('/')
        .get(function (req, res) {
            var titleParam = req.query.title
            console.log('search text: ', titleParam)
            Question.find({title : titleParam}, function(err, questions) {
                res.status(200).json(questions);
            })
        })

        // GET by Id /api/questions/{id}
        router.route('/:_id')
        .get(function (req, res) {
            console.log('Getting question by id: '), req.params._id
            Question.findone({_id: req.params._id}, function (err, questions) {
                res.status(200).json(questions);
            })
        })


    return router
}
