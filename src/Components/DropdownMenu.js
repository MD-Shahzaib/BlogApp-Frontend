import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const DropdownMenu = ({ userName, userEmail, logout }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="relative inline-block text-left mx-5">
            <button type="button" className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600" onClick={toggleMenu}>
                {userName}
            </button>
            {isOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        <Link to="/"
                            role="menuitem"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 border-b"
                        >
                            <span>Signed in as</span><br />
                            <span className='font-medium'>{userEmail}</span>
                        </Link>
                        <Link
                            to="/"
                            role="menuitem"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        >
                            Your profile
                        </Link>
                        <Link
                            to="/"
                            role="menuitem"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        >
                            Your blogs
                        </Link>
                        <div
                            onClick={logout}
                            role="menuitem"
                            className="block px-4 py-2 text-sm text-gray-700 font-medium hover:bg-gray-100 hover:text-gray-900 cursor-pointer border-t"
                        >
                            Sign out
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DropdownMenu;