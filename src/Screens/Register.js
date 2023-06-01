import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
// Components.
import Navbar from "../Components/Navbar"
import Footer from "../Components/Footer"

const Register = () => {

    const navigate = useNavigate();
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // REGISTER_USER_FUNCTION
    const registerUser = async () => {
        const response = await fetch('http://localhost:5000/users/register', {
            method: 'POST',
            body: JSON.stringify({ fullname, email, password }),
            headers: { "Content-Type": "application/json" }
        })
        const userDoc = await response.json()
        if (userDoc.message === "Success") {
            console.log("userDoc => ", userDoc.message);
            navigate('/login')
        } else {
            console.log("userDoc => ", userDoc.message);
            alert("Invalid Credentials")
        }
    };

    return (
        <>
            <Navbar />
            <section className="text-gray-600 body-font relative">
                <div className="absolute inset-0 bg-zinc-600"></div>
                <div className="container px-5 py-12 mx-auto flex">
                    <div className="lg:w-1/3 md:w-1/2 bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md mx-auto">
                        <h2 className="text-gray-900 text-2xl font-semibold mb-4">Create and account</h2>
                        <div className="relative mb-4">
                            <label htmlFor="fullname" className="leading-7 text-sm text-gray-900">Fullname</label>
                            <input
                                type="fullname"
                                id="fullname"
                                name="fullname"
                                placeholder="Your name"
                                value={fullname}
                                onChange={(e) => { setFullname(e.target.value) }}
                                className="w-full bg-white rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            />
                        </div>
                        <div className="relative mb-4">
                            <label htmlFor="email" className="leading-7 text-sm text-gray-900">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="name@company.com"
                                value={email}
                                onChange={(e) => { setEmail(e.target.value) }}
                                className="w-full bg-white rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            />
                        </div>
                        <div className="relative mb-4">
                            <label htmlFor="password" className="leading-7 text-sm text-gray-900">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => { setPassword(e.target.value) }}
                                className="w-full bg-white rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            />
                        </div>
                        <button onClick={registerUser} className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded-lg text-lg mb-4">Create an account</button>
                        <p className="text-sm font-normal text-gray-500 dark:text-gray-400 ">
                            Already have an account? <Link to={"/login"} className="font-normal text-indigo-600 hover:text-indigo-600 hover:underline dark:text-primary-500">Log In</Link>
                        </p>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default Register;