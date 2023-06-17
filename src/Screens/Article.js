import React, { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom';
// Components.
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const Article = () => {

    const { id } = useParams();
    const [article, setArticle] = useState({});
    const [redirect, setRedirect] = useState(false);

    // GRAB (TOKEN/_id).
    const token = JSON.parse(localStorage.getItem('UserInfo')).token;
    const userId = token._id;
    const authToken = token.tokens.slice(-1);

    // Destructuring-Article.
    const { author, title, summary, category, image, createdAt, content } = article;

    // Fetch-Single-Blog.
    const fetchSingleBlog = async () => {
        try {
            const response = await fetch(`http://localhost:5000/blogs/getblog/${id}`, {
                headers: { Authorization: `Bearer ${authToken}` }
            });
            const singleBlog = await response.json();
            if (singleBlog.message === "Success") {
                setArticle(singleBlog.data);
            } else {
                alert(singleBlog.message);
                setRedirect(true);
            }
        } catch (error) {
            alert(error.message);
        }
    }

    useEffect(() => {
        fetchSingleBlog();
    }, []);

    // CREATE DATE FORMATER.
    let createdAt_Date = new Date(createdAt)
    const options = { weekday: "long", month: "long", day: "numeric", year: "numeric", hour: "numeric", };
    const currentDate = (createdAt_Date.toLocaleDateString("en-US", options));

    // Delete-Post-Function.
    const deletePost = async () => {
        const response = await fetch(`http://localhost:5000/blogs/deleteBlog/${id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${authToken}` }
        });
        const deleteBlog = await response.json();
        if (deleteBlog.message === "Success") {
            alert('Post Deleted Successfully');
            setRedirect(true);
        } else {
            alert('Some Error Occuerd');
        }
    }

    // Redirect.
    if (redirect) {
        return <Navigate to="/" />
    }

    return (
        <>
            <Navbar />
            <div className="container p-5 mx-auto flex flex-col text-gray-600">
                <div className="lg:w-4/6 mx-auto">
                    <div className='mb-3 flex justify-center items-center'>
                        {/* ( userId === authorId ? edit/delete-btn : hide-edit/delete-btn ) */}
                        {userId === author?._id && (
                            <>
                                <Link to={`/updatepost/${id}`} className='flex justify-center items-center bg-slate-200 mr-2 p-2 rounded-lg text-slate-800 font-semibold hover:bg-slate-300'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mr-1">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                    </svg>
                                    <span>Edit Post</span>
                                </Link>
                                <div onClick={deletePost} className='flex justify-center items-center bg-slate-200 hover:bg-slate-300 p-2 rounded-lg text-slate-800 font-semibold cursor-pointer'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mr-1">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                    </svg>
                                    <span>Delete Post</span>
                                </div>
                            </>
                        )}
                    </div>
                    <div className="rounded-lg h-64 overflow-hidden">
                        <img src={image} alt="content" className="object-cover object-center h-full w-full" />
                    </div>
                    <div className="flex flex-col sm:flex-row mt-10">
                        <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8">
                            <div className="w-20 h-20 rounded-full inline-flex items-center justify-center bg-gray-200 text-gray-400">
                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10" viewBox="0 0 24 24">
                                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                                    <circle cx="12" cy="7" r="4"></circle>
                                </svg>
                            </div>
                            <div className="flex flex-col items-center text-center justify-center">
                                <h2 className="font-medium title-font mt-4 text-gray-900 text-lg">{author?.fullname}</h2>
                                <p>{author?.email}</p>
                                <div className="w-12 h-1 bg-indigo-500 rounded mt-2 mb-4"></div>
                                <p className="text-base">{summary}</p>
                            </div>
                        </div>
                        <div className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
                            <h1 className='text-2xl text-slate-700 font-semibold'>{title}</h1>
                            <div className='text-sm text-indigo-500 my-1'>
                                <span className='font-bold mr-3'>{category}</span>
                                <span>{currentDate}</span>
                            </div>
                            <p className="leading-relaxed text-lg mb-4" dangerouslySetInnerHTML={{ __html: content }}></p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Article;