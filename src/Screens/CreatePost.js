import React, { useState } from 'react'
import { Navigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Components.
import Navbar from "../Components/Navbar"
import Footer from "../Components/Footer"

const CreatePost = () => {

    /* (token) */
    const token = JSON.parse(localStorage.getItem('UserInfo')).token;
    const authToken = token;

    // States.
    const [redirect, setRedirect] = useState(false);
    const [title, setTitle] = useState("");
    const [summary, setSummary] = useState("");
    const [image, setImage] = useState();
    const [category, setCategory] = useState("");
    const [content, setContent] = useState("");

    // Image Upload Function.
    const imageUpload = async (picture) => {
        if (picture === undefined) {
            toast.error('Please Select an Image!', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        };
        if (picture.type === "image/jpeg" || picture.type === "image/png") {
            const data = new FormData();
            data.append("file", picture);
            data.append("upload_preset", "ms-blog");
            data.append("cloud_name", "md-shahzaib");
            const imageRes = await fetch("https://api.cloudinary.com/v1_1/md-shahzaib/image/upload", {
                method: "POST",
                body: data,
            })
            const imgInfo = await imageRes.json();
            setImage(imgInfo.url.toString());
            toast.success('Image Upload Successfully', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } else {
            toast.error('Image! Upload Error', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    };

    // Create-Post.
    const createPost = async () => {
        const response = await fetch('http://localhost:5000/blogs/addblog', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify({ title, summary, image, category, content })
        })
        const postDoc = await response.json()
        if (postDoc.message === "Success") {
            setRedirect(true);
            toast.success('Post Created Successfully', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } else {
            toast.error('Some Error Occuerd', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
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
            <ToastContainer
                position="top-right"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
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
                    onChange={(e) => { imageUpload(e.target.files[0]) }}
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