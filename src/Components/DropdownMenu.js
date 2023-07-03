import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const DropdownMenu = ({ userName, userEmail, logout }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);
    return (
        <div className="relative inline-block text-left">
            <button type="button" className="inline-flex items-center bg-gray-300 border-0 py-1 px-3 focus:outline-none hover:bg-gray-400 hover:text-slate-100 rounded text-base" onClick={toggleMenu}>
                <span className='font-medium'>{userName}</span>
                <svg className="w-4 h-4 ml-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
            {isOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        <div role="menuitem" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 border-b cursor-pointer">
                            <span>Signed in as</span><br />
                            <span className='font-medium'>{userEmail}</span>
                        </div>
                        <Link to="/" role="menuitem" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">Your profile</Link>
                        <Link to="/" role="menuitem" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">Your blogs</Link>
                        <div onClick={logout} role="menuitem" className="block px-4 py-2 text-sm text-gray-700 font-medium hover:bg-gray-100 hover:text-gray-900 cursor-pointer border-t">Sign out</div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DropdownMenu;