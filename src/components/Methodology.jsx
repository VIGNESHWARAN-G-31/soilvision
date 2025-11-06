import React from 'react'
import { Database, ImageIcon, Brain, Code, Smartphone, TestTube } from 'lucide-react'

const Methodology = () => {
  const steps = [
    {
      icon: <Database className="h-8 w-8" />,
      title: "Data Collection",
      description: "Systematic gathering of high-resolution soil surface images across different environments, lighting conditions, and soil types with expert annotations.",
      details: ["Field sampling protocols", "Image quality standards", "Metadata documentation"],
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <ImageIcon className="h-8 w-8" />,
      title: "Image Preprocessing",
      description: "Advanced image enhancement techniques including resizing, normalization, and data augmentation to improve model robustness.",
      details: ["Resolution standardization", "Color normalization", "Data augmentation"],
      color: "from-purple-500 to-indigo-500"
    },
    {
      icon: <Brain className="h-8 w-8" />,
      title: "AI Model Architecture",
      description: "Implementation of proprietary advanced neural networks with cutting-edge deep learning architecture for superior performance and efficiency.",
      details: ["Architecture selection", "Transfer learning", "Hyperparameter tuning"],
      color: "from-earth-green to-leaf-green"
    },
    {
      icon: <Code className="h-8 w-8" />,
      title: "Application Development",
      description: "Creating intuitive web and mobile interfaces that provide seamless user experience for farmers and agricultural professionals.",
      details: ["User interface design", "API development", "Cross-platform compatibility"],
      color: "from-orange-500 to-red-500"
    },
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: "In Progress - Advanced Deployment",
      description: "Enterprise-grade deployment with optimized performance ensuring rapid analysis and seamless user experience across all platforms.",
      details: ["Advanced optimization", "Cross-platform deployment", "Performance enhancement"],
      color: "from-pink-500 to-rose-500"
    },
    {
      icon: <TestTube className="h-8 w-8" />,
      title: "In Progress",
      description: "Continuous enhancement and optimization through extensive validation protocols ensuring industry-leading accuracy standards.",
      details: ["Ongoing optimization", "Quality enhancement", "Performance validation"],
      color: "from-amber-500 to-yellow-500"
    }
  ]

  return (
    <section id="methodology" className="py-20 bg-white">
      <div className="container-max section-padding">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-earth-brown mb-6">
            Methodology
          </h2>
          <div className="w-24 h-1 bg-earth-green mx-auto mb-8"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our systematic approach combines cutting-edge AI technology with practical agricultural needs, 
            ensuring both technical excellence and real-world applicability.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-earth-green to-leaf-green transform md:-translate-x-px"></div>

          {steps.map((step, index) => (
            <div key={index} className="relative mb-12 last:mb-0">
              {/* Timeline Node */}
              <div className={`absolute left-0 md:left-1/2 w-8 h-8 rounded-full bg-gradient-to-br ${step.color} transform md:-translate-x-4 flex items-center justify-center`}>
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>

              {/* Content */}
              <div className={`ml-16 md:ml-0 ${index % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8 md:ml-auto'} md:w-1/2`}>
                <div className="bg-gradient-to-br from-sand-beige to-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${step.color} text-white mb-4`}>
                    {step.icon}
                  </div>
                  
                  <h3 className="text-xl font-bold text-earth-brown mb-3">
                    {step.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {step.description}
                  </p>

                  <div className="space-y-2">
                    {step.details.map((detail, detailIndex) => (
                      <div key={detailIndex} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-earth-green rounded-full"></div>
                        <span className="text-sm text-gray-600">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default Methodology