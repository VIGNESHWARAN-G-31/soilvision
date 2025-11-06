import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import About from '../components/About'
import Problem from '../components/Problem'
import Impact from '../components/Impact'
import Objectives from '../components/Objectives'
import Methodology from '../components/Methodology'
import Outcomes from '../components/Outcomes'
import ImageGallery from '../components/ImageGallery'
import AnimatedFeatures from '../components/AnimatedFeatures'
import FloatingActionButton from '../components/FloatingActionButton'
import ScrollProgress from '../components/ScrollProgress'
import Footer from '../components/Footer'

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white font-poppins">
      <ScrollProgress />
      <Navbar />
      <Hero />
      <About />
      <div id="features">
        <AnimatedFeatures />
      </div>
      <Problem />
      <Impact />
      <Outcomes />
      <Footer />
      <FloatingActionButton />
    </div>
  )
}

export default HomePage