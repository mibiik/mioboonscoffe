import { motion } from 'framer-motion';
import { navigationIcons, contactIcons } from './Icons';
import { Link } from 'react-router-dom';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

const socialLinks = [
  { name: 'Instagram', href: 'https://instagram.com/mioboons', icon: '📸' },
  { name: 'Facebook', href: 'https://facebook.com/mioboons', icon: '👥' },
  { name: 'Twitter', href: 'https://twitter.com/mioboons', icon: '🐦' },
];

export default function Footer() {
  return (
    <motion.footer
      initial="initial"
      animate="animate"
      exit="exit"
      className="bg-white/80 backdrop-blur-md mt-8 sm:mt-12 lg:mt-16 border-t border-gray-100"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8 sm:py-10 md:py-12 flex flex-col md:flex-row md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-4 sm:space-x-6 md:order-2">
          {socialLinks.map((item) => (
            <motion.a
              key={item.name}
              href={item.href}
              className="text-gray-600 hover:text-primary-600 text-xl sm:text-2xl"
              whileHover={{ scale: 1.2, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
            >
              <span className="sr-only">{item.name}</span>
              {item.icon}
            </motion.a>
          ))}
        </div>
        <div className="mt-6 sm:mt-8 md:order-1 md:mt-0">
          <motion.p
            variants={fadeIn}
            className="text-center md:text-left text-xs leading-5 text-gray-500"
          >
            &copy; {new Date().getFullYear()} Mio Boon's. Tüm hakları saklıdır.
          </motion.p>
        </div>
      </div>
    </motion.footer>
  );
}