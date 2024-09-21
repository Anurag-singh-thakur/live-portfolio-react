const express = require('express');
const { getPosts, createPost, deletePost } = require('../controllers/postController');
const adminAuth = require('../middleware/adminAuth');

const router = express.Router();

router.route('/').get(getPosts).post(createPost);
router.route('/:id').delete(adminAuth, deletePost);

module.exports = router;