const mongoose = require('mongoose');

const siteSchema = new mongoose.Schema({
    site: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Site', siteSchema); 