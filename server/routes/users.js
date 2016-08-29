/**
 * @author Administrator
 */

var User = require('../../mongo-models/user');
// var Question = require('../../mongo-models/question');

module.exports = function() {
  var router = express.Router()
  
  router.route('/') // /api/users/
  .post(function (req, res, next) {
    console.log('body:', req.body)
    var payload = {}
    if (payload.userName) payload.userName = req.body.username
    if (payload.password) payload.password = req.body.password  //need to hash the pwd
    if (payload.email) payload.email = req.body.email
    if (payload.isAdmin) payload.isAdmin = req.body.isAdmin
    var newU = new User(req.body);
    newU.save(function (err, user) {
      if (err) return console.error(err)
      console.info('user added')
      res.json(user)
    })
  })
  .get(function (req, res, next) {
    User.find(function(err, users) {
      res.json(users);
    })
  })
  router.route('/:id')
  .get(function (req, res, next) {
    User.findOne({_id: req.params._id}, function (error, user) {
      if (err) return console.log(err)
      res.json(user);        
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
          res.send([{user: user, questions: questions}]);
        });
    })
});
  return router
}
