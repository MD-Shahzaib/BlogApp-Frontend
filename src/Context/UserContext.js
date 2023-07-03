import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('UserInfo');
            if (token) {
                const authToken = JSON.parse(token).token;
                try {
                    const response = await fetch("http://localhost:5000/users/profile", {
                        headers: { Authorization: `Bearer ${authToken}` },
                    });
                    const userData = await response.json();
                    setUser(userData.data);
                } catch (error) {
                    console.log(error);
                    setUser(null);
                }
            } else {
                setUser(null);
            }
        }
        fetchUser();
    }, []);
    const handleLogout = () => {
        localStorage.removeItem('UserInfo');
        setUser(null);
        window.location.reload();
    };

    return (
        <UserContext.Provider value={{ user, handleLogout }}>
            {children}
        </UserContext.Provider>
    );
};












// src/App.js

// import React from 'react';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import Home from './components/Home';
// import CreatePost from './components/CreatePost';
// import Login from './components/Login';
// import Register from './components/Register';
// import { BlogContextProvider } from './context/BlogContext';
// import { UserContextProvider } from './context/UserContext';

// const App = () => {
//   return (
//     <Router>
//       <UserContextProvider>
//         <BlogContextProvider>
//           <Switch>
//             <Route path="/" exact component={Home} />
//             <Route path="/create" component={CreatePost} />
//             <Route path="/login" component={Login} />
//             <Route path="/register" component={Register} />
//           </Switch>
//         </BlogContextProvider>
//       </UserContextProvider>
//     </Router>
//   );
// };

// export default App;











// src/components/Home.js

// import React, { useContext } from 'react';
// import { BlogContext } from '../context/BlogContext';
// import { UserContext } from '../context/UserContext';

// const Home = () => {
//   const { blogPosts } = useContext(BlogContext);
//   const { user, handleLogout } = useContext(UserContext);

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