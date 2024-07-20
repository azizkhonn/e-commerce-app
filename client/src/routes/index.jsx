import { useRoutes } from "react-router-dom";
import { lazy } from "react";

import Suspense from '../utils';

const Home = lazy(() => import("./home/Home"));
const Auth = lazy(() => import("./auth/Auth"));
const Login = lazy(() => import("./auth/login/Login"));
const Register = lazy(() => import("./auth/register/Register"));

const RoutController = () => {
  return useRoutes([
    {
      path: "/",
      element: <Suspense><Home /></Suspense>
    },
    {
      path: "auth",
      element: <Suspense><Auth /></Suspense>,
      children: [
        {
          index: true,
          element: <Login />
        },
        {
          path: "login",
          element: <Login />
        },
        {
          path: "register",
          element: <Register />
        }
      ]
    }
  ]);
};

export default RoutController;
