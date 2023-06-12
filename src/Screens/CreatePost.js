import React, { useState } from 'react'
import { Navigate } from 'react-router-dom';
// ReactQuill.
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
// Components.
import Navbar from "../Components/Navbar"
import Footer from "../Components/Footer"

const CreatePost = () => {

    const [redirect, setRedirect] = useState(false);
    const [title, setTitle] = useState("");
    const [summary, setSummary] = useState("");
    const [image, setImage] = useState();
    const [category, setCategory] = useState("");
    const [content, setContent] = useState("");

    // TOKEN
    const token = JSON.parse(localStorage.getItem('UserToken')).token

    // Create-Post.
    const createPost = async () => {
        const response = await fetch('http://localhost:5000/blogs/addblog', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                title,
                summary,
                image,
                category,
                content,
                // Grab (decoded._id) and 👇👇 send to body
                author: '64785268e9fbcd03c6464d8a'
            })
        })
        const postDoc = await response.json()
        if (postDoc.message === "Success") {
            setRedirect(true);
            alert("postDoc Success");
        } else {
            console.log(postDoc.error);
            alert("postDoc Error");
        }
    };

    // Redirect.
    if (redirect) {
        return <Navigate to='/' />
    }

    // MODULES.
    const modules = { toolbar: [[{ 'header': [1, 2, false] }], ['bold', 'italic', 'underline', 'strike', 'blockquote'], [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }], ['link', 'image'], ['clean']] }
    // FORMATS.
    const formats = ['header', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'list', 'bullet', 'indent', 'link', 'image']

    return (
        <>
            <Navbar />
            <div className='container mx-auto flex flex-col p-5'>
                <h1 className='text-2xl font-semibold mb-5 mx-auto'>Create Your New Post</h1>
                <input
                    type="text"
                    className='border-black border rounded p-1 mb-2'
                    placeholder='Title'
                    value={title}
                    onChange={(e) => { setTitle(e.target.value) }}
                />
                <input
                    type="text"
                    className='border-black border rounded p-1 mb-2'
                    placeholder='Summary'
                    value={summary}
                    onChange={(e) => { setSummary(e.target.value) }}
                />
                <input
                    type="file"
                    className='border-black border rounded p-1 mb-2'
                    value={image}
                    onChange={(e) => { setImage(e.target.value) }}
                />
                <select
                    className='border-black border rounded p-1 mb-2'
                    value={category}
                    onChange={(e) => { setCategory(e.target.value) }}
                >
                    <option>Select Article Category...</option>
                    <option>Programming</option>
                    <option>Development</option>
                    <option>IT</option>
                </select>
                <ReactQuill
                    className='border-black border rounded p-1 mb-2'
                    theme="snow"
                    formats={formats}
                    modules={modules}
                    value={content}
                    onChange={setContent}
                />
                <button onClick={createPost} className='bg-black hover:bg-gray-900 text-white rounded p-2 text-lg font-semibold'>Create Post</button>
            </div>
            <Footer />
        </>
    )
}

export default CreatePost;