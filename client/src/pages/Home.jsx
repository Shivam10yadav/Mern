import React from 'react'
import Banner from '../components/Banner'
import Hero from '../components/Hero'
import Features from '../components/Features'
import Testimonials from '../components/Testimonials'
import CallToAction from '../components/CallToAction'
import Contactus from '../components/Contactus'
import Footer from '../components/Footer'
import ScrollAnimation from '../components/ScrollAnimation'  

 
const Home = () => {
  return (
    <div>
       <Banner/>
       <Hero/>

        <ScrollAnimation  variant="slideUp">
        <Features />
      </ScrollAnimation>

       <ScrollAnimation  variant="slideUp">
        <Testimonials />
      </ScrollAnimation>

       <ScrollAnimation variant="slideUp">
        <CallToAction/>
      </ScrollAnimation>

            <ScrollAnimation  variant="slideUp">
        <Contactus />
      </ScrollAnimation>

       <ScrollAnimation variant="slideUp">
        <Footer />
      </ScrollAnimation>
    </div>



    
  )
}

export default Home