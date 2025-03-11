import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GAME_DURATION = 30; // seconds
const GRID_SIZE = 3; // 3x3 grid
const TOTAL_HOLES = GRID_SIZE * GRID_SIZE;

export default function WhackAMoleGame() {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [activeMoles, setActiveMoles] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const [difficulty, setDifficulty] = useState('easy'); // easy, medium, hard
  
  const gameIntervalRef = useRef(null);
  const timerIntervalRef = useRef(null);
  
  // Start the game
  const startGame = () => {
    setScore(0);
    setTimeLeft(GAME_DURATION);
    setActiveMoles([]);
    setIsPlaying(true);
    
    // Clear any existing intervals
    if (gameIntervalRef.current) clearInterval(gameIntervalRef.current);
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    
    // Set up the mole appearance interval
    const moleInterval = getDifficultySettings().moleInterval;
    gameIntervalRef.current = setInterval(() => {
      if (activeMoles.length < getDifficultySettings().maxMoles) {
        const newMoleIndex = getRandomHoleIndex();
        if (!activeMoles.includes(newMoleIndex)) {
          setActiveMoles(prev => [...prev, newMoleIndex]);
          
          // Auto-hide mole after a delay
          setTimeout(() => {
            setActiveMoles(prev => prev.filter(index => index !== newMoleIndex));
          }, getDifficultySettings().moleVisibleTime);
        }
      }
    }, moleInterval);
    
    // Set up the timer
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
  
  // End the game
  const endGame = () => {
    setIsPlaying(false);
    clearInterval(gameIntervalRef.current);
    clearInterval(timerIntervalRef.current);
    
    // Update high score if needed
    if (score > highScore) {
      setHighScore(score);
    }
  };
  
  // Get a random hole index that doesn't already have a mole
  const getRandomHoleIndex = () => {
    const availableHoles = Array.from({ length: TOTAL_HOLES }, (_, i) => i)
      .filter(index => !activeMoles.includes(index));
    
    if (availableHoles.length === 0) return null;
    
    return availableHoles[Math.floor(Math.random() * availableHoles.length)];
  };
  
  // Handle whacking a mole
  const handleWhack = (index) => {
    if (!isPlaying || !activeMoles.includes(index)) return;
    
    // Remove the mole from active moles
    setActiveMoles(prev => prev.filter(moleIndex => moleIndex !== index));
    
    // Increase score
    setScore(prev => prev + getDifficultySettings().pointsPerMole);
  };
  
  // Get settings based on difficulty
  const getDifficultySettings = () => {
    switch (difficulty) {
      case 'easy':
        return {
          moleInterval: 1500,
          moleVisibleTime: 2000,
          maxMoles: 1,
          pointsPerMole: 1
        };
      case 'medium':
        return {
          moleInterval: 1000,
          moleVisibleTime: 1500,
          maxMoles: 2,
          pointsPerMole: 2
        };
      case 'hard':
        return {
          moleInterval: 800,
          moleVisibleTime: 1200,
          maxMoles: 3,
          pointsPerMole: 3
        };
      default:
        return {
          moleInterval: 1500,
          moleVisibleTime: 2000,
          maxMoles: 1,
          pointsPerMole: 1
        };
    }
  };
  
  // Handle difficulty change
  const handleDifficultyChange = (newDifficulty) => {
    setDifficulty(newDifficulty);
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
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Köstebeği Yakala</h2>
        <p className="text-lg text-gray-600 mb-4">Hızlı ol ve köstebekleri yakala!</p>
        
        <div className="flex justify-center gap-4 mb-6">
          {['easy', 'medium', 'hard'].map((level) => (
            <motion.button
              key={level}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-full font-semibold transition-colors ${difficulty === level ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-800'}`}
              onClick={() => handleDifficultyChange(level)}
            >
              {level === 'easy' ? 'Kolay' : level === 'medium' ? 'Orta' : 'Zor'}
            </motion.button>
          ))}
        </div>
        
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
              className="px-6 py-3 bg-gradient-to-r from-amber-500 to-brown-500 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all"
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

      <div className="bg-gradient-to-b from-green-100 to-green-200 rounded-xl p-6 max-w-md mx-auto">
        <div 
          className="grid grid-cols-3 gap-4 relative"
          style={{ aspectRatio: '1/1' }}
        >
          {Array.from({ length: TOTAL_HOLES }).map((_, index) => (
            <div 
              key={index}
              className="relative bg-brown-800 rounded-full overflow-hidden"
              style={{ aspectRatio: '1/1' }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-brown-700 to-brown-900 rounded-full transform translate-y-1/2">
                {/* Hole */}
              </div>
              
              <AnimatePresence>
                {activeMoles.includes(index) && (
                  <motion.div
                    initial={{ y: 50 }}
                    animate={{ y: 0 }}
                    exit={{ y: 50 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    className="absolute inset-0 flex items-center justify-center cursor-pointer"
                    onClick={() => handleWhack(index)}
                  >
                    <div className="relative">
                      {/* Mole head */}
                      <div className="w-16 h-16 bg-brown-500 rounded-full flex items-center justify-center">
                        <div className="w-12 h-8 bg-pink-200 rounded-full transform translate-y-2"></div>
                        <div className="absolute top-2 left-3 w-3 h-3 bg-black rounded-full"></div>
                        <div className="absolute top-2 right-3 w-3 h-3 bg-black rounded-full"></div>
                        <div className="absolute top-8 w-6 h-2 bg-black rounded-full"></div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
      
      {isPlaying && (
        <div className="mt-6 text-center text-gray-600">
          <p>Köstebeklere tıklayarak onları yakala!</p>
        </div>
      )}
    </motion.div>
  );
}