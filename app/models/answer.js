var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var AnswerSchema = new Schema({
	description: String,
	summary: String,
	status: { type: String, enum: ['active', 'inactive'] },
	questionId: String,
	author: { type : Array , "default" : [] },
	isDeleted: { type: Boolean },
	createdAt: { type: Date, default: Date.now},
	updatedAt: { type: Date, default: Date.now}

}, {collection: 'Answer'});

module.exports = mongoose.model('Answer', AnswerSchema);