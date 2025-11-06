import React from 'react'
import { Link as ScrollLink } from 'react-scroll'
import { Link } from 'react-router-dom'
import { ArrowDown, Zap, Eye, Cpu } from 'lucide-react'
import SoilCarousel from './SoilCarousel'

const Hero = () => {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-20">
      {/* Background with Pattern */}
      <div className="absolute inset-0 earth-gradient"></div>
      <div className="absolute inset-0 soil-pattern opacity-10"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 animate-bounce-gentle">
        <div className="p-3 bg-white/20 backdrop-blur-sm rounded-full">
          <Eye className="h-8 w-8 text-white" />
        </div>
      </div>
      <div className="absolute top-32 right-16 animate-bounce-gentle" style={{animationDelay: '1s'}}>
        <div className="p-3 bg-white/20 backdrop-blur-sm rounded-full">
          <Cpu className="h-8 w-8 text-white" />
        </div>
      </div>
      <div className="absolute bottom-32 left-20 animate-bounce-gentle" style={{animationDelay: '2s'}}>
        <div className="p-3 bg-white/20 backdrop-blur-sm rounded-full">
          <Zap className="h-8 w-8 text-white" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white section-padding max-w-5xl mx-auto">
        <div className="animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="block">Smart Soil</span>
            <span className="block text-sand-beige">AI Analytics</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed">
            Revolutionary AI-powered soil texture analysis using surface image recognition. 
            Transforming agriculture with instant, accurate soil assessment.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <ScrollLink
              to="about"
              spy={true}
              smooth={true}
              offset={-80}
              duration={500}
              className="px-8 py-4 bg-white text-earth-brown font-semibold rounded-xl hover:bg-sand-beige transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Explore Project
            </ScrollLink>
            
            <Link
              to="/methodology"
              className="px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-earth-brown transition-all duration-300 cursor-pointer"
            >
              Learn More
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">90%+</div>
              <div className="text-white/80">Classification Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">&lt;10s</div>
              <div className="text-white/80">Processing Time</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">4</div>
              <div className="text-white/80">Soil Types Detected</div>
            </div>
          </div>
        </div>

        {/* Soil Types Carousel */}
        <div className="relative z-10 mt-16 mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Soil Types We Classify
            </h3>
            <p className="text-white/80 max-w-2xl mx-auto">
              Our AI system accurately identifies and analyzes four main soil types with detailed characteristics
            </p>
          </div>
          <SoilCarousel />
        </div>

        {/* Scroll Indicator - positioned above CTA button */}
        <div className="flex justify-center mb-4">
          <div className="animate-bounce">
            <ArrowDown className="h-6 w-6 text-white/70" />
          </div>
        </div>

        {/* CTA Button for AI Analysis */}
        <div className="mt-8 mb-8">
          <Link
            to="/analysis"
            className="group relative inline-flex items-center justify-center px-10 py-4 bg-gradient-to-r from-earth-green to-emerald-600 text-white font-bold text-lg rounded-2xl hover:from-emerald-600 hover:to-earth-green transition-all duration-300 cursor-pointer shadow-2xl hover:shadow-earth-green/25 transform hover:-translate-y-2 hover:scale-105"
          >
            <span className="mr-3">🌾</span>
            Try AI Soil Analysis
            <span className="ml-3 group-hover:translate-x-1 transition-transform duration-300">→</span>
            
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-earth-green to-emerald-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
          </Link>
          
          <p className="text-white/70 text-sm mt-4 max-w-md mx-auto">
            Upload your soil image and get instant AI-powered analysis with detailed recommendations
          </p>
        </div>

      </div>
    </section>
  )
}

export default Hero