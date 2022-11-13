const { default: mongoose } = require('mongoose');
const moongose = require('mongoose');

const directionsSchema = new moongose.Schema({
    dir:{
        type: String
    }
})

const Directions = mongoose.model('Directions',directionsSchema);
module.exports = Directions;