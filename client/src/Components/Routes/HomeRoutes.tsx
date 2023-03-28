import React from "react";
import { useRoutes } from "react-router-dom";
import ChooseSignUp from "../Auth/ChooseSignUp";
import ConsultantSignUp from "../Auth/ConsultantSignUp";
import HospitalSignUp from "../Auth/HospitalSignUp";
import Signin from "../Auth/Signin";
import SignUp from "../Auth/SignUp";
import ComingSoon from "../BloodDonation/ComingSoon";
import Footer from "../Home/Footer/Folder";
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
    {
      path: "/signuser",
      element: <SignUp />,
    },
    {
      path: "signconsultant",
      element: <ConsultantSignUp />,
    },
    {
      path: "signhospital",
      element: <HospitalSignUp />,
    },
    
  ]);
  return element;
};

export default HomeRoutes;
