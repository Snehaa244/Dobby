const Image = require('../models/Image');
const fs = require('fs');
const path = require('path');

// Delete an image
exports.deleteImage = async (req, res) => {
  try {
    const image = await Image.findOne({ _id: req.params.id, user: req.user._id });
    if (!image) return res.status(404).json({ message: 'Image not found' });
    // Remove file from disk
    if (image.url) {
      const filePath = path.join(__dirname, '..', '..', image.url);
      fs.unlink(filePath, (err) => {}); // ignore error
    }
    await image.deleteOne();
    res.json({ message: 'Image deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Star/unstar an image
exports.toggleStarImage = async (req, res) => {
  try {
    const image = await Image.findOne({ _id: req.params.id, user: req.user._id });
    if (!image) return res.status(404).json({ message: 'Image not found' });
    image.starred = !image.starred;
    await image.save();
    res.json({ starred: image.starred });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
