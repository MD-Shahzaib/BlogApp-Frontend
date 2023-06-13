import React, { useState } from 'react'
import { Navigate } from 'react-router-dom';
// ReactQuill.
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
// React-Toastify.
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Components.
import Navbar from "../Components/Navbar"
import Footer from "../Components/Footer"

const CreatePost = () => {

    // GRAB (TOKEN/_id).
    const token = JSON.parse(localStorage.getItem('UserInfo')).token;
    const userId = token._id;
    const authToken = token.tokens.slice(-1);

    // States.
    const [redirect, setRedirect] = useState(false);
    const [title, setTitle] = useState("");
    const [summary, setSummary] = useState("");
    const [image, setImage] = useState();
    const [category, setCategory] = useState("");
    const [content, setContent] = useState("");

    // Image Detail Function.
    const imageDetail = (picture) => {
        console.log("picture =>", picture);
        if (picture === undefined) {
            toast.error('Picture Error', {
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
            toast.success('Nice Picture', {
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

        if (picture.type === "image/jpeg" || picture.type === "image/png") {
            const data = new FormData();
            data.append("file", picture);
            data.append("upload_preset", "ms-blog");
            data.append("cloud_name", "md-shahzaib");
            // fetch("https://api.cloudinary.com/v1_1/piyushproj/image/upload", {
            // fetch("https://api.cloudinary.com/v1_1/md-shahzaib", {
            fetch("https://api.cloudinary.com/v1_1/md-shahzaib/image/upload", {
                method: "POST",
                body: data,
            })
                .then((res) => res.json())
                .then((data) => {
                    setImage(data.url.toString());
                    console.log(data.url.toString());
                })
                .catch((error) => {
                    console.log("error ===> ", error);
                });
        } else {
            toast({
                title: "Please Select an Image!",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
        }

        /*
        access_mode:"public"
        asset_id:"a592f2be56d25e82617d819333c6f998"
        bytes:577431
        created_at:"2023-06-12T20:20:37Z"
        etag:"1316bce6b652f27d28b49af1449b15fb"
        folder:""
        format:"png"
        height:536
        original_filename:"20200830_121734"
        placeholder:false
        public_id:"dnkgshscgcif4urwwkco"
        resource_type:"image"
        secure_url:"https://res.cloudinary.com/md-shahzaib/image/upload/v1686601237/dnkgshscgcif4urwwkco.png"
        signature:"8e3721eeeb666a40f6178d6d31f6ab55d260b6d8"
        tags:[]
        type:"upload"
        url:"http://res.cloudinary.com/md-shahzaib/image/upload/v1686601237/dnkgshscgcif4urwwkco.png"
        version:1686601237
        version_id:"62f43df52dfa515930db31462306d2db"
        width:720
        */

    };

    // Create-Post.
    const createPost = async () => {
        const response = await fetch('http://localhost:5000/blogs/addblog', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify({ title, summary, image, category, content, author: userId })
        })
        const postDoc = await response.json()
        if (postDoc.message === "Success") {
            setRedirect(true);
            alert("postDoc Success");
        } else {
            console.log(postDoc);
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
                    // value={image}
                    // onChange={(e) => { setImage(e.target.value) }}
                    onChange={(e) => { imageDetail(e.target.files[0]) }}
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