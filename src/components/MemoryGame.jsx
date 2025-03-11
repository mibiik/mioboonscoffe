import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const emojis = ['🦁', '🐯', '🐼', '🐨', '🐸', '🦊', '🐰', '🐶'];

const cardVariants = {
  hidden: { rotateY: 180, scale: 0.8 },
  visible: { rotateY: 0, scale: 1 },
  exit: { rotateY: -180, scale: 0.8 }
};

export default function MemoryGame() {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [isChecking, setIsChecking] = useState(false);
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [hintTimeout, setHintTimeout] = useState(null);

  const showHintCards = () => {
    if (matchedPairs.length === cards.length) return; // All pairs found
    
    // Find unmatched pairs
    const unmatchedCards = cards.filter(card => !matchedPairs.includes(card.id));
    
    // Get a random unmatched pair
    const firstCard = unmatchedCards[0];
    const matchingCard = unmatchedCards.find(card => 
      card.id !== firstCard.id && card.emoji === firstCard.emoji
    );
    
    if (firstCard && matchingCard) {
      setFlippedCards([firstCard.id, matchingCard.id]);
      setShowHint(true);
      
      // Hide hint after 1 second
      const timeout = setTimeout(() => {
        setFlippedCards([]);
        setShowHint(false);
        setScore(Math.max(0, score - 2)); // Small penalty for using hint
      }, 1000);
      
      setHintTimeout(timeout);
    }
  };

  // Cleanup hint timeout
  useEffect(() => {
    return () => {
      if (hintTimeout) {
        clearTimeout(hintTimeout);
      }
    };
  }, [hintTimeout]);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const shuffledCards = [...emojis, ...emojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({ id: index, emoji }));
    setCards(shuffledCards);
    setFlippedCards([]);
    setMatchedPairs([]);
    setScore(0);
  };

  const handleCardClick = (cardId) => {
    if (isChecking || flippedCards.length === 2 || flippedCards.includes(cardId) || matchedPairs.includes(cardId)) return;

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setIsChecking(true);
      const [firstCard, secondCard] = newFlippedCards.map(id => cards.find(card => card.id === id));

      if (firstCard.emoji === secondCard.emoji) {
        setMatchedPairs([...matchedPairs, ...newFlippedCards]);
        setScore(score + 10);
        setFlippedCards([]);
        setIsChecking(false);

        if (matchedPairs.length + 2 === cards.length) {
          setTimeout(() => {
            alert('Tebrikler! Oyunu kazandın! 🎉');
            initializeGame();
          }, 500);
        }
      } else {
        setTimeout(() => {
          setFlippedCards([]);
          setIsChecking(false);
          setScore(Math.max(0, score - 1));
        }, 1000);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 bg-white rounded-2xl shadow-xl max-w-4xl mx-auto"
    >
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Hafıza Oyunu</h2>
        <p className="text-lg text-gray-600 mb-4">Eşleşen kartları bul!</p>
        <div className="flex flex-col items-center gap-4 max-w-xs mx-auto">
          <div className="flex justify-between items-center w-full">
            <p className="text-xl font-semibold text-primary-600">Puan: {score}</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-secondary-500 text-white rounded-full font-semibold hover:bg-secondary-600 transition-colors"
              onClick={initializeGame}
            >
              Yeni Oyun
            </motion.button>
          </div>
          {cards.length > 0 && !showHint && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-yellow-500 text-white rounded-full font-semibold hover:bg-yellow-600 transition-colors w-full"
              onClick={showHintCards}
            >
              İpucu Göster
            </motion.button>
          )}
        </div>
      </div>

      <motion.div
        className="grid grid-cols-4 gap-4"
        variants={{
          show: {
            transition: {
              staggerChildren: 0.1
            }
          }
        }}
      >
        {cards.map((card) => (
          <motion.div
            key={card.id}
            className={`relative aspect-square cursor-pointer`}
            onClick={() => handleCardClick(card.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence initial={false}>
              {(flippedCards.includes(card.id) || matchedPairs.includes(card.id)) ? (
                <motion.div
                  key="front"
                  className="absolute inset-0 flex items-center justify-center text-4xl bg-gradient-to-r from-primary-400 to-secondary-400 rounded-xl shadow-lg"
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {card.emoji}
                </motion.div>
              ) : (
                <motion.div
                  key="back"
                  className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-accent-400 to-primary-400 rounded-xl shadow-lg"
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <span className="text-4xl">❓</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}