import React from 'react';
// Components.
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const UserBlogs = () => {
    // Sample data for user blogs
    const blogs = [
        {
            id: 1,
            title: 'My First Blog Post',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ultricies malesuada risus in lacinia.',
            date: '2023-07-01',
        },
        {
            id: 2,
            title: 'Tips for Successful Blogging',
            content: 'Sed dapibus est in metus commodo, vitae convallis purus interdum. Proin vitae dapibus lorem.',
            date: '2023-06-28',
        },
        {
            id: 3,
            title: 'Exploring Nature: A Travel Blog',
            content: 'Vestibulum nec placerat lectus, et dignissim elit. Integer id fermentum massa. Vivamus lobortis purus non tincidunt vestibulum.',
            date: '2023-06-25',
        },
    ];

    return (
        <>
            <Navbar />
            <main className="container mx-auto px-4 py-8">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl font-semibold mb-4">My Blogs ({blogs.length})</h2>
                    {blogs.map((blog) => (
                        <div key={blog.id} className="mb-8 bg-white rounded-md shadow-md p-6">
                            <h2 className="text-2xl font-semibold mb-4">{blog.title}</h2>
                            <p className="text-gray-700 mb-2">{blog.content}</p>
                            <p className="text-gray-500 text-sm">{blog.date}</p>
                        </div>
                    ))}
                </div>
            </main>
            <Footer />
        </>
    );
};

export default UserBlogs;
