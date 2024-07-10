import React, { useState } from 'react';
import { registerUser } from '../Services/Api';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaUserCircle } from 'react-icons/fa';

function Register() {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e) => {

        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        const formData = new FormData();
        formData.append('first_name', firstName);
        formData.append('last_name', lastName);
        formData.append('email', email);
        formData.append('username', username);
        formData.append('password', password);
        formData.append('profile_picture', profilePicture);

        try {

            const response = await registerUser(formData);

            if (response.status === 'success') {
                navigate('/home');
            } else {
                alert(response.message);
            }

        } catch (error) {

            console.error(error);
            alert('An error occurred while registering. Please try again.');
        
        }

    };

    const handlePhotoChange = (e) => {
        setProfilePicture(e.target.files[0]);
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
                                    alt="Profile Image"
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
                            required
                        />

                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">First Name</label>
                        <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                            placeholder="Enter your first name"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Last Name</label>
                        <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                            placeholder="Enter your last name"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                            placeholder="Enter your username"
                            required
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
                            required
                        />
                    </div>

                    <div className="mb-4 relative">
                        <label className="block text-gray-700">Confirm Password</label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
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

}

export default Register;