const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
    supplier: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Supplier', supplierSchema); 