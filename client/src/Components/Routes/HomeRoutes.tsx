import React from "react";
import { useRoutes } from "react-router-dom";
import ChooseSignUp from "../Auth/ChooseSignUp";
import Signin from "../Auth/Signin";
import SignUp from "../Auth/SignUp";
import ComingSoon from "../BloodDonation/ComingSoon";
import LandingPage from "../Home/LandingPage";

const HomeRoutes = () => {
  const element = useRoutes([
    {
      path: "/",
      element: <LandingPage />,
    },
    {
      path: "/signup",
      element: <ChooseSignUp />,
    },

    {
      path: "/signin",
      element: <Signin />,
    },

    {
      path: "/dashboard",
      element: <Signin />,
    },
    {
      path: "/donateblood",
      element: <ComingSoon />,
    },
  ]);
  return element;
};

export default HomeRoutes;
