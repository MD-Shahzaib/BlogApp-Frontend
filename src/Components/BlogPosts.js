import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
// DATE-FORMATOR.
import { format } from 'date-fns'
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from './Loading';

const BlogPosts = () => {

    // GRAB (TOKEN/_id).
    const token = JSON.parse(localStorage.getItem('UserInfo')).token;
    // const token = JSON.parse(localStorage.getItem('UserInfo'));
    const authToken = token.tokens.slice(-1);

    /* (token) */
    // const token = JSON.parse(localStorage.getItem('UserInfo'));
    // const authToken = token.token;

    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBlogs();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Fetch-All-Blogs Function.
    const fetchBlogs = async () => {
        try {
            const response = await fetch("http://localhost:5000/blogs/getblogs", {
                headers: { Authorization: `Bearer ${authToken}` },
            });
            const allBlogs = await response.json();
            setBlogs(allBlogs.data);
            setLoading(false)
        } catch (error) {
            console.log("error =>", error.message);
        }
    }

    // InfiniteScroll.
    const [count, setCount] = useState(10)
    let allArticles = blogs;
    let initialArticles = blogs.slice(0, count);
    const fetchMoreData = () => {
        setTimeout(() => {
            setCount(count + 10)
            console.log(count);
        }, 1000)
        console.log(count);
    };
    // InfiniteScroll.


    return (
        <>
            {/* Blog-Post-Container */}
            <div className="container p-5 mx-auto text-gray-600">

                {/* Heading */}
                {!blogs || loading
                    ? <h1>Fetching blogs, please wait...</h1>
                    : <h2 className="text-3xl text-blue-800 mb-3 font-semibold">MS-BLOGS ({blogs?.length})</h2>
                }

                {/* Check isBlogExist */}
                {blogs?.length === 0
                    ? <h1>No Blogs exists, Create Articles to display...</h1>
                    : <>

                        {/* InfiniteScroll */}
                        <InfiniteScroll
                            dataLength={initialArticles.length}
                            next={fetchMoreData}
                            hasMore={initialArticles.length !== allArticles.length}
                            loader={<Loading />}
                            endMessage={<h1 className='text-indigo-500 text-center font-semibold'>Looks like you've reached the end ...</h1>}
                        >
                            {initialArticles?.map((item, index) => {
                                // Destructuring-items.
                                const { _id, author, title, summary, category, createdAt, image } = item
                                return (
                                    <div key={_id} className="flex flex-wrap md:flex-nowrap rounded-lg mb-4 shadow-lg hover:bg-slate-100 border">
                                        <div className="md:w-1/4 w-full flex-shrink-0 flex flex-col md:mb-0 mb-2">
                                            <img src={image} className='w-full rounded' alt="Blog-pic" />
                                        </div>
                                        <div className="md:w-3/4 px-2 pb-2">
                                            <h2 className="text-2xl font-medium text-gray-900 title-font mb-1">{title}</h2>
                                            <div className="text-xs">
                                                <span className='text-black font-semibold'>{author?.fullname}</span>
                                                <span className='mx-2 text-slate-600 font-semibold'>{category}</span>
                                                <span>{format(new Date(createdAt), 'MMM d, yyyy h:mm a')}</span>
                                            </div>
                                            <p className="my-1 text-base text-slate-700 hover:text-slate-800">{summary}</p>
                                            <Link to={`/article/${_id}`} className="text-blue-500 hover:text-blue-700 inline-flex items-center text-sm">Learn More
                                                <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M5 12h14"></path>
                                                    <path d="M12 5l7 7-7 7"></path>
                                                </svg>
                                            </Link>
                                        </div>
                                    </div>
                                )
                            })}
                        </InfiniteScroll>
                        {/* InfiniteScroll */}


                        {/* Blog-Post */}
                        {/* {blogs?.map((item, index) => {

                            // Destructuring-items.
                            const { _id, author, title, summary, category, createdAt, image } = item

                            return (
                                <div key={_id} className="flex flex-wrap md:flex-nowrap rounded-lg mb-4 shadow-lg hover:bg-slate-100 border">
                                    <div className="md:w-1/4 w-full flex-shrink-0 flex flex-col md:mb-0 mb-2">
                                        <img src={image} className='w-full rounded' alt="Blog-pic" />
                                    </div>
                                    <div className="md:w-3/4 px-2 pb-2">
                                        <h2 className="text-2xl font-medium text-gray-900 title-font mb-1">{title}</h2>
                                        <div className="text-xs">
                                            <span className='text-black font-semibold'>{author?.fullname}</span>
                                            <span className='mx-2 text-slate-600 font-semibold'>{category}</span>
                                            <span>{format(new Date(createdAt), 'MMM d, yyyy h:mm a')}</span>
                                        </div>
                                        <p className="my-1 text-base text-slate-700 hover:text-slate-800">{summary}</p>
                                        <Link to={`/article/${_id}`} className="text-blue-500 hover:text-blue-700 inline-flex items-center text-sm">Learn More
                                            <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M5 12h14"></path>
                                                <path d="M12 5l7 7-7 7"></path>
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            )
                        })} */}
                    </>
                }
            </div>
        </>
    )
}

export default BlogPosts;