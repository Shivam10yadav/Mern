import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const ScrollAnimation = ({ 
  children, 
  delay = 0, 
  className = "",
  variant = "slideUp" 
}) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-150px" })

  // Multiple animation variants
  const variants = {
    slideUp: {
      hidden: { opacity: 0, y: 75, scale: 0.95 },
      visible: { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        transition: {
          duration: 0.8,
          delay,
          ease: [0.25, 0.4, 0.25, 1], // Custom cubic bezier for smooth effect
        }
      }
    },
    slideLeft: {
      hidden: { opacity: 0, x: -100, rotate: -5 },
      visible: { 
        opacity: 1, 
        x: 0, 
        rotate: 0,
        transition: {
          duration: 0.8,
          delay,
          ease: [0.25, 0.4, 0.25, 1],
        }
      }
    },
    slideRight: {
      hidden: { opacity: 0, x: 100, rotate: 5 },
      visible: { 
        opacity: 1, 
        x: 0, 
        rotate: 0,
        transition: {
          duration: 0.8,
          delay,
          ease: [0.25, 0.4, 0.25, 1],
        }
      }
    },
    scale: {
      hidden: { opacity: 0, scale: 0.7 },
      visible: { 
        opacity: 1, 
        scale: 1,
        transition: {
          duration: 0.7,
          delay,
          ease: [0.34, 1.56, 0.64, 1], // Bouncy effect
        }
      }
    },
    scaleRotate: {
      hidden: { opacity: 0, scale: 0.5, rotate: -10 },
      visible: { 
        opacity: 1, 
        scale: 1, 
        rotate: 0,
        transition: {
          duration: 0.9,
          delay,
          ease: [0.34, 1.56, 0.64, 1],
        }
      }
    },
    fade: {
      hidden: { opacity: 0 },
      visible: { 
        opacity: 1,
        transition: {
          duration: 1,
          delay,
          ease: "easeOut"
        }
      }
    },
    blur: {
      hidden: { opacity: 0, filter: "blur(10px)", y: 30 },
      visible: { 
        opacity: 1, 
        filter: "blur(0px)", 
        y: 0,
        transition: {
          duration: 0.8,
          delay,
          ease: [0.25, 0.4, 0.25, 1],
        }
      }
    },
    bounce: {
      hidden: { opacity: 0, y: -50, scale: 0.8 },
      visible: { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        transition: {
          duration: 0.8,
          delay,
          ease: [0.68, -0.55, 0.265, 1.55], // Elastic bounce
        }
      }
    }
  }

  return (
    <motion.div
      ref={ref}
      variants={variants[variant]}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default ScrollAnimation