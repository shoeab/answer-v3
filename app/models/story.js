var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var StorySchema = new Schema({
	creator: { type: Schema.Types.ObjectId, ref: 'User' },
	title: String,
	content: String,
	created: { type: Date, default: Date.now}

});

module.exports = mongoose.model('Story', StorySchema);