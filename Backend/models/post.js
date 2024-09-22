const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  content: String,
  createdAt: { type: Date, default: Date.now }
});

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  image: String,
  likes: { type: Number, default: 0 },
  likedBy: [String], 
  comments: [CommentSchema],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Post', PostSchema);