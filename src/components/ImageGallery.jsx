import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ZoomIn, ChevronLeft, ChevronRight, Eye, Camera, Layers } from 'lucide-react'

const ImageGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null)
  const [activeCategory, setActiveCategory] = useState('all')

  // Sample soil images data (in real project, these would be actual soil images)
  const soilImages = [
    {
      id: 1,
      category: 'sand',
      title: 'Sandy Soil Sample',
      description: 'High drainage, low water retention characteristics',
      src: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=500&h=400&fit=crop',
      accuracy: '96%',
      location: 'Arizona Desert Farm'
    },
    {
      id: 2,
      category: 'clay',
      title: 'Clay Soil Sample',
      description: 'High water retention, poor drainage properties',
      src: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=400&fit=crop',
      accuracy: '94%',
      location: 'Mississippi Delta'
    },
    {
      id: 3,
      category: 'loam',
      title: 'Loam Soil Sample',
      description: 'Ideal balance of drainage and water retention',
      src: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500&h=400&fit=crop',
      accuracy: '98%',
      location: 'Iowa Farmland'
    },
    {
      id: 4,
      category: 'sand',
      title: 'Coastal Sandy Soil',
      description: 'Marine-influenced sandy composition',
      src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=400&fit=crop',
      accuracy: '90%',
      location: 'California Coast'
    },
    {
      id: 5,
      category: 'clay',
      title: 'Heavy Clay Soil',
      description: 'Dense clay formation with mineral deposits',
      src: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=500&h=400&fit=crop',
      accuracy: '93%',
      location: 'Georgia Plains'
    },
    {
      id: 6,
      category: 'loam',
      title: 'Garden Loam',
      description: 'Nutrient-rich garden soil composition',
      src: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=500&h=400&fit=crop',
      accuracy: '97%',
      location: 'Oregon Valley'
    }
  ]

  const categories = [
    { id: 'all', name: 'All Samples', icon: <Layers className="h-4 w-4" />, color: 'earth-green' },
    { id: 'sand', name: 'Sand', icon: <Camera className="h-4 w-4" />, color: 'yellow-500' },
    { id: 'clay', name: 'Clay', icon: <Eye className="h-4 w-4" />, color: 'clay-orange' },
    { id: 'loam', name: 'Loam', icon: <Layers className="h-4 w-4" />, color: 'leaf-green' }
  ]

  const filteredImages = activeCategory === 'all' 
    ? soilImages 
    : soilImages.filter(img => img.category === activeCategory)

  const openModal = (image) => {
    setSelectedImage(image)
  }

  const closeModal = () => {
    setSelectedImage(null)
  }

  const navigateImage = (direction) => {
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id)
    let newIndex
    
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % filteredImages.length
    } else {
      newIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length
    }
    
    setSelectedImage(filteredImages[newIndex])
  }

  return (
    <section className="py-20 bg-white">
      <div className="container-max section-padding">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-earth-brown mb-6"
          >
            Soil Sample Gallery
          </motion.h2>
          <div className="w-24 h-1 bg-earth-green mx-auto mb-8"></div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            Explore our comprehensive collection of soil samples analyzed by our AI system. 
            Each image demonstrates the accuracy and precision of our computer vision technology.
          </motion.p>
        </div>

        {/* Category Filter */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeCategory === category.id
                  ? `bg-${category.color} text-white shadow-lg`
                  : 'bg-gray-100 text-earth-brown hover:bg-gray-200 shadow-md'
              }`}
            >
              {category.icon}
              <span>{category.name}</span>
            </button>
          ))}
        </motion.div>

        {/* Image Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer"
                onClick={() => openModal(image)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={image.src}
                    alt={image.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                    <ZoomIn className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  
                  {/* Accuracy Badge */}
                  <div className="absolute top-4 right-4 bg-earth-green text-white px-3 py-1 rounded-full text-sm font-medium">
                    {image.accuracy}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-earth-brown mb-2 group-hover:text-earth-green transition-colors duration-300">
                    {image.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 leading-relaxed">
                    {image.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{image.location}</span>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      image.category === 'sand' ? 'bg-yellow-100 text-yellow-700' :
                      image.category === 'clay' ? 'bg-orange-100 text-orange-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {image.category.toUpperCase()}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
              onClick={closeModal}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative">
                  <img
                    src={selectedImage.src}
                    alt={selectedImage.title}
                    className="w-full h-96 object-cover"
                  />
                  
                  {/* Close Button */}
                  <button
                    onClick={closeModal}
                    className="absolute top-4 right-4 p-2 bg-white/90 rounded-full hover:bg-white transition-colors duration-200"
                  >
                    <X className="h-5 w-5 text-gray-800" />
                  </button>
                  
                  {/* Navigation Buttons */}
                  <button
                    onClick={() => navigateImage('prev')}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 rounded-full hover:bg-white transition-colors duration-200"
                  >
                    <ChevronLeft className="h-5 w-5 text-gray-800" />
                  </button>
                  
                  <button
                    onClick={() => navigateImage('next')}
                    className="absolute right-16 top-1/2 -translate-y-1/2 p-2 bg-white/90 rounded-full hover:bg-white transition-colors duration-200"
                  >
                    <ChevronRight className="h-5 w-5 text-gray-800" />
                  </button>
                </div>
                
                <div className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-earth-brown mb-2">
                        {selectedImage.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {selectedImage.description}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-earth-green mb-1">
                        {selectedImage.accuracy}
                      </div>
                      <div className="text-sm text-gray-500">Accuracy</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">
                      <strong>Location:</strong> {selectedImage.location}
                    </span>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                      selectedImage.category === 'sand' ? 'bg-yellow-100 text-yellow-700' :
                      selectedImage.category === 'clay' ? 'bg-orange-100 text-orange-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {selectedImage.category.toUpperCase()} SOIL
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

export default ImageGallery