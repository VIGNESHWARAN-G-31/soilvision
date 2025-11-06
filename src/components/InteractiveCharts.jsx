import React, { useState, useEffect } from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement } from 'chart.js'
import { Bar, Doughnut, Line } from 'react-chartjs-2'
import { motion } from 'framer-motion'
import { TrendingUp, BarChart3, PieChart, Activity } from 'lucide-react'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement)

const InteractiveCharts = () => {
  const [activeChart, setActiveChart] = useState('accuracy')
  const [animationKey, setAnimationKey] = useState(0)

  // Accuracy Comparison Data
  const accuracyData = {
    labels: ['Traditional Lab Testing', 'Manual Field Assessment', 'Our AI System'],
    datasets: [
      {
        label: 'Accuracy (%)',
        data: [98, 65, 95],
        backgroundColor: [
          'rgba(74, 63, 53, 0.8)',
          'rgba(255, 138, 101, 0.8)',
          'rgba(76, 175, 80, 0.8)'
        ],
        borderColor: [
          'rgba(74, 63, 53, 1)',
          'rgba(255, 138, 101, 1)',
          'rgba(76, 175, 80, 1)'
        ],
        borderWidth: 2,
        borderRadius: 8,
      }
    ]
  }

  // Soil Type Distribution
  const soilTypeData = {
    labels: ['Sand', 'Clay', 'Loam', 'Silt'],
    datasets: [
      {
        data: [30, 25, 25, 20],
        backgroundColor: [
          'rgba(255, 193, 7, 0.8)',
          'rgba(255, 138, 101, 0.8)',
          'rgba(76, 175, 80, 0.8)',
          'rgba(54, 162, 235, 0.8)'
        ],
        borderColor: [
          'rgba(255, 193, 7, 1)',
          'rgba(255, 138, 101, 1)',
          'rgba(76, 175, 80, 1)',
          'rgba(54, 162, 235, 1)'
        ],
        borderWidth: 3,
      }
    ]
  }

  // Performance Over Time
  const performanceData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
    datasets: [
      {
        label: 'Model Accuracy (%)',
        data: [78, 82, 87, 91, 94, 95],
        borderColor: 'rgba(76, 175, 80, 1)',
        backgroundColor: 'rgba(76, 175, 80, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: 'rgba(76, 175, 80, 1)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 6,
      }
    ]
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            family: 'Poppins',
            size: 12
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleFont: {
          family: 'Poppins'
        },
        bodyFont: {
          family: 'Poppins'
        }
      }
    },
    animation: {
      duration: 2000,
      easing: 'easeInOutQuart'
    }
  }

  const charts = [
    {
      id: 'accuracy',
      title: 'Accuracy Comparison',
      icon: <BarChart3 className="h-5 w-5" />,
      component: <Bar data={accuracyData} options={chartOptions} />,
      description: 'Comparing accuracy between different soil assessment methods'
    },
    {
      id: 'distribution',
      title: 'Soil Type Distribution',
      icon: <PieChart className="h-5 w-5" />,
      component: <Doughnut data={soilTypeData} options={chartOptions} />,
      description: 'Distribution of soil types in our training dataset'
    },
    {
      id: 'performance',
      title: 'Training Progress',
      icon: <Activity className="h-5 w-5" />,
      component: <Line data={performanceData} options={chartOptions} />,
      description: 'Model accuracy improvement during training process'
    }
  ]

  useEffect(() => {
    setAnimationKey(prev => prev + 1)
  }, [activeChart])

  return (
    <section className="py-20 bg-gradient-to-br from-white to-sand-beige">
      <div className="container-max section-padding">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-earth-brown mb-6"
          >
            Performance Analytics
          </motion.h2>
          <div className="w-24 h-1 bg-earth-green mx-auto mb-8"></div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            Interactive data visualizations showcasing the effectiveness and performance metrics of our AI-powered soil classification system
          </motion.p>
        </div>

        {/* Chart Navigation */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {charts.map((chart) => (
            <button
              key={chart.id}
              onClick={() => setActiveChart(chart.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeChart === chart.id
                  ? 'bg-earth-green text-white shadow-lg'
                  : 'bg-white text-earth-brown hover:bg-earth-green/10 shadow-md'
              }`}
            >
              {chart.icon}
              <span>{chart.title}</span>
            </button>
          ))}
        </motion.div>

        {/* Chart Display */}
        <motion.div 
          key={animationKey}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-8"
        >
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-earth-brown mb-2">
              {charts.find(c => c.id === activeChart)?.title}
            </h3>
            <p className="text-gray-600">
              {charts.find(c => c.id === activeChart)?.description}
            </p>
          </div>
          
          <div className="h-96">
            {charts.find(c => c.id === activeChart)?.component}
          </div>
        </motion.div>

        {/* Key Insights */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="bg-white rounded-xl p-6 shadow-md text-center">
            <div className="text-3xl font-bold text-earth-green mb-2">90%</div>
            <div className="text-earth-brown font-medium mb-1">AI Accuracy</div>
            <div className="text-sm text-gray-600">Near lab-quality results</div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-md text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">Real-time</div>
            <div className="text-earth-brown font-medium mb-1">Analysis</div>
            <div className="text-sm text-gray-600">Instant soil classification</div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-md text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">4</div>
            <div className="text-earth-brown font-medium mb-1">Soil Types</div>
            <div className="text-sm text-gray-600">Complete classification system</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default InteractiveCharts