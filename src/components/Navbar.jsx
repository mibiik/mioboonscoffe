import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { navigationIcons } from './Icons';

const navItems = [
  { id: 'menu', name: 'Menü', icon: navigationIcons['Menü'] },
  { id: 'games', name: 'Oyunlar', icon: navigationIcons['Oyunlar'] },
  { id: 'reservation', name: 'Rezervasyonlar', icon: navigationIcons['Rezervasyon'], highlight: true },
  { id: 'contact', name: 'İletişim', icon: navigationIcons['İletişim'] },
  { id: 'about', name: 'Hakkımızda', icon: navigationIcons['Hakkımızda'] },
];

function Navbar({ activeSection, onSectionChange }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'py-1 sm:py-2' : 'py-2 sm:py-4'}`}>
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <motion.div 
          className={`${isScrolled ? 'bg-white' : 'bg-white'} rounded-xl sm:rounded-2xl shadow-xl border border-gray-100 transition-all duration-300`}
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", damping: 20, stiffness: 100 }}
        >
          <div className="flex items-center justify-between h-14 sm:h-16 px-3 sm:px-4 lg:px-6">
            {/* Logo or Brand Name */}
            <div className="flex items-center">
              <motion.div
                className="text-lg sm:text-xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Mio Boon's
              </motion.div>
            </div>
            
            {/* Mobile menu button */}
            <div className="flex items-center sm:hidden">
              <motion.button
                className="inline-flex items-center justify-center p-1.5 rounded-md text-gray-700 hover:text-primary-600 hover:bg-primary-50 focus:outline-none"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </motion.button>
            </div>
            
            {/* Desktop navigation */}
            <div className="hidden sm:flex sm:items-center sm:justify-center sm:flex-1">
              <ul className="flex space-x-1 md:space-x-4">
                {navItems.map((item) => {
                  const isActive = activeSection === item.id;
                  const isHighlighted = item.highlight;
                  const isGames = item.id === 'games';
                  
                  return (
                    <motion.li key={item.id} className="relative">
                      <motion.button
                        onClick={() => onSectionChange(item.id)}
                        onHoverStart={() => setHoveredItem(item.id)}
                        onHoverEnd={() => setHoveredItem(null)}
                        className={`relative px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl flex items-center gap-1.5 sm:gap-2.5 transition-all duration-300 ${isHighlighted ? 'font-medium' : ''}`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {/* Background highlight */}
                        {isActive && (
                          <motion.div 
                            layoutId="activeNavBackground"
                            className={`absolute inset-0 rounded-lg sm:rounded-xl ${isGames ? 'bg-gradient-to-r from-indigo-500/90 to-purple-600/90' : item.id === 'reservation' ? 'bg-gradient-to-r from-pink-500/90 to-rose-500/90' : 'bg-primary-50'}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                          />
                        )}
                        
                        {/* Hover effect */}
                        <AnimatePresence>
                          {hoveredItem === item.id && !isActive && (
                            <motion.div 
                              className={`absolute inset-0 rounded-lg sm:rounded-xl ${isGames ? 'bg-gradient-to-r from-indigo-500/10 to-purple-600/10' : item.id === 'reservation' ? 'bg-gradient-to-r from-pink-500/10 to-rose-500/10' : 'bg-primary-50/50'}`}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.2 }}
                            />
                          )}
                        </AnimatePresence>
                        
                        {/* Icon without rotation animation */}
                        <div className="relative z-10">
                          {item.icon && (
                            <item.icon 
                              className={`${isActive ? (isGames || item.id === 'reservation') ? 'text-white' : 'text-primary-600' : 'text-gray-600'} h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 transition-colors duration-300`} 
                            />
                          )}
                        </div>
                        
                        {/* Text label */}
                        <span className={`relative z-10 text-xs sm:text-sm md:text-base font-medium ${isActive ? (isGames || item.id === 'reservation') ? 'text-white' : 'text-primary-700' : 'text-gray-700'}`}>
                          {item.name}
                        </span>
                        
                        {/* Indicator dot for active items */}
                        {isActive && !isGames && item.id !== 'reservation' && (
                          <motion.div 
                            className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-primary-600"
                            layoutId="activeIndicator"
                          />
                        )}
                      </motion.button>
                    </motion.li>
                  );
                })}
              </ul>
            </div>
            
            {/* Right side - Action button */}
            <div className="hidden sm:flex items-center">
              <motion.button
                className="flex items-center justify-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-md hover:shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-xs sm:text-sm font-medium">Rezervasyon</span>
              </motion.button>
            </div>
          </div>
          
          {/* Mobile navigation menu */}
          <div className="sm:hidden overflow-hidden">
            <AnimatePresence>
              {mobileMenuOpen && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-3 pb-3 space-y-1.5"
                >
                  {navItems.map((item) => {
                    const isActive = activeSection === item.id;
                    const isGames = item.id === 'games';
                    return (
                      <motion.button
                        key={item.id}
                        onClick={() => {
                          onSectionChange(item.id);
                          setMobileMenuOpen(false);
                        }}
                        className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-lg transition-all duration-300 ${isActive ? isGames ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white' : item.id === 'reservation' ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white' : 'bg-primary-50 text-primary-700' : 'text-gray-700 hover:bg-gray-50'}`}
                        whileHover={{ x: 5 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {item.icon && (
                          <item.icon className={`${isActive ? (isGames || item.id === 'reservation') ? 'text-white' : 'text-primary-600' : 'text-gray-500'} h-4 w-4 sm:h-5 sm:w-5`} />
                        )}
                        <span className="font-medium text-sm">{item.name}</span>
                      </motion.button>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </nav>
  );
}

export default Navbar;