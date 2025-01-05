const mongoose = require('mongoose');

const conditionSchema = new mongoose.Schema({
    condition: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Condition', conditionSchema); 