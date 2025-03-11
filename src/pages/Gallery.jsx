import { motion } from 'framer-motion';
import { FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';

// Import SVG images
import birthdayPartySvg from '../assets/birthday_party.svg';
import playgroundSvg from '../assets/playground.svg';
import cakeSvg from '../assets/cake.svg';
import childrenActivitiesSvg from '../assets/children_activities.svg';
import breakfastSvg from '../assets/breakfast.svg';
import specialEventSvg from '../assets/special_event.svg';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

const images = [
  {
    src: birthdayPartySvg,
    alt: 'Doğum günü partisi',
    category: 'Doğum Günü'
  },
  {
    src: playgroundSvg,
    alt: 'Oyun alanı',
    category: 'Mekan'
  },
  {
    src: cakeSvg,
    alt: 'Pasta',
    category: 'Yiyecek'
  },
  {
    src: childrenActivitiesSvg,
    alt: 'Çocuk aktiviteleri',
    category: 'Aktiviteler'
  },
  {
    src: breakfastSvg,
    alt: 'Kahvaltı',
    category: 'Yiyecek'
  },
  {
    src: specialEventSvg,
    alt: 'Özel etkinlik',
    category: 'Etkinlikler'
  }
];

export default function Gallery() {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      className="relative isolate overflow-hidden bg-white py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          variants={fadeIn}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Galeri</h2>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            Mekanımızdan, etkinliklerimizden ve özel anlardan kareler
          </p>
        </motion.div>

        <motion.div
          variants={fadeIn}
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:grid-cols-2 lg:max-w-none lg:grid-cols-3"
        >
          {images.map((image, index) => (
            <motion.div
              key={index}
              variants={fadeIn}
              whileHover={{ scale: 1.05 }}
              className="relative overflow-hidden rounded-2xl"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="aspect-[3/2] w-full object-cover"
              />
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/60 to-transparent p-6">
                <p className="font-semibold text-white">{image.alt}</p>
                <p className="mt-2 text-sm text-white/70">{image.category}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={fadeIn}
          className="mx-auto mt-16 max-w-2xl text-center"
        >
          <p className="text-lg leading-8 text-gray-600">
            Daha fazla fotoğraf için sosyal medya hesaplarımızı takip edebilirsiniz.
          </p>
          <div className="mt-6 flex justify-center gap-x-6">
            <a
              href="https://instagram.com/mioboons"
              className="text-primary-600 hover:text-primary-500 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="w-6 h-6" />
            </a>
            <a
              href="https://facebook.com/mioboons"
              className="text-primary-600 hover:text-primary-500 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook className="w-6 h-6" />
            </a>
            <a
              href="https://twitter.com/mioboons"
              className="text-primary-600 hover:text-primary-500 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter className="w-6 h-6" />
            </a>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}