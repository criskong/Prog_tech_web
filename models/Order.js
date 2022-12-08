var mongoose = require('mongoose');

var OrderSchema = new mongoose.Schema({
    owner_id:{
        type: String,
        required: true
    },
    items:{
        type: [String], //Items will be an array of Items saved using json format
        required: true
    },
    total_price:{
        type: Number,
        required: true
    },
    date:{ 
        type: Date, 
        default: Date.now 
    },
    status:{
        type: String,
        required: true,
        enum: ['non pagato','ricevuto','in preparazione','pronto','ritirato']
    },
    target_seller:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Order',OrderSchema);