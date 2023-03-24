import React from 'react'
import { useRoutes } from 'react-router-dom'
import SignUp from '../Auth/SignUp'
import Header from '../Home/Header/Header'

const HomeRoutes = () => {

  const element = useRoutes([
    {
      path: "/",
      element: <Header />
    },
    {
      path: "/signup",
      element: <SignUp />
    },
   
  ])
  return element
}

export default HomeRoutes