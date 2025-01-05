const express = require('express');
const router = express.Router();
const { getAllAssets } = require('../controllers/AssetController');
const authMiddleware = require('../middleware/auth');

router.use(authMiddleware);

router.get('/', getAllAssets);

module.exports = router;
