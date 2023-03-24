import React from 'react'
import { useRoutes } from 'react-router-dom'
import SignUp from '../Auth/SignUp'
import LandingPage from '../Home/LandingPage'

const HomeRoutes = () => {

  const element = useRoutes([
    {
      path: "/",
      element: <LandingPage />
    },
    {
      path: "/signup",
      element: <SignUp />
    },

   
  ])
  return element
}

export default HomeRoutes