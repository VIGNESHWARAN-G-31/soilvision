import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import InteractiveCharts from '../components/InteractiveCharts'
import Navbar from '../components/Navbar'
import ScrollProgress from '../components/ScrollProgress'
import { BarChart3, TrendingUp, PieChart, Activity, ArrowLeft } from 'lucide-react'

const AnalyticsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <ScrollProgress />
      <Navbar />
      
      {/* Header Section */}
      <div className="pt-20">
        <div className="container-max section-padding">
          {/* Back to Home Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Link
              to="/"
              className="inline-flex items-center space-x-2 px-4 py-2 bg-earth-green text-white rounded-lg hover:bg-earth-green/90 transition-colors duration-300 font-medium"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Home</span>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-earth-green/10 rounded-full mb-6">
              <BarChart3 className="h-8 w-8 text-earth-green" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-earth-brown mb-6">
              📊 Soil Analytics
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Explore comprehensive data insights and performance metrics from our AI-powered soil classification system
            </p>
          </motion.div>

          {/* Quick Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16"
          >
            {[
              { 
                icon: <TrendingUp className="h-6 w-6" />, 
                value: "90%+", 
                label: "Classification Accuracy", 
                color: "text-green-600",
                bg: "bg-green-50"
              },
              { 
                icon: <PieChart className="h-6 w-6" />, 
                value: "4", 
                label: "Soil Types Detected", 
                color: "text-purple-600",
                bg: "bg-purple-50"
              },
              { 
                icon: <BarChart3 className="h-6 w-6" />, 
                value: "<10s", 
                label: "Average Analysis Time", 
                color: "text-orange-600",
                bg: "bg-orange-50"
              }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className={`${stat.bg} rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300`}
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              >
                <div className={`inline-flex p-3 rounded-full bg-white ${stat.color} mb-4 shadow-sm`}>
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-earth-brown mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Interactive Charts Section */}
      <InteractiveCharts />
      
      {/* Additional Analytics Content */}
      <div className="py-20 bg-white">
        <div className="container-max section-padding">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-earth-brown mb-6">
              Performance Insights
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Detailed analysis of our AI system's performance across different soil types and conditions
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Accuracy by Soil Type */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold text-earth-brown mb-6">Accuracy by Soil Type</h3>
              <div className="space-y-4">
                {[
                  { type: "Sandy Soil", accuracy: 92, color: "bg-yellow-500" },
                  { type: "Clay Soil", accuracy: 89, color: "bg-red-500" },
                  { type: "Silt Soil", accuracy: 87, color: "bg-blue-500" },
                  { type: "Loam Soil", accuracy: 94, color: "bg-green-500" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="font-medium text-gray-700">{item.type}</span>
                    <div className="flex items-center space-x-3">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <motion.div
                          className={`h-2 rounded-full ${item.color}`}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.accuracy}%` }}
                          transition={{ duration: 1, delay: index * 0.2 }}
                        />
                      </div>
                      <span className="font-semibold text-earth-brown w-12">{item.accuracy}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Analysis Speed Distribution */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold text-earth-brown mb-6">Analysis Speed Distribution</h3>
              <div className="space-y-4">
                {[
                  { range: "5-7 seconds", percentage: 45, color: "bg-green-500" },
                  { range: "7-9 seconds", percentage: 35, color: "bg-green-400" },
                  { range: "9-10 seconds", percentage: 20, color: "bg-green-300" },
                  { range: "Guaranteed < 10s", percentage: 100, color: "bg-earth-green" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="font-medium text-gray-700">{item.range}</span>
                    <div className="flex items-center space-x-3">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <motion.div
                          className={`h-2 rounded-full ${item.color}`}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.percentage}%` }}
                          transition={{ duration: 1, delay: index * 0.2 }}
                        />
                      </div>
                      <span className="font-semibold text-earth-brown w-12">{item.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnalyticsPage