import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';

export default function WhatsAppButton() {
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation();

  // Don't show on menu page
  if (location.pathname === '/menu') return null;

  return (
    <motion.a
      href="https://api.whatsapp.com/send/?phone=905417440452&text&type=phone_number&app_absent=0"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed right-4 bottom-4 z-50 flex items-center gap-2"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      animate={{
        y: [0, -5, 0],
        transition: {
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut'
        }
      }}
    >
      <div className="flex items-center bg-green-500 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{
            width: isHovered ? 'auto' : 0,
            opacity: isHovered ? 1 : 0
          }}
          className="overflow-hidden whitespace-nowrap pl-4"
        >
          <span className="text-white font-medium text-sm sm:text-base">Bize Yaz</span>
        </motion.div>
        <div className="p-3 sm:p-3.5 aspect-square rounded-full">
          <FaWhatsapp className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
        </div>
      </div>
    </motion.a>
  );
}