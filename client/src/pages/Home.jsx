import React from 'react'
import Banner from '../components/Banner'
import Hero from '../components/Hero'
import Features from '../components/Features'
import Testimonials from '../components/Testimonials'
import CallToAction from '../components/CallToAction'
import Contactus from '../components/Contactus'
import Footer from '../components/Footer'
 
const Home = () => {
  return (
    <div>
       <Banner/>
       <Hero/>
       <Features/>
       <Testimonials/>
       <CallToAction/>
       <Contactus/>
       <Footer/>

    </div>
  )
}

export default Home