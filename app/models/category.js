var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CategorySchema = new Schema({
	title: String,
	description: String,
	createdAt: { type: Date, default: Date.now},
	updatedAt: { type: Date, default: Date.now}

}, {collection: 'Category'});

module.exports = mongoose.model('Category', CategorySchema);