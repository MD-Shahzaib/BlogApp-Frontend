import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar'
import { UserContext } from '../Context/UserContext';
import DropdownMenu from './DropdownMenu';

const Navbar = () => {

    const { user, handleLogout } = useContext(UserContext);
    // Top-Loading-Bar.
    let location = useLocation();
    const [progress, setProgress] = useState(0)
    useEffect(() => setProgress(100), [location]);

    return (
        <>
            <LoadingBar color='#3f51b5' progress={progress} onLoaderFinished={() => setProgress(0)} />
            {/* Navbar */}
            <header className='bg-slate-100'>
                <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center text-gray-600">
                    <Link to={"/"} className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                        </svg>
                        <span className="ml-3 text-xl">MS-BLOG</span>
                    </Link>
                    <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
                        {!user ?
                            <>
                                <Link to={"/login"} className="mr-5 hover:text-gray-900">Login</Link>
                                <Link to={"/register"} className="mr-5 hover:text-gray-900">Register</Link>
                            </>
                            :
                            <>
                                <Link to={"/createPost"} className="hover:text-gray-900">
                                    <button className="inline-flex items-center bg-gray-300 border-0 py-1 px-3 focus:outline-none hover:bg-gray-400 hover:text-slate-100 rounded text-base">Create New Post <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"></path></svg></button>
                                    {/* Create New Post */}
                                </Link>
                                <Link to={"/contact"}>
                                    <button className="inline-flex items-center bg-gray-300 border-0 py-1 px-3 focus:outline-none hover:bg-gray-400 hover:text-slate-100 rounded text-base mx-3">Join Us <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"></path></svg></button>
                                </Link>
                                <DropdownMenu userName={user?.fullname} userEmail={user?.email} logout={handleLogout} />
                            </>
                        }
                    </nav>
                </div>
            </header>
        </>
    )
}

export default Navbar;