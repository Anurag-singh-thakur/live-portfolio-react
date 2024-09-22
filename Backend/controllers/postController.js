const multer = require('multer');
const path = require('path');
const Post = require('../models/post');
const fs = require('fs');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  }
});

const upload = multer({ storage: storage }).single('image');

exports.createPost = async (req, res) => {
  upload(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ success: false, error: err.message });
    } else if (err) {
      return res.status(400).json({ success: false, error: err.message });
    }

    try {
      const { title, content } = req.body;
      if (!title || !content) {
        return res.status(400).json({ success: false, error: 'Title and content are required' });
      }

      const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

      const newPost = new Post({
        title,
        content,
        image: imagePath
      });

      await newPost.save();
      res.status(201).json({ success: true, data: newPost });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  });
};
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json({ success: true, data: posts });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ success: false, error: 'Post not found' });
    }
    res.json({ success: true, data: {} });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const clientId = req.body.clientId;

    if (!post) {
      return res.status(404).json({ success: false, error: 'Post not found' });
    }

    if (!post.likedBy) {
      post.likedBy = [];
    }

    if (post.likedBy.includes(clientId)) {
      return res.json({ success: false, alreadyLiked: true, likes: post.likes });
    }

    post.likes += 1;
    post.likedBy.push(clientId);
    await post.save();

    res.json({ success: true, likes: post.likes });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
exports.addComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ success: false, error: 'Post not found' });
    }
    const newComment = {
      content: req.body.content,
      createdAt: new Date()
    };
    post.comments.push(newComment);
    await post.save();
    res.status(201).json({ success: true, data: newComment });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};