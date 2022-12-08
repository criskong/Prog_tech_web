var mongoose = require('mongoose');
var Item = require('Item');

var OrderSchema = new mongoose.Schema({
    owner_id:{
        type: String,
        required: true
    },
    items:{
        type: [Item],
        required: true
    },
    total_price:{
        type: Number,
        required: true
    },
    status:{
        type: String,
        required: true,
        enum: ['non pagato','ricevuto','in preparazione','pronto','ritirato']
    }
});

module.exports = mongoose.model('Order',OrderSchema);