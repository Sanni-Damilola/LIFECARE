import React from "react";
import { useRoutes } from "react-router-dom";
import Signin from "../Auth/Signin";
import SignUp from "../Auth/SignUp";
import LandingPage from "../Home/LandingPage";

const HomeRoutes = () => {
  const element = useRoutes([
    {
      path: "/",
      element: <LandingPage />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },

    {
      path: "/signin",
      element: <Signin />,
    },
  ]);
  return element;
};

export default HomeRoutes;
