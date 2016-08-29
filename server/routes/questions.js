
//var User = require('../../mongo-models/user');
var Question = require('../../mongo-models/questions');

module.exports = function (express) {
    var router = express.Router()

    // /api/questions
    router.route('/')
        .post(function (req, res) {
            console.log('body: ', req.body)
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

        // /api/questions
        .get(function (req, res) {
            var titleParam = req.query.title
            console.log('search text: ', titleParam)
            Question.find(function(err, questions) {
                res.status(200).json(questions);
            })
        })

    return router
}
