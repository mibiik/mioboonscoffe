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
    details: '+90 540 744 04 52',
    icon: '📞'
  },
  {
    title: 'E-posta',
    details: 'info@mioboons.com',
    icon: '✉️'
  },
  {
    title: 'Çalışma Saatleri',
    details: 'Her gün 09:00 - 22:00',
    icon: '🕒'
  }
];

export default function Contact() {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      className="relative isolate bg-white py-24 sm:py-32"
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
            Bize ulaşmak için aşağıdaki iletişim bilgilerini kullanabilir veya formu doldurabilirsiniz.
          </motion.p>
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
          className="mx-auto mt-16 max-w-2xl"
        >
          <form className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold leading-6 text-gray-900">
                  Ad Soyad
                </label>
                <div className="mt-2.5">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
                  E-posta
                </label>
                <div className="mt-2.5">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900">
                Mesajınız
              </label>
              <div className="mt-2.5">
                <textarea
                  name="message"
                  id="message"
                  rows={4}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="w-full rounded-md bg-primary-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
              >
                Gönder
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
}