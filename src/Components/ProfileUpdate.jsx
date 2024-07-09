import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaUserCircle, FaEye, FaEyeSlash } from 'react-icons/fa';
import Navbar from './Navbar';

function ProfileUpdate() {
    
    const { username } = useParams();
    const [name, setName] = useState('');
    const [newUsername, setNewUsername] = useState(username);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const navigate = useNavigate();

    const handleProfileUpdate = (e) => {
        e.preventDefault();
        // Add your profile update logic here
        console.log({ name, newUsername, oldPassword, newPassword, profilePicture });
        navigate(`/profile/${newUsername}`);
    };

    const handleProfilePictureChange = (e) => {
        const file = e.target.files[0];
        setProfilePicture(file);
    };

    return (

        <div className="min-h-screen bg-gray-100">
        
            <Navbar />
            
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            
                <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
            
                    <h2 className="text-2xl font-bold mb-6 text-center">Profile Settings</h2>
                    <form onSubmit={handleProfileUpdate}>

                        <div className="mb-4 text-center">
                            <label htmlFor="profilePicture">
                                {profilePicture ? (
                                <img
                                    src={URL.createObjectURL(profilePicture)}
                                    alt="Profile"
                                    className="w-28 h-28 rounded-full mx-auto"
                                />
                                ) : (
                                <FaUserCircle className="text-7xl text-gray-600 mx-auto" />
                                )}
                            </label>
                            <input
                                id="profilePicture"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleProfilePictureChange}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700">Update Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                                placeholder="Enter your name"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700">Update Username</label>
                            <input
                                type="text"
                                value={newUsername}
                                onChange={(e) => setNewUsername(e.target.value)}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                                placeholder="Enter your username"
                            />
                        </div>

                        <div className="mb-4 relative">
                            <label className="block text-gray-700">Old Password</label>
                            <input
                                type={showOldPassword ? 'text' : 'password'}
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                                placeholder="Enter your old password"
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-3 flex items-center text-gray-600"
                                onClick={() => setShowOldPassword(!showOldPassword)}
                            >
                                {showOldPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>

                        <div className="mb-4 relative">

                            <label className="block text-gray-700">New Password</label>
                            <input
                                type={showNewPassword ? 'text' : 'password'}
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                                placeholder="Enter your new password"
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-3 flex items-center text-gray-600"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                            >
                                {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>

                        </div>

                        <div className="mb-4 flex justify-between items-center">
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                        >
                            Update Profile
                        </button>
                        </div>

                    </form>

                </div>
                
            </div>
        </div>
    );
};

export default ProfileUpdate;