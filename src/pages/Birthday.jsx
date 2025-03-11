import { motion } from 'framer-motion';
import { fadeIn, fadeInUp, staggerContainer, rotateIn, bounceIn } from '../animations';
import Button from '../components/Button';
import Card from '../components/Card';
import Section from '../components/Section';

// Import SVG images
import birthdayPartySvg from '../assets/birthday_party.svg';
import cakeSvg from '../assets/cake.svg';
import childrenActivitiesSvg from '../assets/children_activities.svg';

const packages = [
  {
    name: 'Temel Paket',
    price: '2500₺',
    icon: cakeSvg,
    color: 'from-blue-500 to-cyan-400',
    features: [
      '2 saat süre',
      '10 kişiye kadar',
      'Temel süsleme',
      'Pasta ve içecekler',
      'Oyun ablası eşliğinde aktiviteler'
    ]
  },
  {
    name: 'Premium Paket',
    price: '3500₺',
    icon: birthdayPartySvg,
    color: 'from-purple-500 to-indigo-500',
    features: [
      '3 saat süre',
      '15 kişiye kadar',
      'Özel tema süslemesi',
      'Pasta, atıştırmalıklar ve içecekler',
      'Yüz boyama',
      'Oyun ablası eşliğinde aktiviteler',
      'Özel doğum günü şarkısı'
    ]
  },
  {
    name: 'VIP Paket',
    price: '5000₺',
    icon: childrenActivitiesSvg,
    color: 'from-pink-500 to-rose-400',
    features: [
      '4 saat süre',
      '20 kişiye kadar',
      'Lüks tema süslemesi',
      'Özel pasta, atıştırmalıklar ve içecekler',
      'Yüz boyama ve kostüm aktiviteleri',
      '2 oyun ablası eşliğinde aktiviteler',
      'Canlı müzik performansı',
      'Fotoğraf çekimi'
    ]
  }
];

// Testimonials data
const testimonials = [
  {
    content: "Çocuğumun doğum günü için VIP paketi tercih ettik ve gerçekten muhteşemdi. Herkes çok eğlendi, özellikle canlı müzik performansı büyük beğeni topladı.",
    author: "Ayşe K.",
    role: "Anne"
  },
  {
    content: "Premium paket ile oğlumun 7. yaş gününü kutladık. Organizasyon mükemmeldi, çocuklar aktivitelerle doyasıya eğlendi. Kesinlikle tavsiye ediyorum!",
    author: "Mehmet T.",
    role: "Baba"
  },
  {
    content: "Temel paket bile beklentilerimizin üzerindeydi. Personel çok ilgili ve profesyoneldi. Bir sonraki doğum gününde yine buradayız!",
    author: "Zeynep A.",
    role: "Anne"
  }
];

// Theme options
const themes = [
  { name: 'Süper Kahramanlar', icon: '🦸‍♂️' },
  { name: 'Deniz Kızı', icon: '🧜‍♀️' },
  { name: 'Uzay Macerası', icon: '🚀' },
  { name: 'Dinozorlar', icon: '🦖' },
  { name: 'Prenses', icon: '👸' },
  { name: 'Korsan', icon: '🏴‍☠️' },
  { name: 'Orman', icon: '🌳' },
  { name: 'Unicorn', icon: '🦄' },
];

