const { default: mongoose } = require('mongoose');
const moongose = require('mongoose');

const vehicleSchema = new moongose.Schema({
    vid:{
        type: String
    },

    tmstmp: {
        type: String
    },

    lat:{
        type:String
    },
    lon:{
        type:String
    },
    hdg:{
        type:String
    },
    pid:{
        type:Number
    },
    rt:{
        type:String
    },
    des:{
        type:String
    },
    pdist:{
        type:Number
    },
    dly:{
        type:String
    },
    tatripid:{
        type:String
    },
    origtatripno:{
        type:String
    },
    tablockid:{
        type: String
    },
    zone:{
        type:String
    }

})

const Vehicles = mongoose.model('Vehicles',vehicleSchema);
module.exports = Vehicles;