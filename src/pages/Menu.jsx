import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeIn, fadeInUp, staggerContainer } from '../animations';

// Import SVG images for menu categories
import cakeSvg from '../assets/cake.svg';
import breakfastSvg from '../assets/breakfast.svg';
import specialEventSvg from '../assets/special_event.svg';
import childrenActivitiesSvg from '../assets/children_activities.svg';

// Menu categories with color theme and emojis
const categories = [
  { id: 'desserts', name: 'Tatlılar ve Atıştırmalıklar', icon: cakeSvg, emoji: '🍰' },
  { id: 'main-dishes', name: 'Ana Yemekler ve Aperatifler', icon: childrenActivitiesSvg, emoji: '🍕' },
  { id: 'breakfast', name: 'Kahvaltılıklar', icon: breakfastSvg, emoji: '🍳' },
  { id: 'drinks', name: 'İçecekler', icon: specialEventSvg, emoji: '🥤' },
  { id: 'cocktails', name: 'Kokteyller ve Milkshake', icon: specialEventSvg, emoji: '🍹' },
  { id: 'coffee', name: 'Kahveler', icon: specialEventSvg, emoji: '☕' },
];

// Menu items data
const menuItems = {
  'desserts': [
    { name: 'Badem unlu kek', description: 'Özel tarifimizle hazırlanan badem unlu kek', price: 185 },
    { name: 'Cookie Brownie', description: 'Çikolata parçacıklı cookie brownie', price: 225 },
    { name: 'Cup Cake', description: 'Günlük taze hazırlanan cup cake', price: 130 },
    { name: 'Islak Kek', description: 'Çikolata soslu ıslak kek', price: 150 },
    { name: 'Cheesecake', description: 'Kremsi ve lezzetli cheesecake', price: 220 },
    { name: 'Brownie', description: 'Sıcak servis edilen çikolatalı brownie', price: 175 },
    { name: 'Starbucks Kurabiye', description: 'Starbucks tarzı özel kurabiye', price: 140 },
    { name: 'Kutu Kurabiye', description: 'Çeşitli kurabiyelerden oluşan kutu', price: 225 },
    { name: 'Ginger Bread', description: 'Geleneksel zencefilli kurabiye', price: 75 },
    { name: 'Elmalı Kurabiye', description: 'Taze elma parçacıklı kurabiye', price: 55 },
    { name: 'Makaron', description: 'Fransız tarzı renkli makaron', price: 55 },
    { name: 'Tuzlu Kurabiye', description: 'Özel malzemelerle hazırlanan lüks kurabiye', price: 35 },
  ],
  'main-dishes': [
    { name: 'Çıtır Tavuk', description: 'Çıtır kaplamalı tavuk, yanında patates kızartması ile', price: 350 },
    { name: 'Çocuk Pizza', description: 'Çocuklar için özel hazırlanan mini pizza', price: 300 },
    { name: 'Pizza', description: 'İtalyan usulü hazırlanan pizza', price: 475 },
    { name: 'Hamburger', description: 'Ev yapımı hamburger, yanında patates kızartması ile', price: 475 },
    { name: 'Köfte Salata', description: 'Izgara köfte ile taze mevsim salatası', price: 470 },
    { name: 'Köfte Makarna', description: 'Izgara köfte ile makarna', price: 470 },
    { name: 'Mantı', description: 'El açması mantı, yoğurt ve sos ile', price: 350 },
    { name: 'Schnitzel Salata', description: 'Tavuk schnitzel ile taze mevsim salatası', price: 425 },
    { name: 'Soslu Makarna', description: 'Seçiminize göre pesto veya domates soslu makarna', price: 350 },
    { name: 'Falafel Salata', description: 'Nohut köftesi ile taze mevsim salatası', price: 350 },
  ],
  'breakfast': [
    { name: 'Serpme Kahvaltı', description: 'Zengin içerikli serpme kahvaltı tabağı', price: 750 },
    { name: 'Mio Tost', description: 'Özel malzemelerle hazırlanan Mio tost', price: 225 },
  ],
  'drinks': [ 
    { name: 'Sıkma Meyve Suyu', description: 'Taze sıkılmış mevsim meyveleri', price: 225 },
    { name: 'Kutu Meyve Suyu', description: 'Çeşitli meyve suları', price: 45 },
    { name: 'Nesquik Süt', description: 'Çikolatalı süt', price: 45 },
    { name: 'Limonata', description: 'Ev yapımı taze limonata', price: 140 },
    { name: 'Ayran', description: 'Ev yapımı ayran', price: 90 },
    { name: 'Soda', description: 'Sade veya meyveli soda', price: 90 },
    { name: 'Kutu Kola', description: 'Soğuk kutu kola', price: 90 },
    { name: 'Ice Tea', description: 'Çeşitli aromalı ice tea', price: 90 },
    { name: 'Büyük Su', description: '1 lt su', price: 110 },
    { name: 'Su', description: '0.5 lt su', price: 50 },
    { name: 'Bitki Çayı', description: 'Çeşitli bitki çayları', price: 80 },
    { name: 'Yeşil Çay', description: 'Taze demlenen yeşil çay', price: 250 },
    { name: 'Çay', description: 'Geleneksel Türk çayı', price: 60 },
  ],
  'cocktails': [
    { name: 'Blue Ocean Mocktail', description: 'Alkolsüz mavi kokteyl', price: 195 },
    { name: 'Hawaiian Mocktail', description: 'Tropikal meyveli alkolsüz kokteyl', price: 195 },
    { name: 'Mandarin Mojito', description: 'Mandalinalı nane aromalı alkolsüz mojito', price: 195 },
    { name: 'Mio Red Mocktail', description: 'Mio\'nun özel kırmızı alkolsüz kokteyli', price: 195 },
    { name: 'Milkshake', description: 'Çeşitli aromalı milkshake', price: 195 },
  ],
  'coffee': [
    { name: 'Americano', description: 'Sıcak servis edilen americano', price: 150 },
    { name: 'Ice Americano', description: 'Soğuk servis edilen americano', price: 170 },
    { name: 'Cappuccino', description: 'İtalyan usulü cappuccino', price: 160 },
    { name: 'Cortado', description: 'Espresso ve az miktarda süt ile', price: 150 },
    { name: 'Espresso', description: 'Tek shot espresso', price: 110 },
    { name: 'Double Espresso', description: 'Çift shot espresso', price: 170 },
    { name: 'Türk Kahvesi', description: 'Geleneksel Türk kahvesi', price: 100 },
    { name: 'Double Türk Kahvesi', description: 'Çift Türk kahvesi', price: 150 },
    { name: 'Filtre Kahve', description: 'Günlük demlenen filtre kahve', price: 140 },
    { name: 'Flat White', description: 'Kremsi süt köpüğü ile espresso', price: 140 },
    { name: 'Ice Latte', description: 'Soğuk servis edilen latte', price: 180 },
    { name: 'Latte', description: 'Sıcak servis edilen latte', price: 150 },
    { name: 'Macchiato', description: 'Espresso üzerine az miktarda süt köpüğü', price: 160 },
    { name: 'Mocha', description: 'Çikolatalı espresso ve süt', price: 160 },
    { name: 'Churchill', description: 'Özel karışım kahve', price: 130 },
  ],
};

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState('desserts');
  const [expandedCategories, setExpandedCategories] = useState(categories.map(cat => cat.id));
  const menuRef = useRef(null);

  const scrollToCategory = (categoryId) => {
    setActiveCategory(categoryId);
    const element = document.getElementById(categoryId);
    if (element) {
      const container = document.querySelector('.overflow-x-auto');
      const button = document.querySelector(`[data-category="${categoryId}"]`);
      if (container && button) {
        const scrollLeft = button.offsetLeft - (container.offsetWidth / 2) + (button.offsetWidth / 2);
        container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
      }
      const headerOffset = 100; // Adjust this value to control the space from top
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Main content */}
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={fadeIn}
        className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8"
      >
        <h1 className="text-4xl font-light text-gray-900 text-center mb-12 font-sans tracking-tight">Lezzetin ve Eğlencenin Buluşma Noktası</h1>

        {/* Menu sections */}
        <div className="space-y-16" ref={menuRef}>
          {categories.map((category) => (
            <motion.section
              key={category.id}
              id={category.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="scroll-mt-24"
            >
              <div className="flex items-center space-x-4 mb-8">
                <span className="text-3xl">{category.emoji}</span>
                <h2 className="text-2xl font-light text-gray-800">{category.name}</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {menuItems[category.id].map((item, index) => (
                  <motion.div
                    key={`${category.id}-${index}`}
                    variants={fadeInUp}
                    className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                        <p className="text-sm text-gray-500 leading-relaxed">{item.description}</p>
                      </div>
                      <span className="text-lg font-bold text-emerald-600 whitespace-nowrap">{item.price} ₺</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          ))}
        </div>

        {/* Category navigation at the bottom */}
        <motion.nav
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-gray-200 py-4 px-4 z-50"
        >
          <div className="max-w-7xl mx-auto">
            <div className="flex overflow-x-auto hide-scrollbar gap-3 justify-center">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  data-category={category.id}
                  onClick={() => scrollToCategory(category.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full whitespace-nowrap transition-colors ${activeCategory === category.id ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>{category.emoji}</span>
                  <span className="text-sm font-medium inline-block">{category.name}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.nav>
      </motion.div>
    </div>
  );
}