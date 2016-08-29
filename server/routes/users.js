/**
 * @author Administrator
 */
var bcrypt = require('bcrypt')
var User = require('../../mongo-models/user');
// var Question = require('../../mongo-models/question');

module.exports = function (express) {
  var router = express.Router()
  router.route('/signup') // /api/users/
  .post(function (req, res, next) {
    console.log('body:', req.body)
    req.body.password = bcrypt.hashSync(req.body.password, 10)
    console.log('pass hash:', req.body.password)
    if (!req.body) return res.status(400).json({error: 'empty payload'})
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
  router.route('/login') // /api/users/
  .post(function (req, res, next) {
    console.log('body:', req.body)
    if (!req.body) return res.status(400).json({error: 'empty payload'})
    var newU = new User(req.body);
    User.findOne({
      username: req.body.username,
      password: bcrypt.hashSync(req.body.password, 10)
    }, '-password', function (err, user) {
      if (err) {
        return res.status(401).json({error: 'unauthorized'})
      }
      if (!user) {
        return res.status(401).json({error: 'unauthorized'})
      }
      res.status(200).json(user)
    })
  })
  router.route('/') // /api/users/
  .get(function (req, res, next) {
    User.find({}, '-password', function(err, users) {
      if (err) {
      	res.status(400).json({'error':err})
      } else {
      res.status(200).json(users);
      }
    })
  })
  // /api/users/{id}
  router.route('/:_id')
  .get(function (req, res, next) {
    User.findOne({_id: req.params._id}, '-password', function (err, user) {
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
