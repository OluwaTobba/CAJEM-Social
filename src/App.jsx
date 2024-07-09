import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import Login from './Components/Login';
import Register from './Components/Register';
import ForgotPassword from './Components/ForgotPassword';
import HomePage from './Components/HomePage';
import Post from './Components/Post';
import ProfileUpdate from './Components/ProfileUpdate';
import Footer from './Components/Footer';

function App() {

  return(
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path="/post" element={<Post />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/update-profile" element={<ProfileUpdate />} />
        </Routes>
        <Footer/>
      </Router>
    </>
  );
};

export default App;