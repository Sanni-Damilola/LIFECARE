/** @format */

import React from "react";
import { useAppSelector } from "./Components/Global/Store";
import ConsultRoutes from "./Components/Routes/ConsultDashRoutes";
import DashBoardRoute from "./Components/Routes/DashBoardRoute";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"

import HomeRoutes from "./Components/Routes/HomeRoutes";
// import logo from "./logo.svg";
// import "./App.css";

function App() {
  const myclient = new QueryClient()
  const getUser = useAppSelector((state) => state?.currentUser);

  const consultant = useAppSelector((state) => state?.consultUser);

  return (  
  <>  
        <HomeRoutes />

      <div>
        {getUser?.name ? <DashBoardRoute /> : null }
      </div>

      <div>
        {consultant?.name ? <ConsultRoutes /> : null }
      </div>
  </>)
   // route 

}

export default App;
