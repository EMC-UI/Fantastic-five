/**
 * @author Administrator
 */

var User = require('../../mongo-models/user');
// var Question = require('../../mongo-models/question');

module.exports = function (express) {
  var router = express.Router()
  
  // /api/users/
  router.route('/') 
  .post(function (req, res, next) {
    console.log('body:', req.body)
    var payload = {}
    if (payload.userName) payload.userName = req.body.username
    if (payload.password) payload.password = req.body.password  //need to hash the pwd
    if (payload.email) payload.email = req.body.email
    if (payload.isAdmin) payload.isAdmin = req.body.isAdmin
    var newU = new User(req.body);
    newU.save(function (err, user) {
      if (err) {
        console.error(err)
      	res.status(400).json({'error':err})
      } else {
        console.info('user added')
        res.status(201).json(user)
      }
    })
  })
  // /api/users
  .get(function (req, res, next) {
    User.find(function(err, users) {
      res.status(200).json(users);
    })
  })
  // /api/users/{id}
  router.route('/:id')
  .get(function (req, res, next) {
    User.findOne({_id: req.params._id}, function (error, user) {
      if (err) {
      	res.status(400).json({'error':err})
      } else {
      console.info('Found the user')
      res.status(200).json(user)
      }     
    });
  })

// exports.getByName = function(req, res) {
//     User.findOne({userName: req.params.userName}, function(error, user) {
//     	res.send(user);        
// });
// }

// first locates a user by id, then locates the questions by user id.
exports.getUserQuestsById = (function(req, res) {
    User.findOne({_id: req.params._id}, function(error, user) {
        var questions = Question.find({user: user._id}, function(error, questions) {
          res.status(200).send([{user: user, questions: questions}]);
        });
    })
});
  return router
}
