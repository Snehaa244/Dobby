const mongoose = require('mongoose');

const imageSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: true, // Size in bytes
    },
    folder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Folder',
      default: null,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    starred: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
