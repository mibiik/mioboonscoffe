import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { navigationIcons, actionIcons } from '../components/Icons';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';

const features = [
  {
    title: 'Eğlence Dünyası',
    description: 'Çocuklarınız için özel tasarlanmış oyun alanlarında sınırsız eğlence ve macera.',
    icon: '🎮',
    color: 'bg-gradient-to-r from-purple-500 to-indigo-500'
  },
  {
    title: 'Özel Lezzetler',
    description: 'Taze malzemelerle hazırlanan, çocuk dostu özel menümüzle damak zevkinize hitap ediyoruz.',
    icon: '🍔',
    color: 'bg-gradient-to-r from-amber-500 to-orange-500'
  },
  {
    title: 'Unutulmaz Kutlamalar',
    description: 'Doğum günleri ve özel etkinlikleriniz için profesyonel organizasyon ve süsleme hizmetleri.',
    icon: '🎂',
    color: 'bg-gradient-to-r from-pink-500 to-rose-500'
  },
];

const quickActions = [
  {
    name: 'Rezervasyon',
    description: 'Hemen masa rezervasyonu yapın',
    href: '/reservation',
    icon: actionIcons['Rezervasyon Yap'],
    color: 'from-red-500 to-red-600'
  },
  {
    name: 'Menü',
    description: 'Lezzetli menümüzü inceleyin',
    href: '/menu',
    icon: actionIcons['Menüyü İncele'],
    color: 'from-emerald-500 to-green-600'
  },
  {
    name: 'Oyunlar',
    description: 'Eğlenceli oyunlarımızı keşfedin',
    href: '/games',
    icon: actionIcons['Oyunlar'],
    color: 'from-blue-500 to-indigo-600'
  },
  {
    name: 'İletişim',
    description: 'Bize ulaşın',
    href: '/contact',
    icon: actionIcons['İletişim'],
    color: 'from-purple-500 to-pink-600'
  }
];

export default function Home() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50">
      <div className="min-h-screen flex items-center justify-center py-8 px-3 sm:py-16 sm:px-4 lg:py-24 lg:px-8">
        <div className="w-full max-w-7xl">
          <div className="text-center">
            {/* Logo */}
            <div className="mb-8 sm:mb-12">
              <img 
                src={logo} 
                alt="Mio Boon's" 
                className="h-24 sm:h-32 md:h-40 lg:h-48 w-auto mx-auto drop-shadow-xl" 
              />
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5 mb-12 sm:mb-16 px-4 sm:px-0">
              <Link
                to="/reservation"
                className="w-full sm:w-auto rounded-full bg-gradient-to-r from-red-500 via-red-600 to-red-700 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-bold text-white shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 inline-flex items-center justify-center gap-2 sm:gap-3"
              >
                {React.createElement(actionIcons['Rezervasyon Yap'], { className: "h-5 w-5 sm:h-6 sm:w-6" })}
                Rezervasyon Yap
              </Link>
              <Link
                to="/menu"
                className="w-full sm:w-auto text-base sm:text-lg font-semibold leading-6 px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-xl hover:shadow-2xl transition-all inline-flex items-center justify-center gap-2 sm:gap-3 hover:scale-105 transform duration-300"
              >
                {React.createElement(actionIcons['Menüyü İncele'], { className: "h-5 w-5 sm:h-6 sm:w-6" })}
                Menüyü İncele
              </Link>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-gray-900 mb-4 sm:mb-6 font-serif px-4 sm:px-0">
              <span className="inline-block bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-transparent bg-clip-text drop-shadow-xl">
                Eğlence ve Lezzetin Buluşma Noktası
              </span>
            </h1>
            
            {/* Subtitle */}
            <p className="mt-3 sm:mt-4 text-lg sm:text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-16 sm:mb-24 px-4 sm:px-0">
              Çocuklarınızın güvenle eğlendiği, ailelerin keyifle vakit geçirdiği benzersiz bir mekan deneyimi
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto px-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div className={`w-12 h-12 sm:w-16 sm:h-16 ${feature.color} rounded-2xl flex items-center justify-center text-2xl sm:text-3xl mb-4 sm:mb-6 shadow-lg mx-auto`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 text-center">{feature.title}</h3>
                  <p className="text-sm sm:text-base text-gray-600 text-center">{feature.description}</p>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-12 sm:mt-16 px-4 sm:px-0">
              {quickActions.map((action) => (
                <Link
                  key={action.name}
                  to={action.href}
                  className={`group relative overflow-hidden rounded-xl sm:rounded-2xl p-4 sm:p-6 ${action.name === 'Rezervasyon' ? 'glow-effect' : ''}`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${action.color} opacity-90`} />
                  <div className="relative flex items-center gap-3 sm:gap-4">
                    <action.icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-white">{action.name}</h3>
                      <p className="text-xs sm:text-sm text-white/90">{action.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
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