const { default: mongoose } = require('mongoose');
const moongose = require('mongoose');

const systemTimeSchema = new moongose.Schema({
    tm:{
        type: String
    }
})

const SystemTime = mongoose.model('Systemtime',systemTimeSchema);
module.exports = SystemTime;