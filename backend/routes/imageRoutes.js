const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Image = require('../models/Image');
const { deleteImage, toggleStarImage } = require('../controllers/imageController');
const { protect } = require('../middleware/auth');

// Setup multer storage
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png|webp|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('Images only!');
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

// @desc    Upload an image
// @route   POST /api/images
// @access  Private
router.post('/', protect, upload.single('image'), async (req, res) => {
  const { name, folderId } = req.body;

  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  try {
    const imageUrl = `/${req.file.path.replace(/\\/g, '/')}`; // Ensure proper syntax for URL

    const newImage = await Image.create({
      name: name || req.file.originalname,
      url: imageUrl,
      size: req.file.size,
      folder: folderId ? folderId : null,
      user: req.user._id,
    });

    res.status(201).json(newImage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete image
router.delete('/:id', protect, deleteImage);
// Star/unstar image
router.patch('/:id/star', protect, toggleStarImage);

module.exports = router;
