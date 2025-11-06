import React from 'react'
import { CheckCircle, Camera, Brain, Monitor, FlaskConical, Users } from 'lucide-react'

const Objectives = () => {
  const objectives = [
    {
      icon: <Camera className="h-6 w-6" />,
      title: "Collect Annotated Soil Surface Images",
      description: "Gather comprehensive dataset of sand, clay, and loam soil samples with expert annotations",
      completed: true
    },
    {
      icon: <Brain className="h-6 w-6" />,
      title: "Develop Advanced AI Analysis",
      description: "Develop advanced convolutional neural network architecture optimized for soil texture classification",
      completed: true
    },
    {
      icon: <Monitor className="h-6 w-6" />,
      title: "Develop Web/Mobile Interface",
      description: "Create user-friendly applications for real-time soil analysis with intuitive design",
      completed: false
    },
    {
      icon: <FlaskConical className="h-6 w-6" />,
      title: "Validate Accuracy Under Field Conditions",
      description: "Test model performance across varying environmental conditions and lighting scenarios",
      completed: false
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Conduct Field Usability Testing",
      description: "Collaborate with farmers and agronomists to ensure practical application effectiveness",
      completed: false
    }
  ]

  const completedCount = objectives.filter(obj => obj.completed).length

  return (
    <section id="objectives" className="py-20 bg-gradient-to-br from-sand-beige to-white">
      <div className="container-max section-padding">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-earth-brown mb-6">
            Project Objectives
          </h2>
          <div className="w-24 h-1 bg-earth-green mx-auto mb-8"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our systematic approach ensures comprehensive development and validation of the soil classification system
          </p>
        </div>

        {/* Progress Overview */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-earth-brown">Progress Overview</h3>
              <span className="text-earth-green font-semibold">{completedCount}/{objectives.length} Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-earth-green to-leaf-green h-3 rounded-full transition-all duration-500"
                style={{ width: `${(completedCount / objectives.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Objectives List */}
        <div className="max-w-4xl mx-auto space-y-6">
          {objectives.map((objective, index) => (
            <div 
              key={index}
              className={`bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 ${
                objective.completed ? 'border-l-4 border-earth-green' : 'border-l-4 border-gray-300'
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className={`flex-shrink-0 p-3 rounded-xl ${
                  objective.completed 
                    ? 'bg-earth-green text-white' 
                    : 'bg-gray-100 text-gray-400'
                }`}>
                  {objective.icon}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className={`text-lg font-semibold ${
                      objective.completed ? 'text-earth-brown' : 'text-gray-600'
                    }`}>
                      {objective.title}
                    </h3>
                    {objective.completed && (
                      <CheckCircle className="h-5 w-5 text-earth-green" />
                    )}
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    {objective.description}
                  </p>
                </div>

                <div className={`flex-shrink-0 px-3 py-1 rounded-full text-sm font-medium ${
                  objective.completed 
                    ? 'bg-earth-green/10 text-earth-green' 
                    : 'bg-gray-100 text-gray-500'
                }`}>
                  {objective.completed ? 'Complete' : 'In Progress'}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Next Steps */}
        <div className="max-w-2xl mx-auto mt-12 text-center">
          <div className="bg-earth-green/5 border border-earth-green/20 rounded-xl p-6">
            <h3 className="text-xl font-bold text-earth-brown mb-3">Next Milestone</h3>
            <p className="text-gray-600">
              Complete web/mobile interface development and begin comprehensive field validation testing
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Objectives