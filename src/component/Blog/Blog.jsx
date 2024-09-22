import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "./Blog.css";
import Popup from "../Popup/Popup";
import SecretKeyPopup from "../SecretKeyPopup/SecretKeyPopup";

const Blog = () => {
  const [showSecretKeyPopup, setShowSecretKeyPopup] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  const [posts, setPosts] = useState([]);
  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const [newPost, setNewPost] = useState({ title: "", content: "", image: "" });
  const [popup, setPopup] = useState({
    show: false,
    message: "",
    isError: false,
  });
  const [likes, setLikes] = useState({});
  const [likedPosts, setLikedPosts] = useState({});
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState({});
  const [expandedPosts, setExpandedPosts] = useState({});
 

  useEffect(() => {
    fetchPosts();
    const storedLikedPosts = JSON.parse(localStorage.getItem('likedPosts') || '{}');
    setLikedPosts(storedLikedPosts);
  }, []);

  useEffect(() => {
    localStorage.setItem('likedPosts', JSON.stringify(likedPosts));
  }, [likedPosts]);

  const API_URL = "http://localhost:5000/api/posts";

  const fetchPosts = async () => {
    try {
      const response = await axios.get(API_URL);
      console.log("Fetched posts:", response.data);
      setPosts(response.data.data);
      const initialLikes = {};
      const initialComments = {};
      response.data.data.forEach(post => {
        initialLikes[post._id] = post.likes || 0;
        initialComments[post._id] = post.comments || [];
      });
      setLikes(initialLikes);
      setComments(initialComments);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const toggleExpand = useCallback((postId) => {
    setExpandedPosts((prev) => ({ ...prev, [postId]: !prev[postId] }));
  }, []);

  const calculateReadingTime = useCallback((content) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    return readingTime;
  }, []);

  const handleNewPost = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_URL, newPost);
      setNewPost({ title: "", content: "", image: "" });
      setShowNewPostForm(false);
      fetchPosts();
    } catch (error) {
      console.error("Error creating new post:", error);
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
    console.log("Attempting to delete post at URL:", deleteUrl);

    try {
      const response = await axios.delete(deleteUrl, {
        headers: { "Admin-Secret-Key": secretKey },
      });
      console.log("Delete response:", response);
      fetchPosts();
      setPopup({
        show: true,
        message: "Post deleted successfully",
        isError: false,
      });
    } catch (error) {
      console.error("Error deleting post:", error);
      if (error.response && error.response.status === 403) {
        setPopup({
          show: true,
          message: "Incorrect secret key. You do not have permission to delete this post.",
          isError: true,
        });
      } else if (error.response && error.response.status === 404) {
        setPopup({
          show: true,
          message: "Post not found. It may have been already deleted.",
          isError: true,
        });
      } else {
        setPopup({
          show: true,
          message: "An error occurred while trying to delete the post.",
          isError: true,
        });
      }
    }
  };

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const generateClientId = () => {
    const clientId = Math.random().toString(36).substring(2) + Date.now().toString(36);
    localStorage.setItem('clientId', clientId);
    return clientId;
  };
  const handleLike = async (postId) => {
    console.log('Attempting to like post:', postId);
    console.log('Current likedPosts state:', likedPosts);

    if (likedPosts[postId]) {
      console.log('Post already liked');
      setPopup({
        show: true,
        message: "Double trouble! Your support means the world! 💖",
        isError: true,
      });
      return;
    }

    try {
      console.log('Sending like request');
      const response = await axios.post(`${API_URL}/${postId}/like`, {
        clientId: localStorage.getItem('clientId') || generateClientId()
      });
      console.log('Like response:', response.data);

      if (response.data.success) {
        console.log('Updating likes state');
        setLikes(prev => ({
          ...prev,
          [postId]: response.data.likes
        }));

        console.log('Updating likedPosts state');
        setLikedPosts(prev => ({
          ...prev,
          [postId]: true
        }));
      }
      else if (response.data.alreadyLiked) {
        setPopup({
          show: true,
          message: "Double trouble! Your support means the world! 💖",
          isError: true,
        });
      } 
      else {
        throw new Error(response.data.error || 'Unknown error occurred');
      }
    } catch (error) {
      console.error("Error liking post:", error);
      setPopup({
        show: true,
        message: error.message || "An error occurred while liking the post.",
        isError: true,
      });
    }
  };

  const handleComment = async (postId) => {
    try {
      const response = await axios.post(`${API_URL}/${postId}/comment`, { content: newComment[postId] });
      setComments(prev => ({ ...prev, [postId]: [...(prev[postId] || []), response.data.data] }));
      setNewComment(prev => ({ ...prev, [postId]: '' }));
    } catch (error) {
      console.error("Error commenting on post:", error);
      setPopup({
        show: true,
        message: "An error occurred while adding the comment.",
        isError: true,
      });
    }
  };

  return (
    <div className="blog-container">
      <h1 className="blog-title">My Blogs</h1>
      <button
        onClick={() => setShowNewPostForm(!showNewPostForm)}
        className="new-post-btn"
      >
        {showNewPostForm ? "Cancel" : "New Post"}
      </button>

      {showNewPostForm && (
        <div className="new-post-form-container">
          <form onSubmit={handleNewPost} className="new-post-form">
            <h2>Create New Post</h2>
            <input
              type="text"
              placeholder="Title"
              value={newPost.title}
              onChange={(e) =>
                setNewPost({ ...newPost, title: e.target.value })
              }
              required
            />
            <textarea
              placeholder="Content"
              value={newPost.content}
              onChange={(e) =>
                setNewPost({ ...newPost, content: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="Image URL"
              value={newPost.image}
              onChange={(e) =>
                setNewPost({ ...newPost, image: e.target.value })
              }
            />
            <button type="submit">Submit Post</button>
            <button
              type="button"
              className="cancel-btn"
              onClick={() => setShowNewPostForm(false)}
            >
              Cancel
            </button>
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
                e.target.src =
                  "https://via.placeholder.com/300x200?text=Image+Not+Found";
              }}
            />
            <div className="post-content">
              <h2>{post.title}</h2>
              <p className="post-date">
                {formatDate(post.createdAt)} • {calculateReadingTime(post.content)} min read
              </p>
              <p className={expandedPosts[post._id] ? 'expanded' : 'truncated'}>
                {expandedPosts[post._id] ? post.content : `${post.content.split(' ').slice(0, 30).join(' ')}...`}
              </p>
              <div className="button-container">
                {post.content.split(' ').length > 30 && (
                  <button onClick={() => toggleExpand(post._id)} className="expand-btn">
                    {expandedPosts[post._id] ? 'Collapse' : 'Expand'}
                  </button>
                )}
                <button
                  onClick={() => handleLike(post._id)}
                  className={`like-btn ${likedPosts[post._id] ? 'liked' : ''}`}
                  disabled={likedPosts[post._id]}
                >
                  {likedPosts[post._id] ? 'Liked' : 'Like'} ({likes[post._id] || 0})
                </button>
                <button
                  onClick={() => handleDeleteClick(post._id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </div>
              <div className="comment-section">
                <h3>Comments</h3>
                {comments[post._id] && comments[post._id].map((comment, index) => (
                  <p key={index} className="comment">{comment.content}</p>
                ))}
                <input
                  type="text"
                  value={newComment[post._id] || ''}
                  onChange={(e) => setNewComment(prev => ({ ...prev, [post._id]: e.target.value }))}
                  placeholder="Add a comment..."
                />
                <button onClick={() => handleComment(post._id)} className="comment-btn">
                  Comment
                </button>
              </div>
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
          onClose={() => setPopup({ show: false, message: "", isError: false })}
          isError={popup.isError}
        />
      )}
    </div>
  );
};

export default Blog;