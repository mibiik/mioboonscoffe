import { motion } from 'framer-motion';
import { buttonHover, pulseAnimation } from '../animations';

// Button variants
const VARIANTS = {
  primary: {
    base: 'rounded-md bg-primary-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600',
    animation: buttonHover
  },
  secondary: {
    base: 'rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-primary-600 shadow-sm ring-1 ring-inset ring-primary-200 hover:bg-gray-50 hover:ring-primary-300',
    animation: buttonHover
  },
  outline: {
    base: 'rounded-md bg-transparent px-3.5 py-2.5 text-sm font-semibold text-primary-600 shadow-sm ring-1 ring-inset ring-primary-600 hover:bg-primary-50',
    animation: buttonHover
  },
  text: {
    base: 'text-sm font-semibold leading-6 text-gray-900 hover:text-primary-600 transition-colors',
    animation: {}
  },
  attention: {
    base: 'rounded-md bg-secondary-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-secondary-400',
    animation: pulseAnimation
  },
  gradient: {
    base: 'rounded-md bg-gradient-to-r from-primary-600 to-secondary-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:from-primary-500 hover:to-secondary-500',
    animation: buttonHover
  }
};

// Size variants
const SIZES = {
  sm: 'px-2.5 py-1.5 text-xs',
  md: 'px-3.5 py-2.5 text-sm',
  lg: 'px-4 py-3 text-base'
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  href,
  icon,
  iconPosition = 'right',
  animated = true,
  onClick,
  ...props
}) {
  // Get the correct variant styling
  const variantStyle = VARIANTS[variant] || VARIANTS.primary;
  const sizeStyle = SIZES[size] || SIZES.md;
  
  // Combine classes
  const buttonClasses = `${variantStyle.base} ${sizeStyle} ${className}`;
  
  // Create button content with optional icon
  const content = (
    <>
      {icon && iconPosition === 'left' && (
        <span className="mr-2">{icon}</span>
      )}
      {children}
      {icon && iconPosition === 'right' && (
        <span className="ml-2">{icon}</span>
      )}
    </>
  );

  // If it's a link
  if (href) {
    return animated ? (
      <motion.a
        href={href}
        className={buttonClasses}
        {...variantStyle.animation}
        {...props}
      >
        {content}
      </motion.a>
    ) : (
      <a href={href} className={buttonClasses} {...props}>
        {content}
      </a>
    );
  }

  // If it's a button
  return animated ? (
    <motion.button
      type="button"
      className={buttonClasses}
      onClick={onClick}
      {...variantStyle.animation}
      {...props}
    >
      {content}
    </motion.button>
  ) : (
    <button
      type="button"
      className={buttonClasses}
      onClick={onClick}
      {...props}
    >
      {content}
    </button>
  );
}