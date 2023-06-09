import React, { useState } from 'react'
import { Navigate } from 'react-router-dom';
// ReactQuill.
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
// Components.
import Navbar from "../Components/Navbar"
import Footer from "../Components/Footer"

const CreatePost = () => {

    const [title, setTitle] = useState("");
    const [summary, setSummary] = useState("");
    const [file, setFile] = useState("");
    const [category, setCategory] = useState("");
    const [content, setContent] = useState("");

    // Create-Post.
    const createPost = async () => {
        const response = await fetch('http://localhost:5000/blogs/addblog', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, summary, file, category, content })
        })
        const postDoc = await response.json()
        console.log(title, summary, file, category, content);
        if (postDoc.message === "Success") {
            alert("postDoc Success");
            Navigate('/')
        } else {
            alert("postDoc Error");
        }
    };

    // MODULES.
    const modules = { toolbar: [[{ 'header': [1, 2, false] }], ['bold', 'italic', 'underline', 'strike', 'blockquote'], [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }], ['link', 'image'], ['clean']] }
    // FORMATS.
    const formats = ['header', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'list', 'bullet', 'indent', 'link', 'image']

    return (
        <>
            <Navbar />
            <div className='container mx-auto flex flex-col p-5'>
                <h1 className='text-2xl text-slate-500 border-slate-500 border-b-2 font-semibold mb-5 mx-auto'>Create Your New Post</h1>
                <input
                    type="text"
                    className='border-slate-500 border rounded p-1 mb-2'
                    placeholder='Title'
                    value={title}
                    onChange={(e) => { setTitle(e.target.value) }}
                />
                <input
                    type="text"
                    className='border-slate-500 border rounded p-1 mb-2'
                    placeholder='Summary'
                    value={summary}
                    onChange={(e) => { setSummary(e.target.value) }}
                />
                <input
                    type="file"
                    className='border-slate-500 border rounded p-1 mb-2'
                    value={file}
                    onChange={(e) => { setFile(e.target.value) }}
                />
                <select
                    className='border-slate-500 border rounded p-1 mb-2'
                    value={category}
                    onChange={(e) => { setCategory(e.target.value) }}
                >
                    <option>Select Article Category...</option>
                    <option>Programming</option>
                    <option>Development</option>
                    <option>IT</option>
                </select>
                <ReactQuill
                    className='border-slate-500 border rounded p-1 mb-2'
                    theme="snow"
                    formats={formats}
                    modules={modules}
                    value={content}
                    onChange={setContent}
                />
                <button onClick={createPost} className='bg-gray-400 hover:bg-gray-500 rounded p-2 text-lg font-semibold'>Create Post</button>
            </div>
            <Footer />
        </>
    )
}

export default CreatePost;