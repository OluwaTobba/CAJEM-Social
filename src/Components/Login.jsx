import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../Services/Api';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {

        e.preventDefault();

        try {

            const response = await loginUser({ username, password });

            if (response.success) {
                console.log('Login successful:', response);
                navigate('/home');
            } else {
                setError(response.message);
            }

        } catch (error) {
            console.error('Login error:', error);
            setError('An error occurred during login. Please try again.');
        }

    };

    return (

        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">

            <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Log In</h2>

                <form onSubmit={handleLogin}>

                    <div className="mb-4">
                        <label className="block text-gray-700">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                            placeholder='Enter your username'
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
                            placeholder='Enter your password'
                            required
                        />
                        <button
                            type="button"
                            className="mt-6 absolute inset-y-0 right-3 flex items-center text-gray-600"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>

                    {error && <div className="text-red-500 mb-4">{error}</div>}

                    <div className="mb-4 flex justify-between items-center">
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                        >
                            Log In
                        </button>
                    </div>

                </form>

                <div className="text-center mt-6">
                    <Link to="/forgot-password" className="text-blue-600 hover:underline">
                        Forgotten password?
                    </Link>
                </div>

                <hr className="my-6" />

                <div className="text-center">
                    <Link
                        to="/register"
                        className="bg-green-600 text-white font-bold py-2 px-4 rounded-md hover:bg-green-700"
                    >
                        Create New Account
                    </Link>
                </div>

            </div>

        </div>

    );
    
}

export default Login;