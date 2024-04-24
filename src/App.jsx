import { RouterProvider, createBrowserRouter } from "react-router-dom";

import "./App.css";

import HomePage from "./Pages/Home";
import AuthenticationPage from "./Pages/AuthenticationPage.jsx";
import {
    action as authAction,
    registerAction,
} from "./components/auth/auth.js";
import { action as logoutAction } from "./components/auth/Logout.jsx";
import { userLoader } from "./components/auth/auth.js";
import ErrorPage from "./Pages/Error";
import ReviewAddPage, { reviewAddAction } from "./Pages/Review";
import ThankYouPage from "./Pages/ThankYou";
import DisplayReviewsPage, {
    reviewDisplayLoader,
} from "./Pages/DisplayReviews";
import DisplayUsersPage, { displayUsersLoader } from "./Pages/DisplayUsers";

import QRPage from "./Pages/QRPage.jsx";
import RootLayout from "./Pages/Root";
import ProtectedRoute from "./components/auth/ProtectedRoute.jsx";
import UserInfoPage, { userInfoLoader } from "./Pages/UserInfo.jsx";
import UserPanelPage, { userPanelLoader } from "./Pages/UserPanel";
import { ROLES } from "./components/auth/roles.js";
import RegisterPage from "./Pages/RegisterPage.jsx";
import ThanksForRegistration from "./Pages/ThanksForRegistration.jsx";
import { DarkModeProvider } from "./components/DarkModeProvider.jsx";

export const LOCAL = true;

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        loader: userLoader,
        children: [
            { index: true, element: <HomePage /> },
            {
                path: "auth",
                element: <AuthenticationPage />,
                action: authAction,
            },
            {
                path: "register",
                element: <RegisterPage />,
                action: registerAction,
            },
            {
                path: "logout",
                action: logoutAction,
            },
            {
                path: "thanksRegistration",
                element: <ThanksForRegistration />,
            },
            { path: "thankyou", element: <ThankYouPage /> },
            {
                path: "review/:waiterId",
                element: <ReviewAddPage />,
                action: reviewAddAction,
            },
            {
                path: "qr",
                element: (
                    <ProtectedRoute allowedRoles={[ROLES.ADMIN, ROLES.USER]}>
                        <QRPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: "info",
                element: (
                    <ProtectedRoute allowedRoles={[ROLES.ADMIN, ROLES.USER]}>
                        <UserInfoPage />
                    </ProtectedRoute>
                ),
                loader: userInfoLoader,
            },
            {
                path: "reviewlist",
                element: (
                    <ProtectedRoute>
                        <DisplayReviewsPage />
                    </ProtectedRoute>
                ),
                loader: reviewDisplayLoader,
            },
            {
                path: "userlist",
                element: (
                    <ProtectedRoute>
                        <DisplayUsersPage />
                    </ProtectedRoute>
                ),
                loader: displayUsersLoader,
            },
            {
                path: "userpanel",
                element: (
                    <ProtectedRoute allowedRoles={[ROLES.ADMIN, ROLES.USER]}>
                        <UserPanelPage />
                    </ProtectedRoute>
                ),
                loader: userPanelLoader,
            },
        ],
    },
    {
        path: "review/:waiterId",
        element: <ReviewAddPage />,
        action: reviewAddAction,
    },
    { path: "thankyou", element: <ThankYouPage /> },
]);

export function App() {
    return (
        <DarkModeProvider>
            <RouterProvider router={router} />
        </DarkModeProvider>
    );
}

export default App;
