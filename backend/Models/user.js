const mongoose = require("mongoose");

const User = new mongoose.Schema({
    name: String,
    age: Number,
});

module.export = mongoose.model("user", User);

