import React from 'react'
import AboutUs from './AboutUs/AboutUs'
import Elite from './Elite/Elite'
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
    </div>
  )
}

export default LandingPage