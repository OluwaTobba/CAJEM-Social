import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaUserCircle } from 'react-icons/fa';

function Register() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [profilePicture, setProfilePhoto] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        // Add your authentication code here
        console.log({ username, password, profilePicture });
        navigate('/login');
    };

    const handlePhotoChange = (e) => {
        setProfilePhoto(e.target.files[0]);
    };

    return (

        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">

            <div className="bg-white p-6 rounded shadow-md w-full max-w-md">

                <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
                
                <form onSubmit={handleRegister}>

                    <div className="mb-4 text-center">

                        <label htmlFor="profilePicture">
                        {profilePicture ? (
                            <img
                            src={URL.createObjectURL(profilePicture)}
                            alt="Profile"
                            className="w-28 h-28 rounded-full mx-auto"
                            />
                        ) : (
                            <FaUserCircle className="cursor-pointer text-7xl text-gray-600 mx-auto" />
                        )}
                        </label>

                        <input
                        id="profilePicture"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handlePhotoChange}
                        />

                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">First Name</label>
                        <input
                        type="text"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        placeholder="Enter your first name"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Last Name</label>
                        <input
                        type="text"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        placeholder="Enter your last name"
                        />
                    </div>
                    
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input
                        type="email"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        placeholder="Enter your email"
                        />
                    </div>
                    
                    <div className="mb-4">
                        <label className="block text-gray-700">Username</label>
                        <input
                        type="text"
                        value={setUsername}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        placeholder="Enter your username"
                        />
                    </div>
                    
                    <div className="mb-4 relative">

                        <label className="block text-gray-700">Password</label>
                        <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        placeholder="Enter your password"
                        />

                        <button
                        type="button"
                        className="mt-6 absolute inset-y-0 right-3 flex items-center text-gray-600"
                        onClick={() => setShowPassword(!showPassword)}
                        >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>

                    </div>
                    
                    <div className="mb-4 relative">

                        <label className="block text-gray-700">Confirm Password</label>
                        <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        placeholder="Confirm your password"
                        />

                        <button
                        type="button"
                        className="mt-6 absolute inset-y-0 right-3 flex items-center text-gray-600"
                        onClick={() => setShowPassword(!showPassword)}
                        >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>

                    </div>
                    
                    
                    <div className="mb-4 flex justify-between items-center">
                        <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
                        >
                        Sign Up
                        </button>
                    </div>

                </form>

                <hr className="my-6" />
                
                <div className="text-center">
                    <Link to="/login" className="text-blue-600 hover:underline">
                        Already have an account? Log In
                    </Link>
                </div>
                
            </div>

        </div>

    );

};

export default Register;