/**
 * Created by dharn on 8/29/16.
 */

var Question = require('../../mongo-models/questions');

module.exports = function(express) {
    var router = express.Router

    router.route('/:questionId/answers/')
        .post(function (req, res) {
            console.log('body: ', req.body)
            if(!req.body) {
                return res.status(400).json({'error':'empty payload'})
            }
            Question.findOne({_id: req.params.questionId}, function (err, question) {
                if (err) {
                    res.status(400).json({'error':err})
                } else {
                    console.info('Found the question')
                    res.status(200).json(question)
                }
            });
            question.answers.push(req.body)
            question.save(function (err, savedAnswer) {
                if(err) {
                    console.error(err)
                    res.status(400).json({'error':err})
                } else {
                    console.info("Answer added for the user")
                    res.status(200).json(savedAnswer)
                }
            })
        })

    // router.route('/:questionId/answers/:answerId')
    //     .put(function (req, res) {
    //         console.log('body: ', req.body)
    //         Question.findOne({_id: req.params.questionId}, function (err, question) {
    //             if (err) {
    //                 res.status(400).json({'error':err})
    //             } else {
    //                 console.info('Found the question')
    //                 res.status(200).json(question)
    //             }
    //         });
    //         var newQ = new Question(req.body)
    //         newQ.save(function (err, savedAnswer) {
    //             if(err) {
    //                 console.error(err)
    //                 res.status(400).json({'error':err})
    //             } else {
    //                 console.info("Answer added for the user")
    //                 res.status(200).json(savedAnswer)
    //             }
    //         })
    //     })


    return router
}

