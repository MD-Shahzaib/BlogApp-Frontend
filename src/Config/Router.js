// PROTECTED ROUTE.
import { useEffect, useState } from 'react'
// Import-Router-Components.
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route, Navigate } from "react-router-dom"

// Screens.
import Home from "../Screens/Home"
import Login from "../Screens/Login"
import Register from "../Screens/Register"
import Profile from "../Screens/Profile"
import CreatePost from "../Screens/CreatePost"
import Contact from "../Screens/Contact"
import Article from '../Screens/Article'

export default function Router() {

    // Protected-Routing-Method.
    const [user, setUser] = useState(false)
    useEffect(() => {
        const token = localStorage.getItem("UserToken")
        if (token) { setUser(true) }
    }, [])

    // ALL-ROUTES.
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
                <Route path="/article/:id" element={
                    <ProtectedRoute
                        user={user}
                        route={<Article />}
                        navigateTo='/login' />}
                />
            </>
        )
    )
    return <RouterProvider router={router} />
};

// Protected-Route-Component.
function ProtectedRoute({ user, route, navigateTo }) {
    return user ? route : <Navigate to={navigateTo} replace={true} />
};

// */
// PROTECTED ROUTE.