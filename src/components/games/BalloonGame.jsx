import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const COLORS = [
  '#FF5733', // Red
  '#FFC300', // Yellow
  '#36D7B7', // Teal
  '#3498DB', // Blue
  '#9B59B6', // Purple
  '#2ECC71', // Green
];

const BALLOON_SIZES = [60, 70, 80, 90];

const getRandomPosition = (containerWidth, containerHeight, balloonSize) => {
  const maxX = containerWidth - balloonSize;
  const maxY = containerHeight - balloonSize;
  return {
    x: Math.random() * maxX,
    y: Math.random() * maxY,
  };
};

const getRandomColor = () => COLORS[Math.floor(Math.random() * COLORS.length)];
const getRandomSize = () => BALLOON_SIZES[Math.floor(Math.random() * BALLOON_SIZES.length)];

const Balloon = ({ id, color, size, position, onPop }) => {
  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{ 
        left: position.x, 
        top: position.y,
      }}
      initial={{ scale: 0 }}
      animate={{ 
        scale: 1,
        y: [0, -10, 0, -5, 0],
      }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ 
        scale: { duration: 0.3 },
        y: { repeat: Infinity, duration: 2, ease: "easeInOut" }
      }}
      onClick={() => onPop(id)}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <svg
        width={size}
        height={size * 1.2}
        viewBox="0 0 100 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Balloon body */}
        <path
          d="M50,10 C20,10 20,50 20,70 C20,90 35,110 50,110 C65,110 80,90 80,70 C80,50 80,10 50,10 Z"
          fill={color}
          stroke="#333"
          strokeWidth="2"
        />
        {/* Balloon knot */}
        <path
          d="M45,110 C45,115 55,115 55,110 L50,120 Z"
          fill="#333"
        />
        {/* Balloon highlight */}
        <ellipse
          cx="35"
          cy="40"
          rx="10"
          ry="15"
          fill="rgba(255, 255, 255, 0.3)"
        />
      </svg>
    </motion.div>
  );
};

export default function BalloonGame() {
  const [balloons, setBalloons] = useState([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isPlaying, setIsPlaying] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const containerRef = useRef(null);
  const gameIntervalRef = useRef(null);
  const timerIntervalRef = useRef(null);

  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setBalloons([]);
    setIsPlaying(true);

    // Clear any existing intervals
    if (gameIntervalRef.current) clearInterval(gameIntervalRef.current);
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);

    // Start the balloon generation interval
    gameIntervalRef.current = setInterval(() => {
      if (containerRef.current) {
        const { clientWidth, clientHeight } = containerRef.current;
        const size = getRandomSize();
        const position = getRandomPosition(clientWidth, clientHeight, size);

        setBalloons(prev => [
          ...prev,
          {
            id: Date.now(),
            color: getRandomColor(),
            size,
            position,
          }
        ]);
      }
    }, 1000);

    // Start the timer
    timerIntervalRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          endGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const endGame = () => {
    setIsPlaying(false);
    clearInterval(gameIntervalRef.current);
    clearInterval(timerIntervalRef.current);
    
    // Update high score if needed
    if (score > highScore) {
      setHighScore(score);
    }
  };

  const handlePopBalloon = (id) => {
    // Remove the balloon
    setBalloons(prev => prev.filter(balloon => balloon.id !== id));
    
    // Increase score
    setScore(prev => prev + 1);
  };

  // Clean up intervals on unmount
  useEffect(() => {
    return () => {
      if (gameIntervalRef.current) clearInterval(gameIntervalRef.current);
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 bg-white rounded-2xl shadow-xl max-w-4xl mx-auto"
    >
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Balon Patlatma</h2>
        <p className="text-lg text-gray-600 mb-4">Balonları patlat ve puan topla!</p>
        
        <div className="flex justify-between items-center max-w-xs mx-auto mb-4">
          <div className="text-xl font-semibold text-primary-600">Puan: {score}</div>
          <div className="text-xl font-semibold text-secondary-600">Süre: {timeLeft}s</div>
        </div>
        
        {!isPlaying && (
          <div className="mb-6">
            {score > 0 && (
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="mb-4 p-4 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-xl"
              >
                <p className="text-xl font-bold">Oyun Bitti!</p>
                <p className="text-lg">Skorun: {score}</p>
                {score >= highScore && score > 0 && (
                  <p className="text-primary-600 font-bold mt-2">Yeni Yüksek Skor! 🎉</p>
                )}
              </motion.div>
            )}
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all"
              onClick={startGame}
            >
              {score === 0 ? 'Oyunu Başlat' : 'Tekrar Oyna'}
            </motion.button>
          </div>
        )}
        
        {highScore > 0 && (
          <div className="text-sm font-medium text-gray-600 mb-2">
            En Yüksek Skor: {highScore}
          </div>
        )}
      </div>

      <div 
        ref={containerRef}
        className="relative bg-gradient-to-b from-blue-100 to-purple-100 rounded-xl overflow-hidden"
        style={{ height: '400px' }}
      >
        {!isPlaying && !score && (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-xl text-gray-500">Başlamak için butona tıkla!</p>
          </div>
        )}
        
        <AnimatePresence>
          {balloons.map(balloon => (
            <Balloon
              key={balloon.id}
              id={balloon.id}
              color={balloon.color}
              size={balloon.size}
              position={balloon.position}
              onPop={handlePopBalloon}
            />
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}