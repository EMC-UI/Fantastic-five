var mongoose = require('mongoose')

var tagSchema = mongoose.Schema({
  content: { type: String, required: true}
});

var Tags = mongoose.model('Tags', tagSchema);
// make this available to our users in our Node applications
module.exports = Tags;