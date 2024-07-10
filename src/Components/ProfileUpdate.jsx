import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaUserCircle, FaEye, FaEyeSlash } from 'react-icons/fa';
import Navbar from './Navbar';
import { updateProfile, fetchUserProfile } from '../Services/Api';

function ProfileUpdate() {

    const { username } = useParams();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [newUsername, setNewUsername] = useState(username);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {

        const fetchProfileData = async () => {

            try {

                const response = await fetchUserProfile();

                if (response.success) {

                    setFirstName(response.first_name);
                    setLastName(response.last_name);
                    setNewUsername(response.username);

                    if (response.profile_picture) {
                        setProfilePicture(response.profile_picture);
                    }
                    
                } else {
                    alert(response.message);
                }

            } catch (error) {
                console.error(error);
            }

        };

        fetchProfileData();

    }, []);

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('username', newUsername);
        formData.append('old_password', oldPassword);
        formData.append('new_password', newPassword);

        if (profilePicture) {
            formData.append('profile_picture', profilePicture);
        }

        try {

            const response = await updateProfile(formData);

            if (response.success) {
                navigate(`/profile/${newUsername}`);
            } else {
                alert(response.message);
            }

        } catch (error) {
            console.error(error);
        }
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
                                    alt="Profile Image"
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
                            <label className="block text-gray-700">Full Name</label>
                            <input
                                type="text"
                                value={`${firstName} ${lastName}`}
                                readOnly
                                className="w-full px-4 py-2 border rounded-md bg-gray-200 cursor-not-allowed"
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
                                className="mt-6 absolute inset-y-0 right-3 flex items-center text-gray-600"
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
                                className="mt-6 absolute inset-y-0 right-3 flex items-center text-gray-600"
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