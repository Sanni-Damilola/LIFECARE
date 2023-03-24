import React from 'react'
import AboutUs from './AboutUs/AboutUs'
import Elite from './Elite/Elite'
import ExclusiveService from './ExclusiveService/ExclusiveService'
import Footer from './Footer/Folder'
import Header from './Header/Header'
import Hero from './Hero/Hero'
import HowWeWork from './HowWeWork/HowWeWork'

const LandingPage = () => {
  return (
    <div>
      <Header />
      <Hero />
      <HowWeWork />
      <br /> <br />
      <AboutUs />
      <br />
      <Elite />
      <ExclusiveService />
      <br />
      <Footer />
    </div>
  )
}

export default LandingPage