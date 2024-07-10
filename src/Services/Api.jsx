import axios from 'axios';

const API_URL = 'http://localhost/social-media-app/public';

// Register User
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register.php`, userData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error during user registration:', error);
    throw error;
  }
};

// Login User
export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/login.php`, userData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error during user login:', error);
    throw error;
  }
};

// Forgot Password
export const forgotPassword = async (userData) => {
  const response = await axios.post(`${API_URL}/forgot-password.php`, userData, {
      headers: {
          'Content-Type': 'application/json'
      }
  });
  return response.data;
};

// Fetch User
export const fetchUserProfile = async (userId) => {
  const response = await axios.post(`${API_URL}/fetch_user_profile.php`, { user_id: userId }, {
      headers: {
          'Content-Type': 'application/json'
      }
  });
  return response.data;
};

// Update Profile
export const updateProfile = async (profileData) => {
  const response = await axios.post(`${API_URL}/update-profile.php`, profileData, {
      headers: {
          'Content-Type': 'multipart/form-data'
      }
  });
  return response.data;
};

// Make a post
export const createPost = async (postData) => {
  const response = await axios.post(`${API_URL}/post.php`, postData, {
      headers: {
          'Content-Type': 'application/json'
      }
  });
  return response.data;
};

// Fetch Posts
export const fetchPosts = async () => {
  const response = await axios.get(`${API_URL}/fetch_posts.php`);
  return response.data;
};

// Like Post
export const likePost = async (postId) => {
  const response = await axios.post(`${API_URL}/like_post.php`, { post_id: postId }, {
    headers: {
      'Content-Type': 'application/json',
    }
  });
  return response.data;
};

// Follow User
export const followUser = async (followingId) => {
  const response = await axios.post(`${API_URL}/follow_user.php`, { following_id: followingId }, {
    headers: {
      'Content-Type': 'application/json',
    }
  });
  return response.data;
};

// Logout
export const logoutUser = async () => {
  const response = await axios.post(`${API_URL}/logout.php`, {}, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return response.data;
};
