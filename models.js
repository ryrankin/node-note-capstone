const mongoose = require('mongoose');
const moment = require('moment');

const noteSchema = mongoose.Schema({
	title: {type: String, required: true},
	content: {type: String},
	date: {type: Date, default: Date.now }
});


noteSchema.methods.apiRepr = function(){
	return {
		id: this._id,
		title: this.title,
		content: this.content,		
		date: this.date

	};
}

const Notes = mongoose.model('Notes', noteSchema);

module.exports = {Notes};