const mongoose = require('mongoose');
require('dotenv').config();

// Import all required models
const Brand = require('../models/Brand');
const Supplier = require('../models/Supplier');
const Site = require('../models/Site');
const Location = require('../models/Location');
const Category = require('../models/Category');
const Status = require('../models/Status');
const Condition = require('../models/Condition');
const Asset = require('../models/Asset');

async function createDummyAsset() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Create dummy records for all required relationships
        const brand = await Brand.create({
            brand: "Dell",
        });

        const supplier = await Supplier.create({
            supplier: "PC Express",
        });

        const site = await Site.create({
            site: "Annex Campus",
        });

        const location = await Location.create({
            location: "Roxas City",
        });

        const category = await Category.create({
            category: "Laptop",
        });

        const status = await Status.create({
            status: "Available",
        });

        const condition = await Condition.create({
            condition: "New",
        });

        // Create the dummy asset
        const asset = await Asset.create({
            asset_image: null,
            asset_tag_id: "FCCLT001",
            brand_id: brand._id,
            model: "Latitude 5420",
            specs: "Intel i7, 16GB RAM, 512GB SSD",
            serial_number: "DLL123456789",
            cost: 1299.99,
            supplier_id: supplier._id,
            site_id: site._id,
            location_id: location._id,
            category_id: category._id,
            department_id: "67793590818fcf682fb5a594", // You'll need to replace this with an actual department ID
            purchase_date: new Date(),
            status_id: status._id,
            condition_id: condition._id,
            maintenance_start_date: null,
            maintenance_end_date: null,
            assigned_to: null,
            issued_date: null,
            notes: null,
        });

        console.log('Dummy asset created successfully:');
        console.log(JSON.stringify(asset, null, 2));

    } catch (error) {
        console.error('Error creating dummy asset:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    }
}

createDummyAsset(); 