const Post = require('../models/Post');
const asyncHandler = require('../utils/asyncHandeler');

exports.getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 });
  res.status(200).json({ success: true, count: posts.length, data: posts });
});

exports.createPost = asyncHandler(async (req, res) => {
  const post = await Post.create(req.body);
  res.status(201).json({ success: true, data: post });
});

exports.deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }

  await post.remove();

  res.status(200).json({ message: 'Post deleted successfully' });
});