import React from 'react'
import { Target, Smartphone, Shield, Zap } from 'lucide-react'

const Outcomes = () => {
  const outcomes = [
    {
      icon: <Target className="h-12 w-12" />,
      title: "Accurate Soil Classification System",
      description: "High-precision analysis achieving 90%+ accuracy in distinguishing between sandy, clay, loam, and silt soil types with instant results.",
      metrics: ["90%+ Classification Accuracy", "4 Soil Types Supported", "Instant Results"],
      gradient: "from-earth-green to-leaf-green"
    },
    {
      icon: <Smartphone className="h-12 w-12" />,
      title: "Comprehensive Chemical Analysis",
      description: "Detailed soil chemistry insights including pH levels, NPK analysis, organic matter content, and nutrient availability assessment.",
      metrics: ["pH Range Analysis", "NPK Level Detection", "Nutrient Assessment"],
      gradient: "from-blue-500 to-indigo-600"
    },
    {
      icon: <Shield className="h-12 w-12" />,
      title: "Agricultural Recommendations",
      description: "Expert crop recommendations, irrigation strategies, fertilization plans, and soil management practices tailored to specific soil types.",
      metrics: ["Crop Suitability Guide", "Irrigation Planning", "Management Strategies"],
      gradient: "from-purple-500 to-pink-600"
    },
    {
      icon: <Zap className="h-12 w-12" />,
      title: "Smart Analysis Engine",
      description: "Multi-tier analysis system with AI enhancement, color analysis backup, and intelligent processing for reliable soil classification.",
      metrics: ["Multi-Tier Processing", "AI Enhancement", "Reliable Classification"],
      gradient: "from-amber-500 to-orange-600"
    }
  ]

  return (
    <section id="outcomes" className="py-20 bg-gradient-to-br from-sand-beige to-white">
      <div className="container-max section-padding">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-earth-brown mb-6">
            Expected Outcomes
          </h2>
          <div className="w-24 h-1 bg-earth-green mx-auto mb-8"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our project delivers tangible, measurable results that transform how soil assessment 
            is conducted in modern agriculture, creating lasting value for farmers and researchers.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {outcomes.map((outcome, index) => (
            <div 
              key={index}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2"
            >
              <div className={`h-2 bg-gradient-to-r ${outcome.gradient}`}></div>
              
              <div className="p-8">
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${outcome.gradient} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {outcome.icon}
                </div>
                
                <h3 className="text-2xl font-bold text-earth-brown mb-4 group-hover:text-earth-green transition-colors duration-300">
                  {outcome.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed mb-6">
                  {outcome.description}
                </p>

                <div className="space-y-3">
                  {outcome.metrics.map((metric, metricIndex) => (
                    <div key={metricIndex} className="flex items-center space-x-3">
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${outcome.gradient}`}></div>
                      <span className="text-sm font-medium text-earth-brown">{metric}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Success Metrics */}
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-earth-brown mb-4">
              Project Success Metrics
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Quantifiable measures that demonstrate the effectiveness and impact of our soil classification system
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-gradient-to-br from-earth-green/10 to-leaf-green/10 rounded-xl">
              <div className="text-3xl font-bold text-earth-green mb-2">90%+</div>
              <div className="text-earth-brown font-medium">Classification Accuracy</div>
              <div className="text-sm text-gray-600 mt-1">Soil type identification</div>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-blue-500/10 to-indigo-600/10 rounded-xl">
              <div className="text-3xl font-bold text-blue-600 mb-2">&lt;10s</div>
              <div className="text-earth-brown font-medium">Analysis Speed</div>
              <div className="text-sm text-gray-600 mt-1">Instant results</div>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-purple-500/10 to-pink-600/10 rounded-xl">
              <div className="text-3xl font-bold text-purple-600 mb-2">4</div>
              <div className="text-earth-brown font-medium">Soil Types</div>
              <div className="text-sm text-gray-600 mt-1">Sandy, Clay, Loam, Silt</div>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-amber-500/10 to-orange-600/10 rounded-xl">
              <div className="text-3xl font-bold text-amber-600 mb-2">3</div>
              <div className="text-earth-brown font-medium">Analysis Tiers</div>
              <div className="text-sm text-gray-600 mt-1">AI + Color + Smart backup</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Outcomes