import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronUp, Play, BarChart3, Camera, Image, Zap, Eye } from 'lucide-react'
import { Link } from 'react-scroll'
import { Link as RouterLink, useLocation } from 'react-router-dom'

const FloatingActionButton = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
        setIsOpen(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
    setIsOpen(false)
  }

  const quickActions = [
    {
      icon: <Play className="h-4 w-4" />,
      label: 'Analyze Soil',
      to: '/analysis',
      type: 'route',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      icon: <BarChart3 className="h-4 w-4" />,
      label: 'View Charts',
      to: '/analytics',
      type: 'route',
      color: 'from-green-500 to-emerald-600'
    },
    {
      icon: <Zap className="h-4 w-4" />,
      label: 'Features',
      to: 'features',
      type: 'scroll',
      color: 'from-purple-500 to-violet-600'
    },
    {
      icon: <Eye className="h-4 w-4" />,
      label: 'Results',
      to: 'outcomes',
      type: 'scroll',
      color: 'from-orange-500 to-red-600'
    }
  ]

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed bottom-6 right-6 z-40">
          {/* Quick Action Buttons */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="mb-4 space-y-3"
              >
                {quickActions.map((action, index) => (
                  <motion.div
                    key={action.to}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {action.type === 'route' ? (
                      <RouterLink
                        to={action.to}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center space-x-2 px-4 py-2 bg-gradient-to-r ${action.color} text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer text-sm font-medium whitespace-nowrap`}
                      >
                        {action.icon}
                        <span>{action.label}</span>
                      </RouterLink>
                    ) : (
                      // Use scroll navigation if on home page, route navigation if on other pages
                      location.pathname === '/' ? (
                        <Link
                          to={action.to}
                          spy={true}
                          smooth={true}
                          offset={-80}
                          duration={500}
                          onClick={() => setIsOpen(false)}
                          className={`flex items-center space-x-2 px-4 py-2 bg-gradient-to-r ${action.color} text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer text-sm font-medium whitespace-nowrap`}
                        >
                          {action.icon}
                          <span>{action.label}</span>
                        </Link>
                      ) : (
                        <RouterLink
                          to={`/#${action.to}`}
                          onClick={() => setIsOpen(false)}
                          className={`flex items-center space-x-2 px-4 py-2 bg-gradient-to-r ${action.color} text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer text-sm font-medium whitespace-nowrap`}
                        >
                          {action.icon}
                          <span>{action.label}</span>
                        </RouterLink>
                      )
                    )}
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main FAB */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="relative"
          >
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-14 h-14 bg-earth-green hover:bg-earth-green/90 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
            >
              <motion.div
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isOpen ? (
                  <ChevronUp className="h-6 w-6" />
                ) : (
                  <div className="grid grid-cols-2 gap-1">
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                  </div>
                )}
              </motion.div>
            </button>

            {/* Scroll to Top Button */}
            <motion.button
              onClick={scrollToTop}
              className="absolute -top-16 left-0 w-14 h-14 bg-earth-brown hover:bg-earth-brown/90 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronUp className="h-5 w-5" />
            </motion.button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default FloatingActionButton