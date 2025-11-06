import React from 'react'
import { Heart, Zap, Smartphone, TrendingDown, BarChart3 } from 'lucide-react'

const Impact = () => {
  const impactCards = [
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Soil Health Monitoring",
      description: "Enable continuous monitoring of soil conditions to maintain optimal health and prevent degradation through data-driven insights.",
      color: "from-red-400 to-pink-500",
      bgColor: "bg-red-50"
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Precision Agriculture Support",
      description: "Empower farmers with precise soil data for targeted fertilization, irrigation planning, and crop selection strategies.",
      color: "from-earth-green to-leaf-green",
      bgColor: "bg-green-50"
    },
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: "Rural Accessibility via Mobile",
      description: "Bring advanced soil analysis to remote areas through mobile applications that work offline and require minimal technical knowledge.",
      color: "from-blue-400 to-indigo-500",
      bgColor: "bg-blue-50"
    },
    {
      icon: <TrendingDown className="h-8 w-8" />,
      title: "Cost Efficiency vs Lab Testing",
      description: "Reduce soil testing costs by up to 90% while providing instant results compared to traditional laboratory analysis methods.",
      color: "from-amber-400 to-orange-500",
      bgColor: "bg-amber-50"
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Scalable Agricultural Programs",
      description: "Support large-scale agricultural initiatives and government programs with standardized, reliable soil assessment tools.",
      color: "from-purple-400 to-violet-500",
      bgColor: "bg-purple-50"
    }
  ]

  return (
    <section id="impact" className="py-20 bg-white">
      <div className="container-max section-padding">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-earth-brown mb-6">
            Project Impact
          </h2>
          <div className="w-24 h-1 bg-earth-green mx-auto mb-8"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our innovative soil classification system creates lasting positive change across 
            multiple dimensions of modern agriculture and environmental stewardship.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {impactCards.map((card, index) => (
            <div 
              key={index}
              className="group relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-3"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
              
              <div className={`${card.bgColor} p-8 h-full`}>
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${card.color} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {card.icon}
                </div>
                
                <h3 className="text-xl font-bold text-earth-brown mb-4 group-hover:text-earth-green transition-colors duration-300">
                  {card.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* System Capabilities */}
        <div className="bg-gradient-to-r from-earth-green to-leaf-green rounded-2xl p-8 md:p-12 text-white">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              System Capabilities
            </h3>
            <p className="text-green-100 max-w-2xl mx-auto">
              Comprehensive soil analysis features designed for modern agriculture
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-2">4</div>
              <div className="text-green-100">Soil Types Classified</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-2">90%+</div>
              <div className="text-green-100">Analysis Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-2">8+</div>
              <div className="text-green-100">Crop Categories</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-2">3</div>
              <div className="text-green-100">Analysis Methods</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Impact