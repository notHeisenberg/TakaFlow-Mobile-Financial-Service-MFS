import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root";
import Errorpage from "../Pages/Error/ErrorPage";
import HomePage from "../Pages/Home/HomePage";
import Drawer from "@/Components/Drawer/Drawer";
import SignUp from "@/Pages/SignUp/SignUp";
import Login from "@/Pages/Login/Login";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <Errorpage />,
        children: [
            {
                path: "/",
                element: <HomePage />
            },
            {
                path: "/login",
                element: <Login/>
            },
            {
                path: "/register",
                element: <SignUp />
            },
            {
                path: "/dashboard",
                element: <Drawer/>,
                children: [
                    // user related paths
                    {
                        path: "user-profile",
                        element: <></>
                    },
                    {
                        path: "user-transactions",
                        element: <></>
                    },
                    {
                        path: "send-money",
                        element: <></>
                    },
                    {
                        path: "cash-out",
                        element: <></>
                    },
                    {
                        path: "cash-in",
                        element: <></>
                    },
                    // Agent related paths
                    {
                        path: "agent-profile",
                        element: <></> // Missing element property fixed
                    },
                    {
                        path: "manage-transaction",
                        element: <></>
                    },
                    {
                        path: "agent-transactions",
                        element: <></>
                    },
                    // Admin related paths
                    {
                        path: "admin-profile",
                        element: <></>
                    },
                    {
                        path: "manage-users",
                        element: <></>
                    },
                    {
                        path: "all-transactions",
                        element: <></>
                    }
                ]
            },
        ]
    }
]);

export default router;