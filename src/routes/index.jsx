import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import MainLayout from "../components/layout/MainLayout";
import DashboardPage from "../pages/dashboardpage"
import RegisterPage from "../pages/registerpage";
import ForgotPassword from "../pages/forgotpassword";
import LoginPage from "../pages/loginpage";
import MenuItem from "../pages/menuitem";
import InboxPage from "../pages/inboxpage";
import NotificationPage from "../pages/notificationpage";
import Pilgrim360 from "../pages/pilgrim360";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        children: [
            {
                index: true,
                element: <LoginPage />
            },
            {
                path:"dashboard",
                element: <MainLayout />,
                children:[
                    {
                        index: true,
                        element: <DashboardPage />
                    }
                ]
            },
            {
                path:"menuitem",
                element: <MainLayout />,
                children:[
                    {
                        index: true,
                        element: <MenuItem />
                    }
                ]
            },
            {
                path:"inbox",
                element: <MainLayout />,
                children:[
                    {
                        index: true,
                        element: <InboxPage />
                    }
                ]
            },
            {
                path:"notification",
                element: <MainLayout />,
                children:[
                    {
                        index: true,
                        element: <NotificationPage />
                    }
                ]
            },
            {
                path:"pilgrim360",
                element: <MainLayout />,
                children:[
                    {
                        index: true,
                        element: <Pilgrim360 />
                    }
                ]
            },
            {
                path:"register",
                element: <RegisterPage />,
            },
            {
                path:"forgotpassword",
                element: <ForgotPassword />,
            }
        ]
    }
]);