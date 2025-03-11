import React from 'react';
import { motion } from 'framer-motion';

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
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const features = [
  {
    name: 'Güvenli Oyun Alanı',
    description: 'Çocuklarınız için özel tasarlanmış, güvenli ve eğlenceli oyun alanları.',
    icon: '🛝',
    color: 'from-blue-500 to-cyan-400'
  },
  {
    name: 'Profesyonel Ekip',
    description: 'Deneyimli oyun ablalarımız ve eğitimli personelimiz ile hizmetinizdeyiz.',
    icon: '👨‍👩‍👧‍👦',
    color: 'from-purple-500 to-indigo-500'
  },
  {
    name: 'Lezzetli Menü',
    description: 'Çocuklar ve yetişkinler için özenle hazırlanmış özel menüler.',
    icon: '🍔',
    color: 'from-amber-500 to-orange-400'
  },
  {
    name: 'Özel Organizasyonlar',
    description: 'Doğum günü partileri ve özel etkinlikler için profesyonel organizasyon hizmeti.',
    icon: '🎂',
    color: 'from-pink-500 to-rose-400'
  },
];

const aboutContent = {
  vision: 'Çocukların güvenle eğlenebileceği, ailelerin huzurla vakit geçirebileceği, İstanbul\'un en sevilen aile mekanı olmak.',
  mission: 'Modern ve güvenli oyun alanları, lezzetli menüler ve profesyonel hizmet anlayışıyla ailelere unutulmaz deneyimler sunmak.',
  description: '2023 yılında İstanbul\'da kurulan Mio Boon\'s, çocuklar ve aileler için özel olarak tasarlanmış bir yaşam alanıdır. Güvenli oyun alanları, özel menüler ve profesyonel ekibimizle misafirlerimize en iyi hizmeti sunmayı hedefliyoruz. Modern ve ferah mekanımızda, çocukların eğlenceli vakit geçirebileceği, ailelerin huzurla dinlenebileceği bir ortam yaratıyoruz.'
};


export default function About() {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      className="relative isolate overflow-hidden bg-white"
    >
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-indigo-100/20 pt-14">
        <div
          className="absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:-mr-80 lg:-mr-96"
          aria-hidden="true"
        />
        <div className="mx-auto max-w-7xl px-6 py-32 sm:py-40 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-6 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8">
            <motion.h1
              variants={fadeIn}
              className="max-w-2xl text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:col-span-2 xl:col-auto"
            >
              <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                Mio Boon's
              </span>{' '}
              Hikayemiz
            </motion.h1>
            <motion.div 
              variants={fadeIn} 
              className="mt-6 max-w-xl lg:mt-0 lg:col-span-2 xl:col-auto"
            >
              <p className="text-lg leading-8 text-gray-600">
                {aboutContent.description}
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <motion.div
        variants={staggerContainer}
        className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32"
      >
        <motion.div variants={fadeIn} className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary-600">Değerlerimiz</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Neler Sunuyoruz?
          </p>
        </motion.div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
            {features.map((feature) => (
              <motion.div
                key={feature.name}
                variants={fadeIn}
                whileHover={{ scale: 1.05 }}
                className="flex flex-col rounded-xl bg-white p-6 shadow-lg ring-1 ring-gray-200 transition-all duration-300 hover:shadow-xl"
              >
                <div className={`mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r ${feature.color} p-2 shadow-inner`}>
                  <span className="text-3xl">{feature.icon}</span>
                </div>
                <dt className="text-xl font-semibold leading-7 text-gray-900">
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </motion.div>

      {/* Vision & Mission Section */}
      <motion.div 
        variants={fadeIn}
        className="bg-gradient-to-b from-white to-gray-50 py-24 sm:py-32"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center mb-16">
            <h2 className="text-base font-semibold leading-7 text-primary-600">Vizyonumuz & Misyonumuz</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Hedeflerimiz ve Değerlerimiz
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <motion.div
              variants={fadeIn}
              whileHover={{ scale: 1.02 }}
              className="rounded-xl bg-white p-8 shadow-lg ring-1 ring-gray-200 transition-all duration-300 hover:shadow-xl"
            >
              <div className="flex items-center justify-center mb-6">
                <span className="text-4xl">🎯</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Vizyonumuz</h3>
              <p className="text-gray-600 text-center">{aboutContent.vision}</p>
            </motion.div>

            <motion.div
              variants={fadeIn}
              whileHover={{ scale: 1.02 }}
              className="rounded-xl bg-white p-8 shadow-lg ring-1 ring-gray-200 transition-all duration-300 hover:shadow-xl"
            >
              <div className="flex items-center justify-center mb-6">
                <span className="text-4xl">⭐</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Misyonumuz</h3>
              <p className="text-gray-600 text-center">{aboutContent.mission}</p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}