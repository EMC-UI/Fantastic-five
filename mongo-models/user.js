/**
 * @author Administrator
 */

/**
 * @author Administrator
 */
var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  username: { type: String, required: true, trim: true, index: { unique: true } },
  password: { type: String, required: true },
  email: String,
  isAdmin: Boolean
});

var Users = mongoose.model('Users1', userSchema);

// make this available to our users in our Node applications
module.exports = Users;


