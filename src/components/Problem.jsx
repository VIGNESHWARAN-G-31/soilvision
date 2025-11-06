import React from 'react'
import { AlertTriangle, Clock, DollarSign, MapPin, Beaker } from 'lucide-react'

const Problem = () => {
  const challenges = [
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Time-Consuming Process",
      description: "Traditional lab testing takes days or weeks for results"
    },
    {
      icon: <DollarSign className="h-6 w-6" />,
      title: "High Costs",
      description: "Laboratory analysis is expensive, especially for small farms"
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Limited Accessibility",
      description: "Rural areas often lack access to testing facilities"
    },
    {
      icon: <Beaker className="h-6 w-6" />,
      title: "Laboratory Dependency",
      description: "Farmers must rely on external labs for soil assessment"
    }
  ]

  return (
    <section id="problem" className="py-20 bg-gradient-to-br from-sand-beige to-white">
      <div className="container-max section-padding">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-clay-orange/10 rounded-full mb-6">
            <AlertTriangle className="h-8 w-8 text-clay-orange" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-earth-brown mb-6">
            The Challenge
          </h2>
          <div className="w-24 h-1 bg-clay-orange mx-auto mb-8"></div>
        </div>

        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <p className="text-lg text-gray-700 leading-relaxed text-center">
              <span className="font-semibold text-earth-brown">Soil texture plays a vital role</span> in determining 
              water retention, aeration, nutrient availability, and crop suitability. Traditional laboratory-based 
              soil testing is time-consuming and costly, especially in rural regions. This project aims to classify 
              soil textures (sand, clay, loam) using high-resolution surface images analyzed through an advanced AI-based 
              computer vision model. The system provides farmers and agronomists with a 
              <span className="font-semibold text-earth-green"> portable, low-cost solution</span> for quick 
              field-level soil assessment without laboratory dependency.
            </p>
          </div>
        </div>

        {/* Challenge Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {challenges.map((challenge, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="text-clay-orange mb-4">
                {challenge.icon}
              </div>
              <h3 className="text-lg font-semibold text-earth-brown mb-2">
                {challenge.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {challenge.description}
              </p>
            </div>
          ))}
        </div>

        {/* Solution Preview */}
        <div className="text-center">
          <div className="inline-flex items-center space-x-4 px-6 py-3 bg-earth-green/10 rounded-full">
            <span className="text-earth-green font-medium">Our Solution:</span>
            <span className="text-earth-brown">AI-Powered • Instant Results • Field-Ready</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Problem