import React, { useState } from 'react'
// Components.
import Navbar from "../Components/Navbar"
import Footer from "../Components/Footer"
// ReactQuill.
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CreatePost = () => {

    const [value, setValue] = useState("")

    return (
        <>
            <Navbar />
            <div className='container border mx-auto flex flex-col p-5'>
                <h1>Create Your New Post</h1>
                <input type="text" className='border bg-slate-300' placeholder='Title' />
                <input type="text" className='border bg-slate-300' placeholder='Summary' />
                <input type="file" className='border bg-slate-300' />
                <select className='border bg-slate-300' >
                    <option value="">Programming</option>
                    <option value="">Development</option>
                    <option value="">IT</option>
                </select>
                <ReactQuill theme="snow" value={value} onChange={setValue} />
                <button className='border bg-slate-300' >Create Post</button>
            </div>
            <Footer />
        </>
    )
}

export default CreatePost;