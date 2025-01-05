const Asset = require('../models/Asset');

const getAllAssets = async (req, res) => {
    try {
        const assets = await Asset.find()
            .populate('supplier_id')
            .populate('category_id')
            .populate('status_id')
            .populate('condition_id')
            .populate('department_id');
        
        res.json(assets);
    } catch (error) {
        console.error('Error fetching assets:', error);
        res.status(500).json({ message: 'Error fetching assets' });
    }
};

module.exports = {
    getAllAssets
};
