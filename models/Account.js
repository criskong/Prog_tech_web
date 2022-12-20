var mongoose = require('mongoose');

var AccountSchema = new mongoose.Schema({
    id:{
        type: String,
        required: true
    },
    provider:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    surname:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Account',AccountSchema);