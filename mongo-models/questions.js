/**
 * @author Administrator
 */

/**
 * @author Administrator
 */
var mongoose = require('mongoose');

var answerSchema = mongoose.Schema({
    content: { type: String, required: true, index: { text: true }},
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
    timeStamp: {type: Date, default:Date.now},
	isBest: {type: Boolean, default:false},
	votes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users'}]
});

var questionSchema = mongoose.Schema({
	title: { type: String, required: true, trim: true, index: { unique: true, text: true }},
    content: { type: String, required: true},
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
    tags: [String],
    answers: [answerSchema],
    createdTimeStamp: {type: Date, default:Date.now},
	modifiedTimeStamp: {type: Date, default:Date.now},
	votes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users'}]
});

var Questions = mongoose.model('Questions', questionSchema);

// make this available to our users in our Node applications
module.exports = Questions;

