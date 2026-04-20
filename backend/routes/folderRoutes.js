const express = require('express');
const router = express.Router();
const { createFolder, getFolders, getFolderTree, deleteFolder, toggleStarFolder } = require('../controllers/folderController');
const { protect } = require('../middleware/auth');


router.post('/', protect, createFolder);
router.get('/', protect, getFolders);
router.get('/tree', protect, getFolderTree);
router.delete('/:id', protect, deleteFolder);
router.patch('/:id/star', protect, toggleStarFolder);

module.exports = router;
