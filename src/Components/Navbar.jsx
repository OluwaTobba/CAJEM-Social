import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

function Navbar() {

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();
    
    const handleDropdownToggle = () => {
        setDropdownOpen(!dropdownOpen);
    };
    
    const handleLogout = (e) => {
        e.preventDefault();
        // Add your logout logic here
        navigate('/login');
        console.log('Logout');
    };

    return (

        <nav className="bg-white shadow-md py-4">

            <div className="container mx-auto flex justify-between items-center px-4">

                <Link to="/home" className="text-xl font-bold text-gray-800">
                    CAJEMSocial
                </Link>

                <div className="relative">

                    <FaUserCircle
                        className="text-3xl text-gray-600 cursor-pointer"
                        onClick={handleDropdownToggle}
                    />

                    {dropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
                        <Link
                            to="/post"
                            className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                        >
                            Make A Post
                        </Link>
                        <Link
                            to="/update-profile"
                            className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                        >
                            Profile Settings
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="w-full text-left block px-4 py-2 text-gray-800 hover:bg-gray-100"
                        >
                            Logout
                        </button>
                        </div>
                    )}

                </div>
            
            </div>

        </nav>

    );
};

export default Navbar;