const express = require('express');
const router = express.Router();
const { createFolder, getFolders, getFolderTree } = require('../controllers/folderController');
const { protect } = require('../middleware/auth');

router.post('/', protect, createFolder);
router.get('/', protect, getFolders);
router.get('/tree', protect, getFolderTree);

module.exports = router;
