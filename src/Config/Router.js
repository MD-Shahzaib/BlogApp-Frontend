// Import-Router-Components.
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Screens.
import Home from '../Screens/Home'
import Login from "../Screens/Login";
import Register from "../Screens/Register";

// Import-Router-Components.
const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
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