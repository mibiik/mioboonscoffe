import { motion } from 'framer-motion';
import { fadeIn, staggerContainer } from '../animations';

export default function Section({
  children,
  className = '',
  title,
  subtitle,
  centered = false,
  fullWidth = false,
  variant = 'default',
  staggered = false,
  ...props
}) {
  // Section variants
  const VARIANTS = {
    default: 'py-16 sm:py-24',
    hero: 'py-24 sm:py-32',
    compact: 'py-12 sm:py-16',
    narrow: 'py-8 sm:py-12'
  };

  // Background variants
  const BG_VARIANTS = {
    default: 'bg-white',
    light: 'bg-gray-50',
    dark: 'bg-gray-900 text-white',
    primary: 'bg-primary-50',
    secondary: 'bg-secondary-50',
    gradient: 'bg-gradient-to-br from-primary-50 to-secondary-50'
  };

  const sectionClasses = `relative ${VARIANTS[variant] || VARIANTS.default} ${className}`;
  
  // Container classes based on fullWidth prop
  const containerClasses = fullWidth 
    ? 'w-full px-6 lg:px-8' 
    : 'mx-auto max-w-7xl px-6 lg:px-8';

  // Header classes based on centered prop
  const headerClasses = centered ? 'mx-auto text-center' : '';
  const headerMaxWidth = centered ? 'mx-auto max-w-2xl' : 'max-w-2xl';

  // Determine which animation to use
  const ContainerComponent = staggered ? motion.div : 'div';
  const containerProps = staggered ? { variants: staggerContainer } : {};

  return (
    <motion.section
      className={sectionClasses}
      initial="initial"
      animate="animate"
      exit="exit"
      {...props}
    >
      <ContainerComponent className={containerClasses} {...containerProps}>
        {(title || subtitle) && (
          <div className={`${headerMaxWidth} ${headerClasses}`}>
            {title && (
              <motion.h2 
                variants={fadeIn}
                className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
              >
                {title}
              </motion.h2>
            )}
            {subtitle && (
              <motion.p 
                variants={fadeIn}
                className="mt-4 text-lg leading-8 text-gray-600"
              >
                {subtitle}
              </motion.p>
            )}
          </div>
        )}
        <div className={staggered ? 'mt-16' : ''}>
          {children}
        </div>
      </ContainerComponent>
    </motion.section>
  );
}