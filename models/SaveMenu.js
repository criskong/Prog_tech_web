var mongoose = require('mongoose');

var SavedMenuSchema = new mongoose.Schema({
    owner_id:{
        type: String,
        required: true
    },
    items_id:{
        type: [String],
        required: true
    }
});

module.exports = mongoose.model('SavedMenu',SavedMenuSchema);