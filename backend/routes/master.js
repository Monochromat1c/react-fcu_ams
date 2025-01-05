const express = require('express');
const router = express.Router();
const { getAllRoles, getAllDepartments } = require('../controllers/MasterController');
const authMiddleware = require('../middleware/auth');

router.use(authMiddleware);

router.get('/roles', getAllRoles);
router.get('/departments', getAllDepartments);

module.exports = router; 