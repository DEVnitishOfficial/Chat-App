import { Suspense, lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";

// layouts
import DashboardLayout from "../layouts/dashboard";
import MainLayout from "../layouts/main";

// config
import { DEFAULT_PATH } from "../config";
import LoadingScreen from "../components/LoadingScreen";
import Verify from "../pages/auth/Verify";

const Loadable = (Component) => (props) => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path:"/auth",
      element:<MainLayout />,
      children:[
        {element:<LoginPage />, path:"login"},
        {element:<RegisterPage />, path:"register"},
        {element:<ResetPasswordPage />, path:"reset-password"},
        {element:<NewPasswordPage />, path:"new-password"},
        {element:<VerifyEmail />, path:"verify-email"}
      ]
    },
    {
      path: "/",
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to={DEFAULT_PATH} replace />, index: true },
        // handle app route
        { path: "app", element: <GeneralApp /> },
        // handle setting route
        {path:"settings",element:<Settings />},
        
        { path: "404", element: <Page404 /> },
        { path: "group", element: <GroupPage /> },
        {path: "call", element: <CallPage />},
        {path: "profile", element: <ProfilePage />},
        { path: "*", element: <Navigate to="/404" replace />},
      ],
    },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}

const GeneralApp = Loadable(
  lazy(() => import("../pages/dashboard/GeneralApp")),
);
const Settings = Loadable(
  lazy(() => import("../pages/dashboard/Settings")),
);
const Page404 = Loadable(lazy(() => import("../pages/Page404")));
const GroupPage = Loadable(lazy(() => import("../pages/dashboard/Group")));
const CallPage = Loadable(lazy(() => import("../pages/dashboard/Call")))
const ProfilePage = Loadable(lazy(() => import("../pages/dashboard/Profile")))

const LoginPage = Loadable(
  lazy(() => import("../pages/auth/Login"))
)
const RegisterPage = Loadable(
  lazy(() => import("../pages/auth/Register"))
)
const ResetPasswordPage = Loadable(
  lazy(() => import("../pages/auth/ResetPassword"))
)
const NewPasswordPage = Loadable(
  lazy(() => import("../pages/auth/NewPassword"))
)
const VerifyEmail = Loadable(
  lazy(() => import("../pages/auth/Verify"))
)
