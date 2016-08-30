/**
 * Created by dharn on 8/29/16.
 */

var Question = require('../../mongo-models/questions');

module.exports = function(express) {
    var router = express.Router()

    // POST an answer
    router.route('/:questionId/answers/')
        .post(function (req, res) {
            console.log('body: ', req.body)
            if (req.user) {
                console.log('authenticated request')
            }
            if(!req.body) {
                return res.status(400).json({'error':'empty payload'})
            }
            Question.findOne({_id: req.params.questionId}, function (err, question) {
                if (err) {
                    res.status(400).json({'error':err})
                } else {
                    console.info('Found the question')
                }
                question.answers.push(req.body) // answer obj doesnt have an Id
                question.save(function (err, savedAnswer) {
                    if(err) {
                        console.error(err)
                        res.status(400).json({'error':err})
                    } else {
                        console.info("Answer added for the question")
                        res.status(200).json(savedAnswer)
                    }
                })
            });
        })

    // PUT answer (Pick the best one)
    // router.route('/:questionId/answers/:answerId')
    //     .put(function (req, res) {
    //         console.log('body: ', req.body)
    //         if (req.user) {
    //             console.log('authenticated request')
    //         }
    //         if(!req.body) {
    //             return res.status(400).json({'error':'empty payload'})
    //         }
    //         Question.findOne({_id: req.params.questionId}, function (err, question) {
    //             if (err) {
    //                 res.status(400).json({'error':err})
    //             } else {
    //                 console.info('Found the question')
    //             }
    //
    //             for(var j = 0 ; j < question.answers.array.length; j++ ){
    //                 if (question.answers[j]._id == req.params.answerId) {
    //                     question.answers[j].isBest = true
    //                 }
    //             }
    //
    //             //question.answers.push(req.body)
    //             question.save(function (err, savedAnswer) {
    //                 if(err) {
    //                     console.error(err)
    //                     res.status(400).json({'error':err})
    //                 } else {
    //                     console.info("Answer added for the question")
    //                     res.status(200).json(savedAnswer)
    //                 }
    //             })
    //         });
    //     })


    return router
}

