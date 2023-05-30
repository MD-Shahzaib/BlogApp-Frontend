import React from 'react'
// Components.
import Navbar from "../Components/Navbar"
import BlogPosts from '../Components/BlogPosts'
import Footer from "../Components/Footer"

const Home = () => {
    return (
        <>
            <Navbar />
            <BlogPosts />
            <Footer />
        </>
    )
}

export default Home;