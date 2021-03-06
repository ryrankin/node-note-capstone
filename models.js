const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
	title: {type: String, required: true},
	content: {type: String, text: true},
	date: {type: Date}
});
noteSchema.index({content: 'text'});

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

