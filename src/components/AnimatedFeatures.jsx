import React, { useState, useEffect } from 'react'
import { motion, useAnimationControls } from 'framer-motion'
import { Cpu, Zap, Shield, Brain, Cloud, Globe, Users, Award } from 'lucide-react'

const AnimatedFeatures = () => {
  const [activeFeature, setActiveFeature] = useState(0)
  const controls = useAnimationControls()

  const features = [
    {
      icon: <Cpu className="h-8 w-8" />,
      title: "4 Soil Type Classification",
      description: "Accurately identifies Sandy, Clay, Loam, and Silt soil types using advanced image analysis algorithms",
      stats: "4 Soil Types",
      color: "from-blue-500 to-indigo-600",
      bgColor: "bg-blue-50"
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Chemical Properties Analysis",
      description: "Provides pH range, NPK levels, organic matter content, and nutrient availability assessment",
      stats: "pH + NPK Analysis",
      color: "from-yellow-500 to-orange-600",
      bgColor: "bg-yellow-50"
    },
    {
      icon: <Brain className="h-8 w-8" />,
      title: "True AI Integration",
      description: "Enhanced analysis using advanced AI technology for comprehensive agricultural insights and recommendations",
      stats: "AI Powered",
      color: "from-green-500 to-emerald-600",
      bgColor: "bg-green-50"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Crop Recommendations",
      description: "Detailed crop suitability analysis with specific recommendations and crops to avoid for each soil type",
      stats: "8+ Crop Types",
      color: "from-purple-500 to-violet-600",
      bgColor: "bg-purple-50"
    },
    {
      icon: <Cloud className="h-8 w-8" />,
      title: "Smart Fallback System",
      description: "Triple-tier analysis system with Advanced AI, Canvas color analysis, and intelligent backup processing",
      stats: "3-Tier System",
      color: "from-cyan-500 to-blue-600",
      bgColor: "bg-cyan-50"
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Agricultural Management",
      description: "Complete farming guidance including irrigation, fertilization, tillage, and crop rotation strategies",
      stats: "Complete Guidance",
      color: "from-emerald-500 to-teal-600",
      bgColor: "bg-emerald-50"
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [features.length])

  useEffect(() => {
    controls.start({
      scale: [1, 1.05, 1],
      transition: { duration: 0.5 }
    })
  }, [activeFeature, controls])

  return (
    <section className="py-20 bg-gradient-to-br from-sand-beige to-white">
      <div className="container-max section-padding">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-earth-brown mb-6"
          >
            Advanced Features
          </motion.h2>
          <div className="w-24 h-1 bg-earth-green mx-auto mb-8"></div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            Explore the powerful features and capabilities of our soil classification system designed specifically for agricultural professionals and farmers
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Feature Display */}
          <motion.div
            animate={controls}
            className="relative"
          >
            <div className={`${features[activeFeature].bgColor} rounded-3xl p-8 shadow-xl`}>
              <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${features[activeFeature].color} text-white mb-6`}>
                {features[activeFeature].icon}
              </div>
              
              <h3 className="text-2xl font-bold text-earth-brown mb-4">
                {features[activeFeature].title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed mb-6">
                {features[activeFeature].description}
              </p>

              <div className="flex items-center justify-between">
                <div className={`px-4 py-2 rounded-full bg-gradient-to-r ${features[activeFeature].color} text-white font-semibold`}>
                  {features[activeFeature].stats}
                </div>
                <div className="text-sm text-gray-500">
                  {activeFeature + 1} of {features.length}
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-6 w-full bg-gray-200 rounded-full h-2">
              <motion.div
                className="bg-gradient-to-r from-earth-green to-leaf-green h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${((activeFeature + 1) / features.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </motion.div>

          {/* Feature Grid */}
          <div className="grid grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className={`p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                  index === activeFeature
                    ? 'bg-white shadow-lg scale-105'
                    : 'bg-white/50 hover:bg-white/80 shadow-md'
                }`}
                onClick={() => setActiveFeature(index)}
                whileHover={{ scale: index === activeFeature ? 1.05 : 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className={`inline-flex p-2 rounded-lg bg-gradient-to-br ${feature.color} text-white mb-3`}>
                  {React.cloneElement(feature.icon, { className: "h-5 w-5" })}
                </div>
                <h4 className="font-semibold text-earth-brown text-sm mb-2">
                  {feature.title}
                </h4>
                <div className="text-xs text-gray-600">
                  {feature.stats}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Interactive Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          {[
            { icon: <Users className="h-6 w-6" />, value: "4", label: "Soil Types Detected", color: "text-blue-600" },
            { icon: <Award className="h-6 w-6" />, value: "90%+", label: "Classification Accuracy", color: "text-green-600" },
            { icon: <Globe className="h-6 w-6" />, value: "3", label: "AI Analysis Tiers", color: "text-purple-600" },
            { icon: <Zap className="h-6 w-6" />, value: "<10s", label: "Analysis Speed", color: "text-orange-600" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl p-6 shadow-md text-center hover:shadow-lg transition-shadow duration-300"
              whileHover={{ y: -5 }}
            >
              <div className={`inline-flex p-3 rounded-full bg-gray-100 ${stat.color} mb-4`}>
                {stat.icon}
              </div>
              <div className="text-2xl font-bold text-earth-brown mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default AnimatedFeatures