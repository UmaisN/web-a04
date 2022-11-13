const { default: mongoose } = require('mongoose');
const moongose = require('mongoose');

const routesSchema = new moongose.Schema({
    rt:{
        type: String
    },
    rtnm: {
        type: String
    },

    rtclr: {
        type: String
    },

    rtdd: {
        type:String
    }
})

const Routes = mongoose.model('Routes',routesSchema);
module.exports = Routes;