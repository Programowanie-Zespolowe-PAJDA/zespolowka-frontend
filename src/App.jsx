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
import ReviewAddPage, {
    reviewAddAction,
    reviewAddLoader,
} from "./Pages/Review";
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
import { DarkModeProvider } from "./components/DarkModeProvider.jsx";
import ReviewCooldownPage from "./Pages/ReviewCooldown.jsx";

export const LOCAL = false;

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        loader: userLoader,
        children: [
            { index: true, element: <HomePage /> },

            {
                path: "logout",
                action: logoutAction,
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
        path: "register",
        element: <RegisterPage />,
        action: registerAction,
    },
    {
        path: "auth",
        element: <AuthenticationPage />,
        action: authAction,
    },
    {
        path: "/review/:waiterId",
        element: <ReviewAddPage />,
        loader: reviewAddLoader,
        action: reviewAddAction,
    },
    { path: "/cooldown", element: <ReviewCooldownPage /> },
    { path: "/thankyou", element: <ThankYouPage /> },
    {
        path: "/qr",
        element: (
            <ProtectedRoute allowedRoles={[ROLES.ADMIN, ROLES.USER]}>
                <QRPage />
            </ProtectedRoute>
        ),
    },
]);

export function App() {
    return (
        <DarkModeProvider>
            <RouterProvider router={router} />
        </DarkModeProvider>
    );
}

export default App;
