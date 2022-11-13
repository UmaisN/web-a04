const { default: mongoose } = require('mongoose');
const moongose = require('mongoose');

const patternsSchema = new moongose.Schema({
    seq: Number,
	lat: Number,
    lon: Number,
	typ: String,
	pdist: Number
})

const Patterns = mongoose.model('Patterns',patternsSchema);
module.exports = Directions;