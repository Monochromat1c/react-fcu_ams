const mongoose = require('mongoose');

const assetSchema = new mongoose.Schema({
    asset_image: {
        type: String,
        default: null
    },
    asset_tag_id: {
        type: String,
        required: true
    },
    brand_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Brand',
        required: true
    },
    model: {
        type: String,
        required: true
    },
    specs: {
        type: String,
        default: null
    },
    serial_number: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    supplier_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Supplier',
        required: true
    },
    site_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Site',
        required: true
    },
    location_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location',
        required: true
    },
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    department_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
        required: true
    },
    purchase_date: {
        type: Date,
        required: true
    },
    status_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Status',
        default: null
    },
    condition_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Condition',
        default: null
    },
    maintenance_start_date: {
        type: Date,
        default: null
    },
    maintenance_end_date: {
        type: Date,
        default: null
    },
    assigned_to: {
        type: String,
        default: null
    },
    issued_date: {
        type: Date,
        default: null
    },
    notes: {
        type: String,
        default: null
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    deleted_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    deleted_at: {
        type: Date,
        default: null
    }
}, {
    timestamps: true
});

// Add indexes for better query performance
assetSchema.index({ asset_tag_id: 1 });
assetSchema.index({ serial_number: 1 });
assetSchema.index({ deleted_at: 1 });

module.exports = mongoose.model('Asset', assetSchema); 