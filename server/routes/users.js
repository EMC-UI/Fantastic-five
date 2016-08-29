/**
 * @author Administrator
 */

var User = require('../../mongo-models/user');
var Question = require('../../mongo-models/question');

exports.post = function(req, res) {
	var payload = {}
	if (payload.userName) payload.userName = req.body.userName
	if (payload.password) payload.password = req.body.password  //need to hash the pwd
	if (payload.email) payload.email = req.body.email
	if (payload.isAdmin) payload.isAdmin = req.body.isAdmin
    newU = new User(body);
    newU.save(function (err, question) {
  	if (err) return console.error(err);
 	console.info('user added')
}

exports.getall = function(req, res) {
  User.find(function(err, users) {
    res.send(users);
  });
}

exports.getById = function(req, res) {
    User.findOne({_id: req.params._id}, function(error, user) {
    	res.send(user);        
});
}

exports.getByName = function(req, res) {
    User.findOne({userName: req.params.userName}, function(error, user) {
    	res.send(user);        
});
}

// first locates a user by id, then locates the questions by user id.
exports.getUserQuestsById = (function(req, res) {
    User.findOne({_id: req.params._id}, function(error, user) {
        var questions = Question.find({user: user._id}, function(error, questions) {
          res.send([{user: user, questions: questions}]);
        });
    })
});
