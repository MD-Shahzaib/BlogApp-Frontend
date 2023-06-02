import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const BlogPosts = () => {

    // DummyData.
    // const dummydata = [
    //     {
    //         title: 'How to create blog website',
    //         summary: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum ducimus molestiae dignissimos distinctio voluptate, enim, cumque suscipit voluptatem qui corporis quos eos ex esse pariatur!',
    //         author: 'MD-Shahzaib',
    //         category: 'Website',
    //         pic: 'https://myprogrammingblog.com/wp-content/uploads/2016/11/wordpress-ab-testing-plugin-380x228.jpg',
    //         id: "1"
    //     },
    //     {
    //         title: 'How to create blog website',
    //         summary: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum ducimus molestiae dignissimos distinctio voluptate, enim, cumque suscipit voluptatem qui corporis quos eos ex esse pariatur!',
    //         author: 'MD-Shahzaib',
    //         category: 'Website',
    //         pic: 'https://myprogrammingblog.com/wp-content/uploads/2016/11/wordpress-ab-testing-plugin-380x228.jpg',
    //         id: "2"
    //     },
    //     {
    //         email: "test@gmail.com",
    //         fullname: "MD-Shahzaib",
    //         title: "How to create blog website",
    //         summary: "sunasndasdhn sdjagbfgasjf sdfsdjf sdfjsdgfsdfsd fgsdjksdjfvsdbnjdh",
    //         detail: "sunasndasdhn sdjagbfgasjf sdfsdjf sdfjsdgfsdfsd fgsdjksdjfvsdbnjdh sunasndasdhn sdjagbfgasjf sdfsdjf sdfjsdgfsdfsd fgsdjksdjfvsdbnjdh sunasndasdhn sdjagbfgasjf sdfsdjf sdfjsdgfsdfsd fgsdjksdjfvsdbnjdh",
    //         category: "website",
    //         image: "https://dummyimage.com/280x180",
    //         _id: "64797844b2206ac52daeecdb",
    //         createdAt: "2023-06-02T05:04:04.130Z",
    //         updatedAt: "2023-06-02T05:06:09.175Z"
    //     },
    // ];

    const [blogs, setBlogs] = useState([])
    // FetchBlogs Function.
    const fetchBlogs = async () => {
        const response = await fetch("http://localhost:5000/blogs/getblogs");
        const allBlogs = await response.json();
        // setBlogs(allBlogs)
        console.log(allBlogs.data)
        console.log("allBlogs ===>", allBlogs);
        setBlogs(allBlogs.data)
    };
    useEffect(() => {
        fetchBlogs();
    }, []);


    return (
        <>
            {/* Blog-Post-Container */}
            <div className="container p-5 mx-auto text-gray-600">
                {/* <h2 className="text-3xl text-blue-800 mb-2 font-semibold">ALL BLOGS ({dummydata.length})</h2> */}
                <h2 className="text-3xl text-blue-800 mb-2 font-semibold">ALL BLOGS ({blogs.length})</h2>
                {/* Blog-Post */}
                {blogs.map((item, index) => {
                    return (
                        <div key={item._id} className="flex flex-wrap md:flex-nowrap rounded-lg py-2 mb-4 shadow-lg hover:bg-slate-100 border">
                            <div className="md:w-1/4 w-full flex-shrink-0 flex flex-col md:mb-0 mb-2 mx-2">
                                <img src={item.image} className='w-full rounded' alt="Blog-pic" />
                            </div>
                            <div className="md:w-3/4">
                                <h2 className="text-2xl font-medium text-gray-900 title-font mb-1">{item.title}</h2>
                                <div className="text-xs">
                                    <span className='text-black font-semibold'>{item.fullname}</span>
                                    <span className='mx-2 text-slate-600 font-semibold'>{item.category}</span>
                                    <span>12 Jun 2019</span>
                                </div>
                                <p className="my-1 text-base text-slate-700 hover:text-slate-800">{item.summary}</p>
                                <Link to={`/article/${item._id}`} className="text-blue-500 hover:text-blue-700 inline-flex items-center text-sm">Learn More
                                    <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M5 12h14"></path>
                                        <path d="M12 5l7 7-7 7"></path>
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    )
                })}


                {/* {dummydata.map((item, index) => {
                    return (
                        <div key={item.id} className="flex flex-wrap md:flex-nowrap rounded-lg py-2 mb-4 shadow-lg hover:bg-slate-100 border">
                            <div className="md:w-1/4 w-full flex-shrink-0 flex flex-col md:mb-0 mb-2 mx-2">
                                <img src={item.pic} className='w-full rounded' alt="Blog-pic" />
                            </div>
                            <div className="md:w-3/4">
                                <h2 className="text-2xl font-medium text-gray-900 title-font mb-1">{item.title}</h2>
                                <div className="text-xs">
                                    <span className='text-black font-semibold'>{item.author}</span>
                                    <span className='mx-2 text-slate-600 font-semibold'>{item.category}</span>
                                    <span>12 Jun 2019</span>
                                </div>
                                <p className="my-1 text-base text-slate-700 hover:text-slate-800">{item.summary}</p>
                                <Link to={`/article/${item.id}`} className="text-blue-500 hover:text-blue-700 inline-flex items-center text-sm">Learn More
                                    <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M5 12h14"></path>
                                        <path d="M12 5l7 7-7 7"></path>
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    )
                })} */}
            </div>
        </>
    )
}

export default BlogPosts;