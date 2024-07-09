import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

function Post() {

  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const navigate = useNavigate();

  const handlePostSubmit = (e) => {

    e.preventDefault();
    
    // if (newPost.trim() !== '') {

    //   const post = {
    //     id: posts.length + 1,
    //     content: newPost,
    //     likes: 0,
    //     comments: 0,
    //     shares: 0,
    //     user: 'CurrentUser',
    //   };

    //   setPosts([post, ...posts]);
    //   setNewPost('');
    
    // }

    navigate('/home');
  
  };

  const handleLike = (id) => {

    setPosts(posts.map(post => 
      post.id === id ? { ...post, likes: post.likes + 1 } : post
    ));

  };

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

          <div className="text-center mt-6">
            <Link to="/home" className="text-blue-600 hover:underline">
              Go to Homepage
            </Link>
          </div>

        </div>

        <div className="w-full max-w-2xl">

          {posts.map((post) => (
            <div key={post.id} className="bg-white p-6 rounded shadow-md mb-4">
              <div className="flex items-center mb-4">
                <Link to={`/profile/${post.user}`}>
                  <FaUserCircle className="text-3xl text-gray-600 mr-4" />
                </Link>
                <h3 className="text-lg font-semibold">{post.user}</h3>
              </div>
              <p className="text-gray-800">{post.content}</p>
              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={() => handleLike(post.id)}
                  className="flex items-center bg-blue-600 text-white py-1 px-4 rounded-md hover:bg-blue-700"
                >
                  <FaThumbsUp className="mr-2" /> Like ({post.likes})
                </button>
              </div>
            </div>
          ))}

        </div>

      </div>

    </div>

  );

};

export default Post;