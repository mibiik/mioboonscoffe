import { cubicBezier } from 'framer-motion';

// Custom easing functions for more natural animations
const easing = {
  smooth: cubicBezier(0.4, 0.0, 0.2, 1),
  bounce: cubicBezier(0.175, 0.885, 0.32, 1.275),
  elastic: cubicBezier(0.68, -0.55, 0.265, 1.55),
  spring: [0.34, 1.56, 0.64, 1],
  playful: cubicBezier(0.68, -0.6, 0.32, 1.6),
  bouncy: [0.68, -0.55, 0.265, 1.55],
};

// Enhanced fade animations with different directions - optimized for performance
export const fadeIn = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easing.smooth } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.3, ease: easing.smooth } }
};

export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easing.smooth } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: easing.smooth } }
};

export const fadeInDown = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easing.smooth } },
  exit: { opacity: 0, y: 20, transition: { duration: 0.3, ease: easing.smooth } }
};

export const fadeInLeft = {
  initial: { opacity: 0, x: -30 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.5, ease: easing.smooth } },
  exit: { opacity: 0, x: 30, transition: { duration: 0.3, ease: easing.smooth } }
};

export const fadeInRight = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.5, ease: easing.smooth } },
  exit: { opacity: 0, x: -30, transition: { duration: 0.3, ease: easing.smooth } }
};

// Staggered animations for lists and grids - reduced delay for better performance
export const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    }
  },
  exit: {
    transition: {
      staggerChildren: 0.03,
      staggerDirection: -1,
    }
  }
};

// Scale animations - simplified
export const scaleUp = {
  initial: { scale: 0.95, opacity: 0 },
  animate: { scale: 1, opacity: 1, transition: { duration: 0.4, ease: easing.smooth } },
  exit: { scale: 0.95, opacity: 0, transition: { duration: 0.3, ease: easing.smooth } }
};

// Button hover animations - simplified
export const buttonHover = {
  whileHover: { 
    scale: 1.05,
    transition: { duration: 0.2 }
  },
  whileTap: { scale: 0.95 }
};

export const pulseAnimation = {
  whileHover: { 
    scale: 1.03,
    transition: {
      duration: 0.5,
      repeat: 1,
      repeatType: 'reverse'
    }
  }
};

// Page transitions - simplified
export const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.3, ease: easing.smooth } },
  exit: { opacity: 0, transition: { duration: 0.2, ease: easing.smooth } }
};

// Reveal animations - simplified
export const revealUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easing.smooth } },
  exit: { opacity: 0, y: 20, transition: { duration: 0.3, ease: easing.smooth } }
};

// Rotate animations - simplified
export const rotateIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.4, ease: easing.smooth } },
  exit: { opacity: 0, transition: { duration: 0.3, ease: easing.smooth } }
};

// Bounce animations - simplified
export const bounceIn = {
  initial: { scale: 0.9, opacity: 0 },
  animate: { 
    scale: 1,
    opacity: 1,
    transition: { duration: 0.5, ease: easing.bounce } 
  },
  exit: { 
    scale: 0.9,
    opacity: 0,
    transition: { duration: 0.3, ease: easing.smooth } 
  }
};

// Hover effects for cards and interactive elements - simplified
export const hoverCard = {
  rest: { scale: 1, y: 0 },
  hover: { 
    scale: 1.03,
    y: -5,
    transition: { duration: 0.2, ease: easing.smooth }
  }
};

// Text animations - simplified
export const textFocus = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5, ease: easing.smooth } },
  exit: { opacity: 0, transition: { duration: 0.3, ease: easing.smooth } }
};

// Scroll-triggered animations - simplified
export const scrollReveal = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easing.smooth } }
};

// Attention-grabbing animations - simplified
export const attention = {
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 1,
      repeat: 1,
      repeatType: 'reverse'
    }
  }
};