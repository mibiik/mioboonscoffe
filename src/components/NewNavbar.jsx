import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { navigationIcons } from './Icons';
import logo from '../assets/logo.svg';

const navigation = [
  { name: 'Ana Sayfa', href: '/' },
  { name: 'Hakkımızda', href: '/about' },
  { name: 'Menü', href: '/menu' },
  { name: 'Galeri', href: '/gallery' },
  { name: 'Oyunlar', href: '/games' },
  { name: 'Rezervasyon', href: '/reservation' },
  { name: 'İletişim', href: '/contact' }
].map(item => ({
  ...item,
  icon: navigationIcons[item.name]
}));

export default function NewNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();
  
  // Handle scroll effect for navbar visibility and styling
  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        // If scrolling down, hide the navbar
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
          setShowNavbar(false);
        } 
        // If scrolling up, show the navbar
        else if (window.scrollY < lastScrollY || window.scrollY < 50) {
          setShowNavbar(true);
        }
        
        // Update styling based on scroll position
        setIsScrolled(window.scrollY > 20);
        
        // Update last scroll position
        setLastScrollY(window.scrollY);
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', controlNavbar);

    // Cleanup function
    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [lastScrollY]);

  return (
    <header 
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${showNavbar ? 'translate-y-0' : '-translate-y-full'}`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-2 sm:py-3">
        <motion.div 
          className={`${isScrolled ? 'bg-white/95' : 'bg-white/90'} backdrop-blur-md rounded-2xl shadow-lg border border-gray-100/50 transition-all duration-300`}
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", damping: 20, stiffness: 100 }}
        >
          <div className="flex items-center justify-between px-4 py-2 sm:py-3">
            {/* Logo Section - Removed text as requested */}
            <Link to="/" className="flex-shrink-0 flex items-center">
              <motion.img 
                src={logo} 
                alt="Mio Boon's" 
                className="h-8 w-auto sm:h-10 md:h-12 drop-shadow-lg" 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              />
            </Link>
            
            {/* Mobile menu button */}
            <div className="flex items-center lg:hidden">
              <motion.button
                className="inline-flex items-center justify-center p-2 rounded-full text-gray-700 hover:text-primary-600 hover:bg-primary-50 focus:outline-none"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <span className="sr-only">{mobileMenuOpen ? 'Close menu' : 'Open menu'}</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </motion.button>
            </div>
            
            {/* Desktop navigation */}
            <div className="hidden lg:flex lg:items-center lg:justify-center lg:flex-1">
              <ul className="flex space-x-1 md:space-x-2 lg:space-x-4">
                {navigation.map((item) => {
                  const isActive = location.pathname === item.href;
                  const isSpecial = item.name === 'Oyunlar' || item.name === 'Rezervasyon';
                  
                  return (
                    <motion.li key={item.name} className="relative">
                      <Link
                        to={item.href}
                        className={`relative px-3 py-2 rounded-xl flex items-center gap-2 transition-all duration-300 ${isSpecial ? 'font-medium' : ''}`}
                      >
                        <motion.div
                          className={`absolute inset-0 rounded-xl ${isActive ? 
                            (item.name === 'Oyunlar' ? 'bg-gradient-to-r from-indigo-500/90 to-purple-600/90' : 
                             item.name === 'Rezervasyon' ? 'bg-gradient-to-r from-pink-500/90 to-rose-500/90' : 
                             'bg-primary-50') : ''}`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: isActive ? 1 : 0 }}
                          layoutId="navBackground"
                          transition={{ duration: 0.2 }}
                        />
                        
                        {/* Icon - Enhanced for Games section */}
                        {item.icon && (
                          <motion.div
                            className="relative z-10"
                            whileHover={item.name === 'Oyunlar' ? { scale: 1.2, rotate: 360 } : { rotate: 360 }}
                            transition={{ duration: 0.5 }}
                          >
                            <item.icon 
                              className={`${isActive ? 
                                (item.name === 'Oyunlar' || item.name === 'Rezervasyon' ? 'text-white' : 'text-primary-600') : 
                                item.name === 'Oyunlar' ? 'text-indigo-600' : 'text-gray-600'} 
                                ${item.name === 'Oyunlar' ? 'h-6 w-6' : 'h-5 w-5'}`} 
                            />
                          </motion.div>
                        )}
                        
                        {/* Text label */}
                        <span 
                          className={`relative z-10 text-sm font-medium ${isActive ? 
                            (item.name === 'Oyunlar' || item.name === 'Rezervasyon' ? 'text-white' : 'text-primary-700') : 
                            'text-gray-700'}`}
                        >
                          {item.name}
                        </span>
                        
                        {/* Underline effect for non-special items */}
                        {!isSpecial && !isActive && (
                          <motion.div
                            className="absolute bottom-0 left-0 h-0.5 bg-primary-600 w-0 group-hover:w-full"
                            whileHover={{ width: '100%' }}
                            transition={{ duration: 0.2 }}
                          />
                        )}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
            </div>
            
            {/* Right side - Action button */}
            <div className="hidden lg:flex lg:items-center">
              <Link to="/reservation">
                <motion.button
                  className="flex items-center justify-center px-4 py-2 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-md hover:shadow-lg transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-sm font-medium">Rezervasyon Yap</span>
                </motion.button>
              </Link>
            </div>
          </div>
          
          {/* Mobile navigation menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="px-2 pb-3 space-y-1.5 overflow-x-hidden"
              >
                <div className="py-2 px-2">
                  {navigation.map((item) => {
                    const isActive = location.pathname === item.href;
                    const isSpecial = item.name === 'Oyunlar' || item.name === 'Rezervasyon';
                    
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={`block w-full flex items-center gap-2 px-3 py-2.5 rounded-lg transition-all duration-300 ${isActive ? (isSpecial ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white' : 'bg-primary-50 text-primary-700') : 'text-gray-700 hover:bg-gray-50'}`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.icon && (
                          <item.icon className={`${isActive ? (isSpecial ? 'text-white' : 'text-primary-600') : 'text-gray-500'} h-5 w-5`} />
                        )}
                        <span className="font-medium text-sm">{item.name}</span>
                      </Link>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </header>
  );
}