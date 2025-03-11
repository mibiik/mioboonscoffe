import { motion } from 'framer-motion';
import { hoverCard, fadeIn } from '../animations';

export default function Card({
  children,
  className = '',
  onClick,
  href,
  animated = true,
  variant = 'default',
  hoverEffect = true,
  title,
  description,
  price,
  image,
  delay,
  customStyle = {},
  imageSize = 'normal',
  ...props
}) {
  // Card variants
  const VARIANTS = {
    default: 'bg-white rounded-2xl p-6 shadow-sm ring-1 ring-gray-200',
    outlined: 'bg-white rounded-2xl p-6 ring-1 ring-gray-200',
    filled: 'bg-gray-50 rounded-2xl p-6',
    gradient: 'bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl p-6 shadow-sm',
    elevated: 'bg-white rounded-2xl p-6 shadow-md',
    'red-theme': 'bg-white rounded-2xl p-6 shadow-md ring-1 ring-red-100',
    'green-theme': 'bg-white rounded-2xl p-6 shadow-md ring-1 ring-green-100'
  };

  const cardClasses = `${VARIANTS[variant] || VARIANTS.default} ${className}`;
  
  // Handle click or link behavior
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (href) {
      window.location.href = href;
    }
  };

  // Determine if card should be interactive
  const isInteractive = onClick || href;
  const interactiveClasses = isInteractive ? 'cursor-pointer transition-all hover:ring-primary-500' : '';

  // Combine all classes
  const combinedClasses = `${cardClasses} ${interactiveClasses}`;

  // Animation props
  const animationProps = hoverEffect && isInteractive ? {
    whileHover: { scale: 1.02, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)' },
    whileTap: { scale: 0.98 },
    transition: { duration: 0.2 }
  } : {};

  // Custom animation with delay if provided
  const customVariants = delay ? {
    ...fadeIn,
    animate: {
      ...fadeIn.animate,
      transition: { ...fadeIn.animate.transition, delay }
    }
  } : fadeIn;

  // Get emoji for menu item
  const getEmoji = (itemName) => {
    const itemEmojis = {
      // Desserts
      'Badem unlu kek': '🍰',
      'Cookie Brownie': '🍪',
      'Cup Cake': '🧁',
      'Islak Kek': '🍫',
      'Cheesecake': '🍮',
      'Brownie': '🍫',
      'Starbucks Kurabiye': '🍪',
      'Kutu Kurabiye': '🍪',
      'Ginger Bread': '🍪',
      'Elmalı Kurabiye': '🍎',
      'Makaron': '🍬',
      'Lüxlü Kurabiye': '✨',
      
      // Main dishes
      'Çıtır Tavuk (Patates ile)': '🍗',
      'Çocuk Pizza': '🍕',
      'Pizza': '🍕',
      'Hamburger + Patates': '🍔',
      'Köfte Salata': '🥗',
      'Köfte Makarna': '🍝',
      'Mantı': '🥟',
      'Schnitzel Salata': '🥩',
      'Soslu Makarna (Pesto ve Domates)': '🍝',
      'Falafel Salata': '🧆',
      
      // Breakfast
      'Serpme Kahvaltı': '🍳',
      'Mio Tost': '🥪',
      
      // Drinks
      'Sıkma Meyve Suyu': '🍊',
      'Kutu Meyve Suyu': '🧃',
      'Nesquik Süt': '🥛',
      'Limonata': '🍋',
      'Ayran': '🥛',
      'Soda': '💧',
      'Kutu Kola': '🥤',
      'Ice Tea': '🧊',
      'Büyük Su': '💧',
      'Su': '💧',
      'Bitki Çayı': '🌿',
      'Yeşil Çay': '🍵',
      'Türk Çayı': '🫖',
      
      // Cocktails
      'Blue Ocean Mocktail': '🔵',
      'Hawaiian Mocktail': '🌺',
      'Mandarin Mojito Cocktail': '🍊',
      'Mio Red Mocktail': '❤️',
      'Milkshake': '🥤',
      
      // Coffee
      'Americano': '☕',
      'Ice Americano': '🧊',
      'Cappuccino': '☕',
      'Cortado': '☕',
      'Espresso': '☕',
      'Double Espresso': '☕',
      'Türk Kahvesi': '☕',
      'Double Türk Kahvesi': '☕',
      'Filtre Kahve': '☕',
      'Flat White': '☕',
      'Ice Latte': '🧊',
      'Latte': '☕',
      'Macchiato': '☕',
      'Mocha': '☕',
      'Churchill': '☕',
    };
    
    return itemEmojis[itemName] || '';
  };

  // Determine price tag color based on variant - always use green for price
  const getPriceTagStyle = () => {
    return 'bg-gradient-to-r from-green-500 to-green-600';
  };

  // Determine image size class
  const getImageSizeClass = () => {
    switch (imageSize) {
      case 'large':
        return 'w-16 h-16';
      case 'medium':
        return 'w-12 h-12';
      case 'normal':
      default:
        return 'w-8 h-8';
    }
  };

  // Render menu item if title and price are provided
  const renderMenuItem = () => {
    if (title && price !== undefined) {
      const emoji = getEmoji(title);
      
      return (
        <div className="flex flex-col h-full">
          {/* Image at the top for large size */}
          {image && imageSize === 'large' && (
            <div className="mb-4 flex justify-center">
              <div className={`${getImageSizeClass()} opacity-80 transition-opacity hover:opacity-100`}>
                <img src={image} alt="" className="w-full h-full object-contain drop-shadow-md" />
              </div>
            </div>
          )}
          
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-lg font-semibold text-gray-900 leading-tight flex items-center">
              {emoji && <span className="mr-2 text-xl">{emoji}</span>}
              {title}
            </h3>
            <div className={`ml-2 px-3 py-1 ${getPriceTagStyle()} rounded-full text-white font-medium text-sm whitespace-nowrap shadow-sm`}>
              {price} ₺
            </div>
          </div>
          
          {description && <p className="text-gray-600 text-sm mb-3 leading-relaxed">{description}</p>}
          
          {/* Image at the bottom for normal and medium size */}
          {image && imageSize !== 'large' && (
            <div className="mt-auto pt-3 flex justify-between items-end">
              <div className={`${getImageSizeClass()} opacity-60 transition-opacity hover:opacity-100`}>
                <img src={image} alt="" className="w-full h-full object-contain drop-shadow-sm" />
              </div>
              <div className="text-xs text-gray-400 italic">Mio Boon's</div>
            </div>
          )}
        </div>
      );
    }
    return children;
  };

  return animated ? (
    <motion.div
      className={combinedClasses}
      onClick={handleClick}
      variants={customVariants}
      style={customStyle}
      {...animationProps}
      {...props}
    >
      {renderMenuItem()}
    </motion.div>
  ) : (
    <div className={combinedClasses} onClick={handleClick} style={customStyle} {...props}>
      {renderMenuItem()}
    </div>
  );
}