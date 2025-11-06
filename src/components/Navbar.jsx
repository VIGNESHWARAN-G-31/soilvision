import React, { useState, useEffect } from 'react'
import { Link } from 'react-scroll'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { Menu, X, Leaf } from 'lucide-react'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Home', to: 'hero', type: 'scroll' },
    { name: 'Try Demo', to: '/analysis', type: 'route' },
    { name: 'About', to: 'about', type: 'scroll' },
    { name: 'Features', to: 'features', type: 'scroll' },
    { name: 'Analytics', to: '/analytics', type: 'route' },
    { name: 'Results', to: 'outcomes', type: 'scroll' }
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container-max section-padding">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-earth-green rounded-xl">
              <Leaf className="h-6 w-6 text-white" />
            </div>
            <span className={`text-xl font-bold ${
              isScrolled ? 'text-earth-brown' : 'text-white'
            }`}>
              SoilVision
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              item.type === 'route' ? (
                <RouterLink
                  key={item.name}
                  to={item.to}
                  className={`cursor-pointer font-medium transition-colors hover:text-earth-green ${
                    isScrolled ? 'text-earth-brown' : 'text-white'
                  }`}
                >
                  {item.name}
                </RouterLink>
              ) : (
                // Use scroll navigation if on home page, route navigation if on other pages
                location.pathname === '/' ? (
                  <Link
                    key={item.name}
                    to={item.to}
                    spy={true}
                    smooth={true}
                    offset={-80}
                    duration={500}
                    className={`cursor-pointer font-medium transition-colors hover:text-earth-green ${
                      isScrolled ? 'text-earth-brown' : 'text-white'
                    }`}
                  >
                    {item.name}
                  </Link>
                ) : (
                  <RouterLink
                    key={item.name}
                    to={`/#${item.to}`}
                    className={`cursor-pointer font-medium transition-colors hover:text-earth-green ${
                      isScrolled ? 'text-earth-brown' : 'text-white'
                    }`}
                  >
                    {item.name}
                  </RouterLink>
                )
              )
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden p-2 ${
              isScrolled ? 'text-earth-brown' : 'text-white'
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="py-4 space-y-2">
              {navItems.map((item) => (
                item.type === 'route' ? (
                  <RouterLink
                    key={item.name}
                    to={item.to}
                    className="block px-4 py-2 text-earth-brown font-medium cursor-pointer hover:bg-sand-beige transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </RouterLink>
                ) : (
                  // Use scroll navigation if on home page, route navigation if on other pages
                  location.pathname === '/' ? (
                    <Link
                      key={item.name}
                      to={item.to}
                      spy={true}
                      smooth={true}
                      offset={-80}
                      duration={500}
                      className="block px-4 py-2 text-earth-brown font-medium cursor-pointer hover:bg-sand-beige transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <RouterLink
                      key={item.name}
                      to={`/#${item.to}`}
                      className="block px-4 py-2 text-earth-brown font-medium cursor-pointer hover:bg-sand-beige transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </RouterLink>
                  )
                )
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar