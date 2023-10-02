import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import MainLayout from "../components/layout/MainLayout";
import DashboardPage from "../pages/dashboardpage"
import RegisterPage from "../pages/registerpage";
import ForgotPassword from "../pages/forgotpassword";
import LoginPage from "../pages/loginpage";
import NotificationPage from "../pages/notificationpage";
import Pilgrim360 from "../pages/pilgrim360";
import MedicalRecordPage from "../pages/medicalrecordpage";
import HotelPage from "../pages/hotelpage";
import HospitalPage from "../pages/hospitalpage";
import LogisticPage from "../pages/logisticpage";
import Pilgrim from "../pages/pilgrim";

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
                path:"hotel",
                element: <MainLayout />,
                children:[
                    {
                        index: true,
                        element: <HotelPage />
                    }
                ]
            },
            {
                path:"hospital",
                element: <MainLayout />,
                children:[
                    {
                        index: true,
                        element: <HospitalPage />
                    }
                ]
            },
            {
                path:"logistic",
                element: <MainLayout />,
                children:[
                    {
                        index: true,
                        element: <LogisticPage />
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
                path:"pilgrim",
                element: <MainLayout />,
                children:[
                    {
                        index: true,
                        element: <Pilgrim />
                    }
                ]
            },
            {
                path:"medicalrecord",
                element: <MainLayout />,
                children:[
                    {
                        index: true,
                        element: <MedicalRecordPage />
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