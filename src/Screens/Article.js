import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
// Components.
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const Article = () => {

    const { id } = useParams();
    const [article, setArticle] = useState({});
    // Destructuring-Article.
    const { _id, email, fullname, title, summary, detail, category, image, createdAt, updatedAt } = article;
    // Fetch-Single-Blog.
    const fetchSingleBlog = async () => {
        const response = await fetch(`http://localhost:5000/blogs/getblog/${id}`);
        const singleBlog = await response.json();
        setArticle(singleBlog.data);
    }
    useEffect(() => {
        fetchSingleBlog();
    }, []);

    // CREATE DATE METHOD.
    // /* 
    let dataDate = new Date(createdAt)
    const options = { weekday: "long", day: "numeric", hour: "numeric", minutes: "numeric", month: "long", year: "numeric", time: "numeric" };
    const currentDate = (dataDate.toLocaleDateString("en-US", options));
    let allMethods = [dataDate.getMonth(), dataDate.getMonth(), dataDate.getDate(), dataDate.getFullYear(), dataDate.getHours(), dataDate.getMinutes()];
    let status = 'AM'
    console.log(`${createdAt} | ${allMethods} ${status}`);
    console.log(new Date(createdAt).toLocaleDateString('en-us', { weekday: "long", year: "numeric", month: "short", day: "numeric" }));
    console.log(new Date().toLocaleDateString('en-us', { weekday: "long", year: "numeric", month: "short", day: "numeric" }));
    console.log(dataDate.toLocaleDateString("de-DE", options));
    // */
    // CREATE DATE METHOD

    return (
        <>
            <Navbar />
            <div className="container p-5 mx-auto flex flex-col text-gray-600">
                <div className="lg:w-4/6 mx-auto">
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
                                <h2 className="font-medium title-font mt-4 text-gray-900 text-lg">{fullname}</h2>
                                <div className="w-12 h-1 bg-indigo-500 rounded mt-2 mb-4"></div>
                                <p className="text-base">{summary}</p>
                            </div>
                        </div>
                        <div className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
                            <h1 className='text-2xl text-slate-700 font-semibold'>{title}</h1>
                            <div className='text-sm text-indigo-500 my-1'>
                                <span className='font-bold mr-3'>{category}</span>
                                <span>{createdAt}</span>
                                <span className='mx-5'>|</span>
                                <span>{currentDate}</span>
                            </div>
                            <p className="leading-relaxed text-lg mb-4">{detail}</p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Article;