import React from 'react'
import Navbar from '../components/Navbar'
import ScrollProgress from '../components/ScrollProgress'
import Methodology from '../components/Methodology'

const MethodologyPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <ScrollProgress />
      <Navbar />
      
      {/* Header Section */}
      <div className="pt-20">
        <div className="container-max section-padding">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-earth-green/10 rounded-full mb-6">
              <div className="text-2xl">🔬</div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-earth-brown mb-6">
              Our Methodology
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover the systematic approach behind our Smart Soil AI Analytics platform
            </p>
          </div>
        </div>
      </div>

      {/* Methodology Component */}
      <Methodology />
    </div>
  )
}

export default MethodologyPage