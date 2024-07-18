import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root";
import Errorpage from "../Pages/Error/ErrorPage";
import HomePage from "../Pages/Home/HomePage";
import Drawer from "@/Components/Drawer/Drawer";
import SignUp from "@/Pages/SignUp/SignUp";
import Login from "@/Pages/Login/Login";
import PrivateRoute from "./PrivateRoute";
import UserRoute from "./UserRoute";
import UserProfile from "@/Pages/Dashboard/User/UserProfile";
import UserTransactions from "@/Pages/Dashboard/User/UserTransactions";
import SendMoney from "@/Pages/Dashboard/User/SendMoney";
import CashOut from "@/Pages/Dashboard/User/CashOut";
import CashIN from "@/Pages/Dashboard/User/CashIN";
import AgentRoute from "./AgentRoute";
import AgentProfile from "@/Pages/Dashboard/Agent/AgentProfile";
import ManageTransaction from "@/Pages/Dashboard/Agent/ManageTransaction";
import AgentTransactions from "@/Pages/Dashboard/Agent/AgentTransactions";
import AdminRoute from "./AdminRoute";
import AdminProfile from "@/Pages/Dashboard/Admin/AdminProfile";
import ManageUsers from "@/Pages/Dashboard/Admin/ManageUsers";
import AllTransactoons from "@/Pages/Dashboard/Admin/AllTransactoons";

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
                element: <Login />
            },
            {
                path: "/register",
                element: <SignUp />
            },
            {
                path: "/dashboard",
                element: <PrivateRoute><Drawer /></PrivateRoute>,
                children: [
                    // user related paths
                    {
                        path: "user-profile",
                        element: <UserRoute><UserProfile></UserProfile></UserRoute>
                    },
                    {
                        path: "user-transactions",
                        element: <UserRoute><UserTransactions></UserTransactions></UserRoute>
                    },
                    {
                        path: "send-money",
                        element: <UserRoute><SendMoney></SendMoney></UserRoute>
                    },
                    {
                        path: "cash-out",
                        element: <UserRoute><CashOut></CashOut></UserRoute>
                    },
                    {
                        path: "cash-in",
                        element: <UserRoute><CashIN></CashIN></UserRoute>
                    },
                    {
                        path: "user-transactions",
                        element: <UserRoute><UserTransactions></UserTransactions></UserRoute>
                    },
                    // Agent related paths
                    {
                        path: "agent-profile",
                        element: <AgentRoute><AgentProfile></AgentProfile></AgentRoute>
                    },
                    {
                        path: "manage-transaction",
                        element: <AgentRoute><ManageTransaction></ManageTransaction></AgentRoute>
                    },
                    {
                        path: "agent-transactions",
                        element: <AgentRoute><AgentTransactions></AgentTransactions></AgentRoute>
                    },
                    // Admin related paths
                    {
                        path: "admin-profile",
                        element: <AdminRoute><AdminProfile></AdminProfile></AdminRoute>
                    },
                    {
                        path: "manage-users",
                        element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>
                    },
                    {
                        path: "all-transactions",
                        element: <AdminRoute><AllTransactoons></AllTransactoons></AdminRoute>
                    }
                ]
            },
        ]
    }
]);

export default router;