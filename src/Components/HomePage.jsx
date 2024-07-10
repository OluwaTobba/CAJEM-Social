import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle, FaThumbsUp } from 'react-icons/fa';
import Navbar from './Navbar';
import { fetchPosts, likePost, followUser } from '../Services/Api';

function HomePage() {

  const [posts, setPosts] = useState([]);

  useEffect(() => {

    const fetchData = async () => {
      const response = await fetchPosts();
      setPosts(response);
    }

    fetchData();

  }, []);

  const handleLike = async (id) => {

    const response = await likePost(id);

    if (response.success) {
      setPosts(posts.map(post => 
        post.id === id ? { ...post, likes: response.likes } : post
      ));
    }
    
  };

  const handleFollowToggle = async (userId) => {

    const response = await followUser(userId);

    if (response.success) {
      setPosts(posts.map(post => 
        post.userId === userId ? { ...post, isFollowing: response.isFollowing } : post
      ));
    }
    
  };

  return (
    
    <div className="min-h-screen bg-gray-100">

      <Navbar />
      
      <div className="flex flex-col items-center justify-center p-4">

        <div className="w-full max-w-4xl">

          {posts.map((post) => (

            <div key={post.id} className="bg-white p-6 rounded shadow-md mb-4">

              <div className="flex justify-between items-center mb-4">

                <Link to={`/home`} className="flex items-center">
                  <FaUserCircle className="text-3xl text-gray-600 mr-4" />
                  <h3 className="text-lg font-semibold">{post.user}</h3>
                </Link>

                <button
                  onClick={() => handleFollowToggle(post.userId)}
                  className={`py-1 px-4 rounded-md ${post.isFollowing ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
                >
                  {post.isFollowing ? 'Unfollow' : 'Follow'}
                </button>

              </div>

              <p className="text-gray-800 mb-4">{post.content}</p>
              
              <div className="flex justify-between items-center">

                <button
                  onClick={() => handleLike(post.id)}
                  className="flex items-center bg-blue-600 text-white py-1 px-4 rounded-md hover:bg-blue-700"
                >
                  <FaThumbsUp className="mr-2" /> ({post.likes})
                </button>
              
              </div>
            
            </div>

          ))}

        </div>

      </div>

    </div>

  );

};

export default HomePage;