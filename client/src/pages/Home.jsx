import React from 'react'
import Banner from '../components/Banner'
import Hero from '../components/Hero'
import Features from '../components/Features'
import Testimonials from '../components/Testimonials'
import CallToAction from '../components/CallToAction'
import Contactus from '../components/Contactus'
import Footer from '../components/Footer'
import ScrollAnimation from '../components/ScrollAnimation'  
import Snowfall from 'react-Snowfall'


 
const Home = () => {
  return (
    <div>
           <Snowfall 
     color='blue'
  snowflakeCount={100
  } // Much fewer snowflakes
  speed={[1.0 , 2.0]} // Slower fall speed
  wind={[-0.5, 0.5]} // Less wind movement
  radius={[0.5, 1.5]} // Smaller snowflakes
  style={{
    position: 'fixed',
    width: '100vw',
    height: '100vh',
    pointerEvents: 'none',
    zIndex: 1, // Lower z-index so it stays in background
    opacity: 0.6 // Make it semi-transparent
  }}
/>

      
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