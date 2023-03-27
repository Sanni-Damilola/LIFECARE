/** @format */

import React from "react";
import { useAppSelector } from "./Components/Global/Store";
import ConsultRoutes from "./Components/Routes/ConsultDashRoutes";
import DashBoardRoute from "./Components/Routes/DashBoardRoute";

import HomeRoutes from "./Components/Routes/HomeRoutes";
// import logo from "./logo.svg";
// import "./App.css";

function App() {
  const getUser = useAppSelector((state) => state?.currentUser);
  return <div>{getUser?.name ? <DashBoardRoute /> : <HomeRoutes />}</div>; // route 

}

export default App;
