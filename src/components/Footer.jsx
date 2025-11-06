import React from 'react'
import { Leaf, Github, Mail, MapPin, Calendar, Linkedin } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-br from-earth-brown to-soil-dark text-white">
      <div className="container-max section-padding py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 bg-earth-green rounded-xl">
                <Leaf className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">SoilVision</h3>
                <p className="text-gray-300 text-sm">AI-Powered Soil Classification</p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed max-w-md mb-4">
              Revolutionizing agriculture through computer vision technology. 
              Our AI-powered soil texture classification system empowers farmers 
              with instant, accurate soil assessment capabilities.
            </p>
            <div className="mb-6">
              <p className="text-earth-green font-medium text-lg">
                📧 vigneshwarang782@gmail.com
              </p>
              <p className="text-gray-400 text-sm mt-1">Contact for inquiries and collaboration</p>
            </div>
            <div className="flex space-x-4">
              <a 
                href="mailto:vigneshwarang782@gmail.com" 
                className="p-2 bg-white/10 rounded-lg hover:bg-earth-green transition-colors duration-300"
                aria-label="Contact Email"
              >
                <Mail className="h-5 w-5" />
              </a>
              <a 
                href="https://www.linkedin.com/in/vigneshwaran-g-28211225a/" 
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/10 rounded-lg hover:bg-earth-green transition-colors duration-300"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Project Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Project Details</h4>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-earth-green" />
                <span className="text-sm">2025 Research Project</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-earth-green" />
                <span className="text-sm">Agricultural Technology</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-earth-green" />
                <a 
                  href="mailto:vigneshwarang782@gmail.com"
                  className="text-sm hover:text-earth-green transition-colors duration-300"
                >
                  Contact Developer
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="#about" className="text-sm hover:text-earth-green transition-colors duration-300">
                  About Project
                </a>
              </li>
              <li>
                <a href="#outcomes" className="text-sm hover:text-earth-green transition-colors duration-300">
                  Results
                </a>
              </li>
              <li>
                <a href="#impact" className="text-sm hover:text-earth-green transition-colors duration-300">
                  Impact
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Research Attribution */}
        <div className="border-t border-white/20 pt-8">
          <div className="bg-white/5 rounded-xl p-6 mb-6">
            <h4 className="text-lg font-semibold mb-3 text-earth-green">Research Project</h4>
            <p className="text-gray-300 text-sm leading-relaxed">
              <strong>Computer Vision-Based Soil Texture Classification Using Surface Image Analysis</strong><br/>
              This academic research project explores the application of convolutional neural networks 
              for automated soil texture classification, contributing to the advancement of precision 
              agriculture and sustainable farming practices.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {currentYear} SoilVision Research Project. Academic research for educational purposes.
          </p>
          <div className="flex items-center space-x-6 text-sm text-gray-400">
            <span>AI-Powered Agriculture</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer