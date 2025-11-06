import React from 'react'
import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import InteractiveDemo from '../components/InteractiveDemo'

const SoilAnalysisPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sand-beige to-white">
      {/* Header */}
      <div className="bg-earth-brown text-white py-6 shadow-lg">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link 
              to="/" 
              className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Home</span>
            </Link>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold">
            🌱 Live AI Soil Analysis
          </h1>
          <div className="w-24"></div> {/* Spacer for centering */}
        </div>
      </div>

      {/* Live Interactive Demo - Your existing soil analysis component */}
      <div className="min-h-screen">
        <InteractiveDemo />
      </div>
    </div>
  )
}

export default SoilAnalysisPage