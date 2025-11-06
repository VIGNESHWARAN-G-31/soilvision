import React from 'react'
import { Microscope, Globe, Users, Award } from 'lucide-react'

const About = () => {
  const features = [
    {
      icon: <Microscope className="h-8 w-8" />,
      title: "Advanced AI Technology",
      description: "Advanced computer vision algorithms for precise soil texture classification"
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Global Impact",
      description: "Supporting sustainable agriculture worldwide"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Farmer-Focused",
      description: "Designed for real-world agricultural applications"
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Research Excellence",
      description: "Academic rigor meets practical innovation"
    }
  ]

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container-max section-padding">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-earth-brown mb-6">
            About the Project
          </h2>
          <div className="w-24 h-1 bg-earth-green mx-auto mb-8"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our research bridges the gap between traditional agricultural practices and modern AI technology, 
            creating accessible solutions for soil assessment that empower farmers and researchers alike.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
          <div className="animate-slide-up">
            <h3 className="text-2xl font-bold text-earth-brown mb-6">
              Revolutionizing Soil Analysis
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              This innovative project leverages computer vision and deep learning to classify soil textures 
              directly from surface images. By analyzing visual patterns and characteristics, our AI system 
              can instantly determine whether soil is sand, clay, or loam - critical information for 
              agricultural decision-making.
            </p>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Traditional soil testing requires laboratory analysis, which can be expensive and time-consuming. 
              Our solution brings sophisticated soil assessment directly to the field, enabling immediate 
              insights that support precision agriculture and sustainable farming practices.
            </p>
            <div className="flex items-center space-x-4">
              <div className="px-4 py-2 bg-earth-green/10 text-earth-green rounded-lg font-medium">
                Academic Research
              </div>
              <div className="px-4 py-2 bg-leaf-green/10 text-leaf-green rounded-lg font-medium">
                Field Application
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="p-6 bg-gradient-to-br from-sand-beige to-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="text-earth-green mb-4">
                  {feature.icon}
                </div>
                <h4 className="text-lg font-semibold text-earth-brown mb-2">
                  {feature.title}
                </h4>
                <p className="text-gray-600 text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}

export default About