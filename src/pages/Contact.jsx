import { motion } from 'framer-motion';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

const contactInfo = [
  {
    title: 'Adres',
    details: 'Zekeriyaköy Mahallesi, Prof. Dr. Oktay Sinanoğlu Caddesi No:6B, Sarıyer, İstanbul',
    icon: '📍'
  },
  {
    title: 'Telefon',
    details: '+90 541 744 04 52',
    icon: '📞'
  },
  {
    title: 'E-posta',
    details: 'info@mioboonskids.com',
    icon: '✉️'
  },
  {
    title: 'Çalışma Saatleri',
    details: 'Hafta içi (Çarşamba hariç): 12:00 - 21:00\nHafta sonu: 10:00 - 22:00',
    icon: '🕒'
  }
];

// Google Maps iframe configuration
const mapConfig = {
  src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3001.907390645895!2d29.032026711717503!3d41.201992571204514!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x409fe1c8bcc8584d%3A0x4d3c01caf7923b5c!2zTWlvIGJvb27igJlz!5e0!3m2!1str!2str!4v1741693434818!5m2!1str!2str",
  width: "100%",
  height: "400",
  style: "border:0;",
  allowFullScreen: true,
  loading: "lazy",
  referrerPolicy: "no-referrer-when-downgrade"
};

export default function Contact() {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      className="relative isolate bg-white/90 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <motion.h2
            variants={fadeIn}
            className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl"
          >
            İletişim
          </motion.h2>
          <motion.p
            variants={fadeIn}
            className="mt-6 text-lg leading-8 text-gray-600"
          >
            Bize ulaşmak için aşağıdaki iletişim bilgilerini kullanabilirsiniz.
          </motion.p>
          <motion.button
            variants={fadeIn}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-8 w-full sm:w-auto px-6 py-3 text-base font-semibold text-gray-900 bg-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-md transition-all duration-200 flex items-center justify-center"
          >
            Bize Ulaşın
          </motion.button>
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 text-base leading-7 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-4">
          {contactInfo.map((info) => (
            <motion.div
              key={info.title}
              variants={fadeIn}
              className="relative flex flex-col gap-4 rounded-2xl bg-gray-50 p-6"
            >
              <div className="text-4xl">{info.icon}</div>
              <div>
                <h3 className="font-semibold text-gray-900">{info.title}</h3>
                <p className="mt-2 text-gray-600">{info.details}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          variants={fadeIn}
          className="mx-auto mt-16 w-full rounded-xl overflow-hidden shadow-lg"
        >
          <iframe
            src={mapConfig.src}
            width={mapConfig.width}
            height={mapConfig.height}
            style={{ border: 0 }}
            allowFullScreen={mapConfig.allowFullScreen}
            loading={mapConfig.loading}
            referrerPolicy={mapConfig.referrerPolicy}
            title="Mio Boon's Location"
          />
        </motion.div>
      </div>
    </motion.div>
  );
}