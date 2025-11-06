import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const SoilCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  // Soil types with accurate representative images and characteristics
  const soilTypes = [
    {
      id: 0,
      name: 'Sandy Soil',
      type: 'Sand',
      icon: '🏖️',
      image: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=500&h=400&fit=crop&auto=format',
      characteristics: ['Excellent Drainage', 'Light Texture', 'Fast Warming'],
      color: 'from-yellow-400 to-orange-500',
      description: 'Coarse texture with large particles, ideal for root vegetables'
    },
    {
      id: 1,
      name: 'Clay Soil',
      type: 'Clay',
      icon: '🧱',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=400&fit=crop&auto=format',
      characteristics: ['High Water Retention', 'Dense Structure', 'Nutrient Rich'],
      color: 'from-red-400 to-orange-600',
      description: 'Fine particles that hold water and nutrients effectively'
    },
    {
      id: 2,
      name: 'Loam Soil',
      type: 'Loam',
      icon: '🌱',
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500&h=400&fit=crop&auto=format',
      characteristics: ['Balanced Properties', 'Ideal Structure', 'Best for Crops'],
      color: 'from-green-400 to-emerald-600',
      description: 'Perfect balance of sand, silt, and clay particles'
    },
    {
      id: 3,
      name: 'Silt Soil',
      type: 'Silt',
      icon: '💧',
      image: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=500&h=400&fit=crop&auto=format',
      characteristics: ['Smooth Texture', 'Good Retention', 'Fine Particles'],
      color: 'from-gray-400 to-blue-500',
      description: 'Silky texture with moderate drainage properties'
    }
  ]

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % soilTypes.length)
    }, 4000) // Change every 4 seconds

    return () => clearInterval(interval)
  }, [soilTypes.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % soilTypes.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + soilTypes.length) % soilTypes.length)
  }

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Main Carousel Container */}
      <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-white">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="relative"
          >
            {/* Soil Image and Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 min-h-[400px]">
              {/* Image Side */}
              <div className="relative">
                <img
                  src={soilTypes[currentSlide].image}
                  alt={soilTypes[currentSlide].name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20"></div>
                
                {/* Soil Type Badge */}
                <div className="absolute top-4 left-4">
                  <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r ${soilTypes[currentSlide].color} text-white shadow-lg`}>
                    <span className="text-2xl">{soilTypes[currentSlide].icon}</span>
                    <span className="font-bold">{soilTypes[currentSlide].type}</span>
                  </div>
                </div>
              </div>

              {/* Content Side */}
              <div className="p-8 flex flex-col justify-center bg-gradient-to-br from-sand-beige to-white">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h3 className="text-3xl font-bold text-earth-brown mb-4">
                    {soilTypes[currentSlide].name}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {soilTypes[currentSlide].description}
                  </p>

                  {/* Characteristics */}
                  <div className="space-y-3 mb-6">
                    <h4 className="font-semibold text-earth-brown">Key Characteristics:</h4>
                    {soilTypes[currentSlide].characteristics.map((char, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className="flex items-center space-x-3"
                      >
                        <div className="w-2 h-2 bg-earth-green rounded-full"></div>
                        <span className="text-sm text-gray-700">{char}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* AI Analysis Badge */}
                  <div className="inline-flex items-center space-x-2 px-3 py-1 bg-earth-green/10 rounded-full text-earth-green text-sm">
                    <div className="w-2 h-2 bg-earth-green rounded-full animate-pulse"></div>
                    <span>AI Classification Available</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full shadow-lg transition-all duration-300 hover:scale-110"
        >
          <ChevronLeft className="h-6 w-6 text-earth-brown" />
        </button>
        
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full shadow-lg transition-all duration-300 hover:scale-110"
        >
          <ChevronRight className="h-6 w-6 text-earth-brown" />
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center space-x-3 mt-6">
        {soilTypes.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-earth-green scale-125' 
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>

      {/* Soil Type Labels */}
      <div className="grid grid-cols-4 gap-4 mt-8">
        {soilTypes.map((soil, index) => (
          <motion.button
            key={index}
            onClick={() => goToSlide(index)}
            className={`p-3 rounded-lg text-center transition-all duration-300 ${
              index === currentSlide
                ? 'bg-earth-green text-white shadow-lg'
                : 'bg-white text-earth-brown hover:bg-earth-green/10 shadow-md'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="text-2xl mb-1">{soil.icon}</div>
            <div className="text-sm font-medium">{soil.type}</div>
          </motion.button>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="mt-4 w-full bg-gray-200 rounded-full h-1">
        <motion.div
          className="bg-earth-green h-1 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${((currentSlide + 1) / soilTypes.length) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </div>
  )
}

export default SoilCarousel