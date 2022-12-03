var mongoose = require('mongoose');

var OrderSchema = new mongoose.Schema({
    owner_id:{
        type: String,
        required: true
    },
    items_id:{
        type: [String],
        required: true
    },
    total_price:{
        type: Number,
        required: true
    },
    status:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Order',OrderSchema);