export default function Birthday() {
  return (
    <div className="relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100"
          animate={{
            background: [
              'linear-gradient(to bottom right, #EFF6FF, #F5F3FF, #FCE7F3)',
              'linear-gradient(to bottom right, #FCE7F3, #F5F3FF, #EFF6FF)',
              'linear-gradient(to bottom right, #F5F3FF, #FCE7F3, #EFF6FF)'
            ]
          }}
          transition={{ duration: 20, ease: 'linear', repeat: Infinity }}
        />
        <motion.div
          className="absolute -top-24 -right-24 w-96 h-96 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(244,114,182,0.2) 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.1, 1], x: [0, 10, 0], y: [0, -10, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(129,140,248,0.2) 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.2, 1], x: [0, -10, 0], y: [0, 10, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      {/* Hero Section */}
      <Section variant="hero" className="relative z-10">
        <motion.div
          variants={fadeInUp}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.div 
            className="inline-block mb-4"
            initial={{ rotate: -10, scale: 0.9 }}
            animate={{ rotate: [0, -5, 5, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
          >
            <img src={birthdayPartySvg} alt="Birthday Party" className="w-24 h-24 mx-auto" />
          </motion.div>
          
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-secondary-600">
              Doğum Günü Paketleri
            </span>
          </h1>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            Çocuğunuzun özel gününü unutulmaz kılmak için özenle hazırlanmış paketlerimiz
          </p>
        </motion.div>
      </Section>

      {/* Packages Section */}
      <Section className="relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="mx-auto mt-8 grid max-w-lg grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3"
        >
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.name}
              variants={fadeIn}
              custom={index}
              whileHover={{ scale: 1.05, y: -10 }}
              className="flex flex-col h-full justify-between rounded-3xl bg-white p-8 ring-1 ring-gray-200 xl:p-10 hover:ring-primary-500 transition-all shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between gap-x-4 mb-6">
                  <h3 className="text-xl font-bold leading-8 text-gray-900">{pkg.name}</h3>
                  <div className={`rounded-full bg-gradient-to-r ${pkg.color} px-3.5 py-1.5 text-sm font-semibold leading-5 text-white shadow-md`}>
                    {pkg.price}
                  </div>
                </div>
                
                <div className="mb-6 flex justify-center">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${pkg.color} p-3 flex items-center justify-center shadow-md`}>
                    <img src={pkg.icon} alt="" className="w-10 h-10 object-contain" />
                  </div>
                </div>
                
                <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3 items-center">
                      <svg className="h-6 w-5 flex-none text-primary-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <motion.div 
                className="mt-8"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <a
                  href="/reservation"
                  className="block w-full rounded-md bg-gradient-to-r from-primary-600 to-secondary-600 px-3.5 py-3 text-center text-sm font-semibold text-white shadow-sm hover:from-primary-500 hover:to-secondary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 transition-all"
                >
                  Rezervasyon Yap
                </a>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* Themes Section */}
      <Section className="relative z-10 bg-gradient-to-br from-primary-50 to-secondary-50 py-16">
        <motion.div
          variants={fadeIn}
          className="mx-auto max-w-2xl text-center mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Tema Seçenekleri</h2>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            Doğum günü partinizi özelleştirmek için birbirinden eğlenceli temalar
          </p>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="mx-auto max-w-5xl grid grid-cols-2 sm:grid-cols-4 gap-6"
        >
          {themes.map((theme, index) => (
            <motion.div
              key={theme.name}
              variants={bounceIn}
              custom={index * 0.1}
              whileHover={{ scale: 1.1, rotate: [-1, 1, -1, 0] }}
              className="bg-white rounded-xl p-4 text-center shadow-md cursor-pointer hover:shadow-lg transition-all"
            >
              <div className="text-4xl mb-2">{theme.icon}</div>
              <h3 className="font-medium text-gray-900">{theme.name}</h3>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* Testimonials Section */}
      <Section className="relative z-10 py-16">
        <motion.div
          variants={fadeIn}
          className="mx-auto max-w-2xl text-center mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Mutlu Müşterilerimiz</h2>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            Doğum günü organizasyonlarımız hakkında ne dediler?
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              custom={index * 0.2}
              className="bg-white rounded-2xl p-6 shadow-md relative"
            >
              <div className="absolute -top-4 -left-4 w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center text-white text-xl">
                "
              </div>
              <p className="text-gray-600 mb-4 italic">{testimonial.content}</p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center text-white font-bold">
                  {testimonial.author.charAt(0)}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-semibold text-gray-900">{testimonial.author}</p>
                  <p className="text-xs text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Section>
    </div>
  );
}