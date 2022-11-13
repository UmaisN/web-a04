const { default: mongoose } = require('mongoose');
const moongose = require('mongoose');

const stopsSchema = new moongose.Schema({
    stpid:{
        type: String
    },
    stpnm:{
        type: String
    },

    lat: {
        type: Number
    },

    lon :{
        type: Number
    }

})

const Stops = mongoose.model('Stops',stopsSchema);
module.exports = Stops;