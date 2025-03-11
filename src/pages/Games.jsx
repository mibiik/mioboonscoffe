import React, { useState, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { fadeIn, staggerContainer } from '../animations';
import { GameControllerIcon } from '../components/Icons';
import logo from '../assets/logo.svg';
import { useHint } from '../contexts/HintContext';

// Lazy load game components
const MemoryGame = lazy(() => import('../components/MemoryGame'));
const ColoringGame = lazy(() => import('../components/games/ColoringGame'));
const BalloonGame = lazy(() => import('../components/games/BalloonGame'));
const PuzzleGame = lazy(() => import('../components/games/PuzzleGame'));
const MathGame = lazy(() => import('../components/games/MathGame'));
const WhackAMoleGame = lazy(() => import('../components/games/WhackAMoleGame'));

// Loading component
const GameLoading = () => (
  <div className="p-6 bg-white rounded-2xl shadow-xl max-w-4xl mx-auto flex items-center justify-center" style={{ minHeight: '400px' }}>
    <div className="text-center">
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500 mb-4"></div>
      <p className="text-lg text-gray-600">Oyun yükleniyor...</p>
    </div>
  </div>
);

const games = [
  {
    id: 'memory',
    name: 'Hafıza Oyunu',
    description: 'Eşleşen kartları bul ve hafızanı test et!',
    emoji: '🧠',
    color: 'from-blue-500 to-purple-500',
    component: MemoryGame,
    category: 'memory',
    difficulty: 'Orta',
    duration: '5-10 dk'
  },
  {
    id: 'coloring',
    name: 'Boyama Oyunu',
    description: 'Sevimli resimleri istediğin gibi renklendir!',
    emoji: '🎨',
    color: 'from-pink-500 to-red-500',
    component: ColoringGame,
    category: 'creative',
    difficulty: 'Kolay',
    duration: '10-15 dk'
  },
  {
    id: 'balloon',
    name: 'Balon Patlatma',
    description: 'Renkli balonları patlat ve puan topla!',
    emoji: '🎈',
    color: 'from-yellow-500 to-orange-500',
    component: BalloonGame,
    category: 'action',
    difficulty: 'Kolay',
    duration: '3-5 dk'
  },
  {
    id: 'puzzle',
    name: 'Hayvan Yapbozu',
    description: 'Sevimli hayvan resimlerini tamamla!',
    emoji: '🧩',
    color: 'from-green-500 to-teal-500',
    component: PuzzleGame,
    category: 'creative',
    difficulty: 'Orta',
    duration: '10-15 dk'
  },
  {
    id: 'math',
    name: 'Matematik Oyunu',
    description: 'Eğlenceli matematik soruları çöz!',
    emoji: '🔢',
    color: 'from-purple-500 to-indigo-500',
    component: MathGame,
    category: 'memory',
    difficulty: 'Zor',
    duration: '5-10 dk'
  },
  {
    id: 'whackamole',
    name: 'Köstebeği Yakala',
    description: 'Hızlı ol ve köstebekleri yakala!',
    emoji: '🐹',
    color: 'from-amber-500 to-brown-500',
    component: WhackAMoleGame,
    category: 'action',
    difficulty: 'Orta',
    duration: '3-5 dk'
  }
];

export default function Games() {
  const [selectedGame, setSelectedGame] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const { HintButton, initializeHints } = useHint();
  const [isLoading, setIsLoading] = useState(false);

  const handleGameSelect = (gameId) => {
    // Set loading state
    setIsLoading(true);
    
    // Use setTimeout to allow the UI to update before heavy component loading
    setTimeout(() => {
      setSelectedGame(gameId);
      // Initialize hints when a game is selected
      if (initializeHints) {
        initializeHints(gameId);
      }
      // Reset loading state after a short delay
      setTimeout(() => setIsLoading(false), 100);
    }, 50);
  };

  const handleBackToGames = () => {
    setSelectedGame(null);
  };

  // Filter games by category
  const filteredGames = activeCategory === 'all' ? games : games.filter(game => game.category === activeCategory);

  // Render selected game or game selection screen
  const renderContent = () => {
    if (selectedGame) {
      const game = games.find(g => g.id === selectedGame);
      if (!game) return null;
      
      const GameComponent = game.component;
      
      return (
        <div className="py-8">
          <motion.button
            onClick={handleBackToGames}
            className="mb-8 inline-flex items-center text-primary-600 hover:text-primary-800 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Oyunlara Geri Dön
          </motion.button>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
              <div className="flex items-center">
                <span className="text-4xl mr-4">{game.emoji}</span>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{game.name}</h2>
                  <p className="text-gray-600">{game.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className={`px-3 py-1 rounded-full text-white text-sm font-medium bg-gradient-to-r ${game.color}`}>
                  {game.difficulty}
                </div>
                {HintButton && <HintButton gameId={game.id} />}
              </div>
            </div>
          </div>
          
          {isLoading ? (
            <GameLoading />
          ) : (
            <Suspense fallback={<GameLoading />}>
              <GameComponent />
            </Suspense>
          )}
        </div>
      );
    }

    return (
      <>
        <div className="mb-8 flex flex-wrap gap-2 justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory === 'all' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
          >
            Tüm Oyunlar
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveCategory('memory')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory === 'memory' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
          >
            Hafıza Oyunları
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveCategory('creative')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory === 'creative' ? 'bg-pink-600 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
          >
            Yaratıcı Oyunlar
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveCategory('action')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory === 'action' ? 'bg-yellow-600 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
          >
            Aksiyon Oyunları
          </motion.button>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredGames.map((game) => (
            <motion.div
              key={game.id}
              variants={fadeIn}
              whileHover={{ scale: 1.03, y: -5 }}
              whileTap={{ scale: 0.98 }}
              className={`bg-gradient-to-br ${game.color} rounded-2xl shadow-xl overflow-hidden cursor-pointer group`}
              onClick={() => handleGameSelect(game.id)}
            >
              <div className="p-8 text-white">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold">{game.name}</h3>
                  <span className="text-4xl group-hover:animate-bounce">{game.emoji}</span>
                </div>
                <p className="text-white/90 mb-2">{game.description}</p>
                <div className="flex items-center text-xs text-white/80 mb-6">
                  <span className="inline-flex items-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {game.difficulty}
                  </span>
                  <span className="inline-flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    {game.duration}
                  </span>
                </div>
                <div className="mt-6 flex justify-end">
                  <button className="bg-white/20 hover:bg-white/30 transition-colors text-white font-medium py-2 px-4 rounded-full group-hover:bg-white group-hover:text-primary-600">
                    Oyna
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </>
    );
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      className="relative isolate overflow-hidden bg-white py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Logo Section */}
        <div className="flex justify-center mb-8">
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <motion.img 
              src={logo} 
              alt="Mio Boon's" 
              className="h-24 sm:h-28 drop-shadow-lg" 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            />
          </motion.div>
        </div>
        {renderContent()}
      </div>
    </motion.div>
  );
}