import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Send, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';

const NavBar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    // Close mobile menu when route changes
    setMobileMenuOpen(false);
  }, [location.pathname]);
  
  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled || currentUser ? 'bg-white shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2">
            <div className="bg-indigo-900 p-2 rounded">
              <Send className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-indigo-900">RatanAI</span>
          </NavLink>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <NavLink 
              to="/"
              className={({ isActive }) => 
                `text-gray-700 hover:text-indigo-900 font-medium ${isActive ? 'text-indigo-900' : ''}`
              }
            >
              Home
            </NavLink>
            <NavLink 
              to="/#features"
              className="text-gray-700 hover:text-indigo-900 font-medium"
            >
              Features
            </NavLink>
            {currentUser ? (
              <>
                <NavLink 
                  to="/dashboard"
                  className={({ isActive }) => 
                    `text-gray-700 hover:text-indigo-900 font-medium ${isActive ? 'text-indigo-900' : ''}`
                  }
                >
                  Dashboard
                </NavLink>
                <button 
                  onClick={() => logout()}
                  className="btn-outline py-2 px-4"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <a 
                href="https://t.me/RatanAI_Bot"
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-primary py-2 px-4"
              >
                Get Started
              </a>
            )}
          </nav>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden text-gray-900"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white"
          >
            <div className="container-custom py-4 flex flex-col space-y-4">
              <NavLink 
                to="/"
                className={({ isActive }) => 
                  `text-gray-700 hover:text-indigo-900 font-medium ${isActive ? 'text-indigo-900' : ''} p-2`
                }
              >
                Home
              </NavLink>
              <NavLink 
                to="/#features"
                className="text-gray-700 hover:text-indigo-900 font-medium p-2"
              >
                Features
              </NavLink>
              {currentUser ? (
                <>
                  <NavLink 
                    to="/dashboard"
                    className={({ isActive }) => 
                      `text-gray-700 hover:text-indigo-900 font-medium ${isActive ? 'text-indigo-900' : ''} p-2`
                    }
                  >
                    Dashboard
                  </NavLink>
                  <button 
                    onClick={() => logout()}
                    className="btn-outline"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <a 
                  href="https://t.me/RatanAI_Bot"
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  Get Started
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default NavBar;