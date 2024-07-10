import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import { createPost } from '../Services/Api';

function Post() {

  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [message, setMessage] = useState('');

  const handlePostSubmit = async (e) => {

    e.preventDefault();
    
    if (newPost.trim() !== '') {

      const postData = {
        userId: 1,
        content: newPost,
      };

      try {

        const response = await createPost(postData);

        if (response.success) {

          setMessage('Post created successfully.');
          setPosts([postData, ...posts]);
          setNewPost('');

        } else {
          setMessage('Error creating post.');
        }

      } catch (error) {

        setMessage('Error creating post.');
        console.error(error);

      }
    
    }
  
  };

  useEffect(() => {

    if (message) {

      const timer = setTimeout(() => {
        setMessage('');
      }, 3000);
      return () => clearTimeout(timer);

    }

  }, [message]);

  // const handleLike = (id) => {

  //   setPosts(posts.map(post => 
  //     post.id === id ? { ...post, likes: post.likes + 1 } : post
  //   ));

  // };

  return (

    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">

        <div className="bg-white p-6 rounded shadow-md w-full max-w-2xl mb-6">

          <h2 className="text-2xl font-bold mb-4 text-center">Create a Post</h2>

          <form onSubmit={handlePostSubmit}>

            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="What's on your mind?"
              rows="4"
            />
            <button
              type="submit"
              className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
            >
              Post
            </button>

          </form>

          {message && (
            <div className="mt-4 text-green-600">
              {message}
            </div>
          )}

          <div className="text-center mt-6">
            <Link to="/home" className="text-blue-600 hover:underline">
              Go to Homepage
            </Link>
          </div>

        </div>

      </div>

    </div>

  );

};

export default Post;