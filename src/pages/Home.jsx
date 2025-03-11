import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { navigationIcons, actionIcons } from '../components/Icons';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';

// Animation variants
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

const slideIn = {
  initial: { opacity: 0, x: -30 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 30 }
};

const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Quick action links
const quickActions = [
  { 
    name: 'Menü', 
    href: '/menu', 
    description: 'Lezzetli yemekler ve içecekler', 
    icon: navigationIcons['Menü'], 
    color: 'from-primary-500 to-primary-600'
  },
  { 
    name: 'Rezervasyon', 
    href: '/reservation', 
    description: 'Online rezervasyon yapın', 
    icon: navigationIcons['Rezervasyon'], 
    color: 'from-secondary-500 to-secondary-600'
  },
  { 
    name: 'Doğum Günü', 
    href: '/birthday', 
    description: 'Özel günleriniz için organizasyon', 
    icon: navigationIcons['Doğum Günü'], 
    color: 'from-accent-500 to-accent-600'
  },
  { 
    name: 'İletişim', 
    href: '/contact', 
    description: 'Bize ulaşın', 
    icon: navigationIcons['İletişim'], 
    color: 'from-tertiary-500 to-tertiary-600'
  },
];

// Features section data
const features = [
  {
    title: 'Eğlence Dolu Anlar',
    description: 'Çocuklarınız için özel tasarlanmış eğlence alanlarımızda unutulmaz anılar biriktirin.',
    icon: '🎮',
    color: 'bg-gradient-to-r from-purple-500 to-indigo-500'
  },
  {
    title: 'Lezzetli Menüler',
    description: 'Hem çocuklar hem de yetişkinler için özenle hazırlanmış lezzetli menülerimiz.',
    icon: '🍔',
    color: 'bg-gradient-to-r from-amber-500 to-orange-500'
  },
  {
    title: 'Özel Organizasyonlar',
    description: 'Doğum günleri ve özel etkinlikler için profesyonel organizasyon hizmetimiz.',
    icon: '🎂',
    color: 'bg-gradient-to-r from-pink-500 to-rose-500'
  },
];

