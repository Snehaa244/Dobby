const Folder = require('../models/Folder');
const Image = require('../models/Image');
const mongoose = require('mongoose');

// @desc    Create a new folder
// @route   POST /api/folders
// @access  Private
const createFolder = async (req, res) => {
  const { name, parentId } = req.body;
  
  try {
    const parent = parentId ? parentId : null;
    
    // Check if folder with same name exists in the exact same location for this user
    const existingFolder = await Folder.findOne({ name, parent, user: req.user._id });
    if (existingFolder) {
      return res.status(400).json({ message: 'Folder with this name already exists in this location' });
    }

    const folder = await Folder.create({
      name,
      parent,
      user: req.user._id,
    });

    res.status(201).json(folder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user folders and images for a specific parent (directory view)
// @route   GET /api/folders?parentId=...
// @access  Private
const getFolders = async (req, res) => {
  const parentId = req.query.parentId || null;
  
  try {
    const folders = await Folder.find({ user: req.user._id, parent: parentId });
    const images = await Image.find({ user: req.user._id, folder: parentId });
    
    // Check if we need to return breadcrumbs
    let breadcrumbs = [];
    if (parentId) {
      let currentFolder = await Folder.findById(parentId);
      while(currentFolder) {
        breadcrumbs.unshift({ _id: currentFolder._id, name: currentFolder.name });
        if(currentFolder.parent) {
          currentFolder = await Folder.findById(currentFolder.parent);
        } else {
          break;
        }
      }
    }

    // Attach sizes to the folders dynamically
    const foldersWithSize = await Promise.all(folders.map(async (folder) => {
      const size = await getFolderSize(folder._id, req.user._id);
      return { ...folder.toObject(), size };
    }));

    res.json({ folders: foldersWithSize, images, breadcrumbs });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Recursive helper to get calculate total size of a folder and all its nested subfolders
const getFolderSize = async (folderId, userId) => {
  const foldersHierarchy = await Folder.aggregate([
    { $match: { _id: new mongoose.Types.ObjectId(folderId), user: new mongoose.Types.ObjectId(userId) } },
    {
      $graphLookup: {
        from: 'folders',
        startWith: '$_id',
        connectFromField: '_id',
        connectToField: 'parent',
        as: 'descendants',
      },
    },
  ]);

  if (!foldersHierarchy || foldersHierarchy.length === 0) return 0;

  const folderIds = [
    new mongoose.Types.ObjectId(folderId),
    ...foldersHierarchy[0].descendants.map((f) => f._id)
  ];

  const sizeAggregation = await Image.aggregate([
    { $match: { folder: { $in: folderIds }, user: new mongoose.Types.ObjectId(userId) } },
    { $group: { _id: null, totalSize: { $sum: '$size' } } },
  ]);

  return sizeAggregation.length > 0 ? sizeAggregation[0].totalSize : 0;
};

// @desc    Get complete folder tree structure for sidebar
// @route   GET /api/folders/tree
// @access  Private
const getFolderTree = async (req, res) => {
  try {
    const folders = await Folder.find({ user: req.user._id }).sort('name');
    
    // Function to build tree structure
    const buildTree = (allFolders, parentId = null) => {
      return allFolders
        .filter(folder => String(folder.parent) === String(parentId))
        .map(folder => ({
          ...folder.toObject(),
          children: buildTree(allFolders, folder._id)
        }));
    };

    const tree = buildTree(folders, null);
    
    res.json(tree);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createFolder,
  getFolders,
  getFolderTree
};
