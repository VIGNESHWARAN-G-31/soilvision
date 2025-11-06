import React from 'react'
import { motion } from 'framer-motion'
import { Leaf } from 'lucide-react'

const LoadingSpinner = ({ message = "Loading..." }) => {
  return (
    <div className="fixed inset-0 bg-white/90 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 mx-auto mb-4"
        >
          <div className="w-16 h-16 bg-earth-green rounded-full flex items-center justify-center">
            <Leaf className="h-8 w-8 text-white" />
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
          className="text-earth-brown font-medium"
        >
          {message}
        </motion.div>
        
        <div className="mt-4 w-48 h-1 bg-gray-200 rounded-full mx-auto overflow-hidden">
          <motion.div
            className="h-full bg-earth-green rounded-full"
            animate={{ x: [-200, 200] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
          />
        </div>
      </div>
    </div>
  )
}

export default LoadingSpinner