export default function Home() {
  const [scrollY, setScrollY] = useState(0);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      className="relative overflow-hidden"
    >
      {/* Hero Section with Animated Background */}
      <div className="relative isolate overflow-hidden min-h-[90vh] flex items-center justify-center pt-16">
        {/* Animated background */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-primary-100 via-secondary-100 to-accent-100"
            animate={{
              background: [
                'linear-gradient(to bottom right, #f5e9ff, #e6f9ff, #fff2e6)',
                'linear-gradient(to bottom right, #fff2e6, #e6f9ff, #f5e9ff)',
                'linear-gradient(to bottom right, #e6f9ff, #f5e9ff, #fff2e6)'
              ],
              scale: [1, 1.02, 1],
            }}
            transition={{ duration: 20, ease: 'linear', repeat: Infinity }}
          />
          
          {/* Animated particles */}
          <motion.div
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(150, 40, 255, 0.15) 0%, transparent 50%)',
              filter: 'blur(40px)'
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
              x: [-20, 20, -20],
              y: [-20, 20, -20]
            }}
            transition={{ duration: 8, ease: 'easeInOut', repeat: Infinity }}
          />
          
          {/* Animated grid pattern */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 1px, transparent 1px, transparent 10px)',
              backgroundSize: '30px 30px',
              opacity: 0.5
            }}
            animate={{
              backgroundPosition: ['0px 0px', '30px 30px', '0px 0px']
            }}
            transition={{ duration: 10, ease: 'linear', repeat: Infinity }}
          />
          
          {/* Floating shapes */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-white/10 backdrop-blur-md"
                style={{
                  width: `${Math.random() * 100 + 50}px`,
                  height: `${Math.random() * 100 + 50}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  border: '1px solid rgba(255,255,255,0.2)'
                }}
                animate={{
                  y: [0, Math.random() * 30 - 15, 0],
                  x: [0, Math.random() * 30 - 15, 0],
                  rotate: [0, Math.random() * 360, 0]
                }}
                transition={{
                  duration: Math.random() * 10 + 10,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              />
            ))}
          </div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 py-4 sm:py-6 lg:py-8 lg:px-8">
          <div className="flex flex-col items-center text-center">
            {/* Logo with enhanced animation */}
            <motion.div
              initial={{ opacity: 1, scale: 0.9, y: 0 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ 
                duration: 0.8, 
                type: "spring", 
                bounce: 0.3 
              }}
              className="mb-8 relative"
            >
              <motion.div
                className="absolute -inset-10 rounded-full bg-gradient-to-r from-primary-200/30 to-secondary-200/30 blur-xl"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 0.8, 0.5],
                  rotate: [0, 5, 0]
                }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              />
              <img 
                src={logo} 
                alt="Mio Boon's" 
                className="h-32 sm:h-40 md:h-48 lg:h-56 w-auto drop-shadow-2xl relative z-10" 
              />
            </motion.div>

            {/* CTA Buttons with enhanced animation */}
            <motion.div
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col sm:flex-row items-center gap-5 mb-12"
            >
              <Link
                to="/reservation"
                className="w-full sm:w-auto rounded-full bg-gradient-to-r from-red-500 via-red-600 to-red-700 px-8 py-4 text-lg font-bold text-white shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 inline-flex items-center justify-center gap-3 relative overflow-hidden group animate-pulse"
              >
                {React.createElement(actionIcons['Rezervasyon Yap'], { className: "h-6 w-6" })}
                Rezervasyon Yap
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                  animate={{ x: ['100%', '-100%'] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </Link>
              <Link
                to="/menu"
                className="w-full sm:w-auto text-lg font-semibold leading-6 px-8 py-4 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-xl hover:shadow-2xl transition-all inline-flex items-center justify-center gap-3 group relative overflow-hidden hover:scale-105 transform duration-300"
              >
                {React.createElement(actionIcons['Menüyü İncele'], { className: "h-6 w-6" })}
                Menüyü İncele
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"
                  animate={{ x: ['100%', '-100%'] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </Link>
            </motion.div>

            {/* Main heading with enhanced animation */}
            <motion.h1
              variants={fadeIn}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-gray-900 relative z-10 mb-6 font-serif"
            >
              <motion.span
                className="inline-block w-full font-black bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-transparent bg-clip-text drop-shadow-xl"
                style={{
                  backgroundSize: '200% auto',
                  textShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
                animate={{
                  backgroundPosition: ['0% center', '200% center', '0% center'],
                  scale: [1, 1.01, 1],
                }}
                transition={{ duration: 8, ease: 'easeInOut', repeat: Infinity }}
              >
                Mio Boon's ile Büyülü Anlar!
              </motion.span>
            </motion.h1>
            
            {/* Subtitle with enhanced animation */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-4 text-xl md:text-2xl text-gray-600 max-w-3xl"
            >
              Eğlence ve lezzetin buluşma noktasında, her anı özel, her gülümseme değerli!
            </motion.p>

            {/* Features Section */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="mt-24 mb-12"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.5 + index * 0.2 }}
                    className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                  >
                    <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-lg`}>
                      {feature.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

<div className="text-center mb-8">
  <h1 className="mega-brush-text mb-4">Mio Boon's ile Büyülü Anlar</h1>
  <p className="text-lg text-gray-600 max-w-2xl mx-auto">
    Çocuklarınız için eğlence dolu bir dünya, sizin için huzurlu bir mekan
  </p>
</div>

{/* Quick Actions */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
  {quickActions.map((action) => (
    <Link
      key={action.name}
      to={action.href}
      className={`group relative overflow-hidden rounded-2xl p-6 ${action.name === 'Rezervasyon' ? 'glow-effect' : ''}`}
    >
      <div className={`absolute inset-0 bg-gradient-to-r ${action.color} opacity-90`} />
      <div className="relative flex items-center gap-4">
        <action.icon className="h-8 w-8 text-white" />
        <div>
          <h3 className="text-lg font-semibold text-white">{action.name}</h3>
          <p className="text-sm text-white/90">{action.description}</p>
        </div>
      </div>
    </Link>
  ))}
</div>