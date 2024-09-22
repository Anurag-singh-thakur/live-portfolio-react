const Post = require('../models/Post');

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json({ success: true, data: posts });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.createPost = async (req, res) => {
  try {
    const newPost = new Post(req.body);
    await newPost.save();
    res.status(201).json({ success: true, data: newPost });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
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