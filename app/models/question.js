var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var QuestionSchema = new Schema({
	title: { type: String, required: true },
	description: String,
	summary: String,
	slug: String,
	status: { type: String, enum: ['active', 'inactive'] },
	image: { type: Object },
	answers: { type : Array , "default" : [] },
	categories:   { type : Array , "default" : [] },
	tags:   { type : Array , "default" : [] },
	author: { type : Array , "default" : [] },
	isDeleted: { type: Boolean },
	createdAt: { type: Date, default: Date.now},
	updatedAt: { type: Date, default: Date.now}

}, {collection: 'Question'});

module.exports = mongoose.model('Question', QuestionSchema);