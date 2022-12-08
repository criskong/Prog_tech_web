var mongoose = require('mongoose');

var ItemSchema = new mongoose.Schema({
    seller:{
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true,
        enum: ['primo','secondo','contorno','bibita']
    },
    description:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Item',ItemSchema);