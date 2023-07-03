// // src/components/CreatePost.js
// import React, { useState, useContext } from 'react';
// import { BlogContext } from '../context/BlogContext';
// import axios from 'axios';

// const CreatePost = () => {
//   const [title, setTitle] = useState('');
//   const [content, setContent] = useState('');
//   const { setBlogPosts } = useContext(BlogContext);

//   const handleSubmit = async e => {
//     e.preventDefault();

//     try {
//       const response = await axios.post(
//         '/api/blogposts',
//         { title, content },
//         {
//           headers: {
//             Authorization: localStorage.getItem('token'),
//           },
//         }
//       );

//       setBlogPosts(prevPosts => [response.data, ...prevPosts]);

//       setTitle('');
//       setContent('');
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div>
//       <h1>Create a new blog post</h1>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Title"
//           value={title}
//           onChange={e => setTitle(e.target.value)}
//         />
//         <textarea
//           placeholder="Content"
//           value={content}
//           onChange={e => setContent(e.target.value)}
//         />
//         <button type="submit">Create Post</button>
//       </form>
//     </div>
//   );
// };

// export default CreatePost;









// // src/index.js
// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';
// import axios from 'axios';

// axios.defaults.baseURL = 'http://localhost:5000';

// ReactDOM.render(<App />, document.getElementById('root'));







// // ________________________________________________________________.








// // Sure! To create a context for user authentication, you can modify the existing BlogContext.js file to include user-related state and functions. Here's an updated version of the BlogContext.js file that includes user context:

// // src/context/BlogContext.js
// import React, { createContext, useState, useEffect } from 'react';
// import axios from 'axios';

// export const BlogContext = createContext();

// export const BlogContextProvider = ({ children }) => {
//   const [blogPosts, setBlogPosts] = useState([]);
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const fetchBlogPosts = async () => {
//       try {
//         const response = await axios.get('/api/blogposts');
//         setBlogPosts(response.data);
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     fetchBlogPosts();
//   }, []);

//   useEffect(() => {
//     const fetchUser = async () => {
//       const token = localStorage.getItem('token');

//       if (token) {
//         try {
//           const response = await axios.get('/api/user', {
//             headers: {
//               Authorization: token,
//             },
//           });

//           setUser(response.data);
//         } catch (error) {
//           console.log(error);
//           setUser(null);
//         }
//       } else {
//         setUser(null);
//       }
//     };

//     fetchUser();
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     setUser(null);
//   };

//   return (
//     <BlogContext.Provider value={{ blogPosts, setBlogPosts, user, handleLogout }}>
//       {children}
//     </BlogContext.Provider>
//   );
// };








// // In this updated code, we added a new state variable user and a function handleLogout to handle user authentication and logout. The useEffect hook is used to check for the user's token in local storage and fetch user data from the backend if the token is valid.

// // Make sure to update the components that require user authentication to use the user state and the handleLogout function. For example, you can update the Home.js component as follows:

// // src/components/Home.js
// import React, { useContext } from 'react';
// import { BlogContext } from '../context/BlogContext';

// const Home = () => {

//   const { blogPosts, user, handleLogout } = useContext(BlogContext);

//   return (
//     <div>
//       <h1>Blog Posts</h1>
//       {user ? (
//         <button onClick={handleLogout}>Logout</button>
//       ) : (
//         <div>
//           <a href="/login">Login</a> | <a href="/register">Register</a>
//         </div>
//       )}
//       {blogPosts.map(blogPost => (
//         <div key={blogPost._id}>
//           <h2>{blogPost.title}</h2>
//           <p>{blogPost.content}</p>
//           <hr />
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Home;

// // ________________________________________________________________.