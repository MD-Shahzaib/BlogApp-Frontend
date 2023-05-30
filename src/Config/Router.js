// BASIC ROUTE.
/*
// Import-Router-Components.
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Screens.
import Home from '../Screens/Home'
import Contact from "../Screens/Contact";
import Login from "../Screens/Login";
import Register from "../Screens/Register";

// Import-Router-Components.
const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/contact",
        element: <Contact />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },
]);

// Export-Router-Component.
export default function Router() {
    return (
        <RouterProvider router={router} />
    )
};
*/



















// PROTECTED ROUTE.
import { useEffect, useState } from 'react'
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route, Navigate } from "react-router-dom"

import Home from "../Screens/Home"
import Login from "../Screens/Login"
import Register from "../Screens/Register"
import Profile from "../Screens/Profile"
import CreatePost from "../Screens/CreatePost"
import Contact from "../Screens/Contact"


export default function Router() {

    const [user, setUser] = useState(true)
    // useEffect(() => {
    //     setTimeout(() => {
    //         console.log(user);
    //         setUser(true)
    //     }, 5000)
    // }, [])

    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route path="/" element={
                    <ProtectedRoute
                        user={user}
                        route={<Home />}
                        navigateTo='/login' />}
                />
                <Route path="/login" element={
                    <ProtectedRoute
                        user={!user}
                        route={<Login />}
                        navigateTo='/' />}
                />
                <Route path="/register" element={
                    <ProtectedRoute
                        user={!user}
                        route={<Register />}
                        navigateTo='/' />}
                />
                <Route path="/profile" element={
                    <ProtectedRoute
                        user={user}
                        route={<Profile />}
                        navigateTo='/login' />}
                />
                <Route path="/contact" element={
                    <ProtectedRoute
                        user={user}
                        route={<Contact />}
                        navigateTo='/login' />}
                />
                <Route path="/createpost" element={
                    <ProtectedRoute
                        user={user}
                        route={<CreatePost />}
                        navigateTo='/login' />}
                />

            </>
        )
    )
    return <RouterProvider router={router} />
}

function ProtectedRoute({ user, route, navigateTo }) {
    return user ? route : <Navigate to={navigateTo} replace={true} />
}