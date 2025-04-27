import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeIn, fadeInUp, staggerContainer } from '../animations';
import { updateMenuImages } from '../utils/imageService';

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
// Import product images
import defaultProductImage from '../assets/menu/desserts/placeholder.jpg';
import mainDishImage from '../assets/menu/main-dishes/placeholder.jpg';
import drinkImage from '../assets/menu/drinks/placeholder.jpg';
import kruvasanImage from '../assets/menu/desserts/desserts-kruvasan.jpg';
import brownieImage from '../assets/menu/desserts/desserts-brownie.jpg';
import elmaliKurabiyeImage from '../assets/menu/desserts/desserts-elmalı-kurabiye.jpg';
import makaronImage from '../assets/menu/desserts/desserts-makaron.jpg';

const menuItems = {
  'desserts': [
    { name: 'Badem unlu kek', description: 'Özel tarifimizle hazırlanan badem unlu kek', price: 185, image: defaultProductImage },
    { name: 'Cookie Brownie', description: 'Çikolata parçacıklı cookie brownie', price: 225, image: defaultProductImage },
    { name: 'Cup Cake', description: 'Günlük taze hazırlanan cup cake', price: 130, image: defaultProductImage },
    { name: 'Islak Kek', description: 'Çikolata soslu ıslak kek', price: 150, image: defaultProductImage },
    { name: 'Cheesecake', description: 'Kremsi ve lezzetli cheesecake', price: 220, image: defaultProductImage },
    { name: 'Brownie', description: 'Sıcak servis edilen çikolatalı brownie', price: 175, image: brownieImage },
    { name: 'Starbucks Kurabiye', description: 'Starbucks tarzı özel kurabiye', price: 140, image: defaultProductImage },
    { name: 'Kutu Kurabiye', description: 'Çeşitli kurabiyelerden oluşan kutu', price: 225, image: defaultProductImage },
    { name: 'Ginger Bread', description: 'Geleneksel zencefilli kurabiye', price: 75, image: defaultProductImage },
    { name: 'Elmalı Kurabiye', description: 'Taze elma parçacıklı kurabiye', price: 55, image: elmaliKurabiyeImage },
    { name: 'Makaron', description: 'Fransız tarzı renkli makaron', price: 55, image: makaronImage },
    { name: 'Tuzlu Kurabiye', description: 'Özel malzemelerle hazırlanan lüks kurabiye', price: 35, image: defaultProductImage },
  ],
  'main-dishes': [
    { name: 'Çıtır Tavuk', description: 'Çıtır kaplamalı tavuk, yanında patates kızartması ile', price: 350, image: mainDishImage },
    { name: 'Çocuk Pizza', description: 'Çocuklar için özel hazırlanan mini pizza', price: 300, image: mainDishImage },
    { name: 'Pizza', description: 'İtalyan usulü hazırlanan pizza', price: 525, image: mainDishImage },
    { name: 'Hamburger', description: 'Ev yapımı hamburger, yanında patates kızartması ile', price: 475, image: mainDishImage },
    { name: 'Köfte Salata', description: 'Izgara köfte ile taze mevsim salatası', price: 470, image: mainDishImage },
    { name: 'Köfte Makarna', description: 'Izgara köfte ile makarna', price: 470, image: mainDishImage },
    { name: 'Mantı', description: 'El açması mantı, yoğurt ve sos ile', price: 475, image: mainDishImage },
    { name: 'Çocuk Mantı', description: 'El açması mantı, yoğurt ve sos ile', price: 350, image: mainDishImage },
    { name: 'Schnitzel Salata', description: 'Tavuk schnitzel ile taze mevsim salatası', price: 425, image: mainDishImage },
    { name: 'Soslu Makarna', description: 'Seçiminize göre pesto veya domates soslu makarna', price: 350, image: mainDishImage },
    { name: 'Falafel Salata', description: 'Nohut köftesi ile taze mevsim salatası', price: 350, image: mainDishImage },
  ],
  'breakfast': [
    { name: 'Serpme Kahvaltı', description: 'Zengin içerikli serpme kahvaltı tabağı', price: 750, image: mainDishImage },
    { name: 'Mio Tost', description: 'Özel malzemelerle hazırlanan Mio tost', price: 225, image: mainDishImage },
  ],
  'drinks': [ 
    { name: 'Sıkma Meyve Suyu', description: 'Taze sıkılmış mevsim meyveleri', price: 225, image: drinkImage },
    { name: 'Kutu Meyve Suyu', description: 'Çeşitli meyve suları', price: 45, image: drinkImage },
    { name: 'Nesquik Süt', description: 'Çikolatalı süt', price: 45, image: drinkImage },
    { name: 'Limonata', description: 'Ev yapımı taze limonata', price: 140, image: drinkImage },
    { name: 'Ayran', description: 'Ev yapımı ayran', price: 90, image: drinkImage },
    { name: 'Soda', description: 'Sade veya meyveli soda', price: 90, image: drinkImage },
    { name: 'Kutu Kola', description: 'Soğuk kutu kola', price: 90, image: drinkImage },
    { name: 'Ice Tea', description: 'Çeşitli aromalı ice tea', price: 90, image: drinkImage },
    { name: 'Büyük Su', description: '1 lt su', price: 110, image: drinkImage },
    { name: 'Su', description: '0.5 lt su', price: 50, image: drinkImage },
    { name: 'Bitki Çayı', description: 'Çeşitli bitki çayları', price: 80, image: drinkImage },
    { name: 'Yeşil Çay', description: 'Taze demlenen yeşil çay', price: 250, image: drinkImage },
    { name: 'Çay', description: 'Geleneksel Türk çayı', price: 60, image: drinkImage },
  ],
  'cocktails': [
    { name: 'Blue Ocean Mocktail', description: 'Alkolsüz mavi kokteyl', price: 195, image: drinkImage },
    { name: 'Hawaiian Mocktail', description: 'Tropikal meyveli alkolsüz kokteyl', price: 195, image: drinkImage },
    { name: 'Mandarin Mojito', description: 'Mandalinalı nane aromalı alkolsüz mojito', price: 195, image: drinkImage },
    { name: 'Mio Red Mocktail', description: 'Mio\'nun özel kırmızı alkolsüz kokteyli', price: 195, image: drinkImage },
    { name: 'Milkshake', description: 'Çeşitli aromalı milkshake', price: 195, image: drinkImage },
  ],
  'coffee': [
    { name: 'Americano', description: 'Sıcak servis edilen americano', price: 150, image: drinkImage },
    { name: 'Ice Americano', description: 'Soğuk servis edilen americano', price: 170, image: drinkImage },
    { name: 'Cappuccino', description: 'İtalyan usulü cappuccino', price: 160, image: drinkImage },
    { name: 'Cortado', description: 'Espresso ve az miktarda süt ile', price: 150, image: drinkImage },
    { name: 'Espresso', description: 'Tek shot espresso', price: 110, image: drinkImage },
    { name: 'Double Espresso', description: 'Çift shot espresso', price: 170, image: drinkImage },
    { name: 'Türk Kahvesi', description: 'Geleneksel Türk kahvesi', price: 100, image: drinkImage },
    { name: 'Double Türk Kahvesi', description: 'Çift Türk kahvesi', price: 150, image: drinkImage },
    { name: 'Filtre Kahve', description: 'Günlük demlenen filtre kahve', price: 140, image: drinkImage },
    { name: 'Flat White', description: 'Kremsi süt köpüğü ile espresso', price: 140, image: drinkImage },
    { name: 'Ice Latte', description: 'Soğuk servis edilen latte', price: 180, image: drinkImage },
    { name: 'Latte', description: 'Sıcak servis edilen latte', price: 150, image: drinkImage },
    { name: 'Macchiato', description: 'Espresso üzerine az miktarda süt köpüğü', price: 160, image: drinkImage },
    { name: 'Mocha', description: 'Çikolatalı espresso ve süt', price: 160, image: drinkImage },
    { name: 'Churchill', description: 'Özel karışım kahve', price: 130, image: drinkImage },
  ],
};

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState('desserts');
  const [expandedCategories, setExpandedCategories] = useState(categories.map(cat => cat.id));
  const [menuData, setMenuData] = useState(menuItems);
  const [expandedItems, setExpandedItems] = useState({});
  const menuRef = useRef(null);

  const toggleItemExpansion = (categoryId, itemIndex) => {
    setExpandedItems(prev => ({
      ...prev,
      [`${categoryId}-${itemIndex}`]: !prev[`${categoryId}-${itemIndex}`]
    }));
  };

  useEffect(() => {
    const fetchImages = async () => {
      const updatedMenuItems = await updateMenuImages(menuItems);
      setMenuData(updatedMenuItems);
    };
    fetchImages();
  }, []);

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
              <div className="flex flex-col items-center space-y-4 mb-8 w-full">
                <div className="w-full px-6 py-2 bg-gradient-to-r from-emerald-100 to-green-100 shadow-sm">
                  <div className="flex items-center justify-center space-x-4 max-w-7xl mx-auto">
                    <span className="text-4xl">{category.emoji}</span>
                    <h2 className="text-3xl font-semibold text-gray-800">{category.name}</h2>
                  </div>
                </div>
              </div>

              <div className="flex flex-col space-y-4">
                {menuData[category.id].map((item, index) => (
                  <motion.div
                    key={`${category.id}-${index}`}
                    variants={fadeInUp}
                    className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
                  >
                    <div 
                      className="p-4 cursor-pointer flex justify-between items-center"
                      onClick={() => toggleItemExpansion(category.id, index)}
                    >
                      <div className="space-y-1">
                        <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                        <p className="text-sm text-gray-500">{item.description}</p>
                        <span className="text-lg font-bold text-emerald-600">{item.price} ₺</span>
                      </div>
                      <motion.div
                        animate={{ rotate: expandedItems[`${category.id}-${index}`] ? 180 : 0 }}
                        className="text-gray-400"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </motion.div>
                    </div>
                    <AnimatePresence>
                      {expandedItems[`${category.id}-${index}`] && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="border-t border-gray-100"
                        >
                          <div className="aspect-video overflow-hidden bg-gray-100">
                            <img
                              src={item.image || defaultProductImage}
                              alt={item.name}
                              className="w-full h-full object-cover"
                              onError={(e) => e.target.src = defaultProductImage}
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
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
          className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-emerald-600 to-green-700 backdrop-blur-lg border-t-4 border-emerald-800 py-4 px-4 z-50 shadow-xl overflow-x-auto"
          style={{ maxHeight: '100vh' }}
        >
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex gap-3 justify-start flex-1" style={{ scrollBehavior: 'smooth' }}>
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  data-category={category.id}
                  onClick={() => scrollToCategory(category.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full whitespace-nowrap transition-colors text-sm border-2 border-black ${activeCategory === category.id ? 'bg-white text-emerald-700 shadow-lg' : 'bg-emerald-600/50 text-white hover:bg-white/20'}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-xl">{category.emoji}</span>
                  <span className="font-medium inline-block">{category.name}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.nav>
      </motion.div>
    </div>
  );
}
