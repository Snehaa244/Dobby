const mongoose = require('mongoose');

const folderSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    parent: {
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

const Folder = mongoose.model('Folder', folderSchema);

module.exports = Folder;
