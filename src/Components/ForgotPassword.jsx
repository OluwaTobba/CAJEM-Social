import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { forgotPassword } from '../Services/Api';

function ForgotPassword() {

    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handlePasswordReset = async (e) => {

        e.preventDefault();
        
        try {

            const response = await forgotPassword({ email });
            setMessage(response.message);

        } catch (error) {

            console.error('Password reset failed:', error);

        }

    };

    useEffect(() => {

        if (setMessage) {

            const timer = setTimeout(() => {
                setMessage(false);
            }, 3000);

            return () => clearTimeout(timer);

        }

    }, [message]);

    return (

        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">

            <div className="bg-white p-6 rounded shadow-md w-full max-w-md">

                <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password</h2>

                <form onSubmit={handlePasswordReset}>

                    <div className="mb-4">
                        <label className="block text-gray-700">Email Address:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                            placeholder="Enter your email address"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                    >
                        Send Reset Link
                    </button>

                </form>

                {message && (
                    <div className="mt-4 text-green-600 text-center">
                        {message}
                    </div>
                )}

                <div className="text-center mt-6">
                    <Link to="/login" className="text-blue-600 hover:underline">
                        Login
                    </Link>
                </div>

            </div>

        </div>

    );
}

export default ForgotPassword;