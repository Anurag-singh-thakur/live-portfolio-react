import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Blog.css';
import Popup from '../Popup/Popup';
import SecretKeyPopup from '../SecretKeyPopup/SecretKeyPopup';

const Blog = () => {
  const [showSecretKeyPopup, setShowSecretKeyPopup] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  const [posts, setPosts] = useState([]);
  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', content: '', image: '' });
  const [popup, setPopup] = useState({show: false, message: '', isError: false});

  useEffect(() => {
    fetchPosts();
  }, []);

  const API_URL = 'http://localhost:5000/api/posts';

  const fetchPosts = async () => {
    try {
      const response = await axios.get(API_URL);
      console.log('Fetched posts:', response.data);
      setPosts(response.data.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleNewPost = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_URL, newPost);
      setNewPost({ title: '', content: '', image: '' });
      setShowNewPostForm(false);
      fetchPosts();
    } catch (error) {
      console.error('Error creating new post:', error);
    }
  };

  const handleDeleteClick = (postId) => {
    setPostToDelete(postId);
    setShowSecretKeyPopup(true);
  };

  const handleSecretKeySubmit = async (secretKey) => {
    setShowSecretKeyPopup(false);
    if (postToDelete) {
      await handleDelete(postToDelete, secretKey);
      setPostToDelete(null);
    }
  };

  const handleDelete = async (postId, secretKey) => {
    const deleteUrl = `${API_URL}/${postId}`;
    console.log('Attempting to delete post at URL:', deleteUrl);

    try {
      const response = await axios.delete(deleteUrl, {
        headers: { 'Admin-Secret-Key': secretKey }
      });
      console.log('Delete response:', response);
      fetchPosts();
      setPopup({ show: true, message: 'Post deleted successfully', isError: false });
      console.log('popup state after deletion:', {show: true, message: 'Post deleted successfully', isError: false });
    } catch (error) {
      console.error('Error deleting post:', error);
      if (error.response) {
        console.error('Error response:', error.response.data);
        console.error('Error status:', error.response.status);
        console.log('Popup state after error:', { show: true, message: 'Error message here', isError: true });
      }
      if (error.response && error.response.status === 403) {
        setPopup({ show: true, message: 'Incorrect secret key. You do not have permission to delete this post.', isError: true });
      } else if (error.response && error.response.status === 404) {
        setPopup({ show: true, message: 'Post not found. It may have been already deleted.', isError: true });
      } else {
        setPopup({ show: true, message: 'An error occurred while trying to delete the post.', isError: true });
      }
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="blog-container">
      <h1 className="blog-title">Our Blog</h1>
      <button onClick={() => setShowNewPostForm(!showNewPostForm)} className="new-post-btn">
        {showNewPostForm ? 'Cancel' : 'New Post'}
      </button>

      {showNewPostForm && (
        <div className="new-post-form-container">
          <form onSubmit={handleNewPost} className="new-post-form">
            <h2>Create New Post</h2>
            <input
              type="text"
              placeholder="Title"
              value={newPost.title}
              onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
              required
            />
            <textarea
              placeholder="Content"
              value={newPost.content}
              onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Image URL"
              value={newPost.image}
              onChange={(e) => setNewPost({ ...newPost, image: e.target.value })}
            />
            <button type="submit">Submit Post</button>
            <button type="button" className="cancel-btn" onClick={() => setShowNewPostForm(false)}>Cancel</button>
          </form>
        </div>
      )}
      
      <div className="post-list">
        {posts.map((post) => (
          <div key={post._id} className="post-card">
            <img 
              src={post.image} 
              alt={post.title} 
              className="post-image" 
              onError={(e) => {
                console.error(`Error loading image for post: ${post.title}`);
                e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Found';
              }} 
            />
            <div className="post-content">
              <h2>{post.title}</h2>
              <p className="post-date">{formatDate(post.createdAt)}</p>
              <p>{post.content}</p>
              <button onClick={() => handleDeleteClick(post._id)} className="delete-btn">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {showSecretKeyPopup && (
        <SecretKeyPopup
          onSubmit={handleSecretKeySubmit}
          onCancel={() => setShowSecretKeyPopup(false)}
        />
      )}

      {popup.show && (
        <Popup
          message={popup.message}
          onClose={() => setPopup({ show: false, message: '', isError: false })}
          isError={popup.isError}
        />
      )}
    </div>
  );
};

export default Blog;