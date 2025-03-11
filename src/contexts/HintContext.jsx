import React, { createContext, useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Create the context
const HintContext = createContext();

// Hint data for different games
const gameHints = {
  memory: [
    'Kartları açtığınızda konumlarını hatırlamaya çalışın.',
    'Eşleşen kartları bulmak için sistematik bir şekilde ilerleyin.',
    'Kartların yerlerini hatırlamak için görsel ipuçları kullanın.',
    'Önce köşelerdeki kartları açmayı deneyin.',
    'Eşleşen çiftleri bulduğunuzda kalan kartlara odaklanın.',
    'Her açtığınız kartın konumunu aklınızda tutun.',
    'Benzer sembolleri gruplandırarak hatırlamaya çalışın.',
    'Kartları açarken bir strateji belirleyin ve ona bağlı kalın.'
  ],
  coloring: [
    'Önce dış hatları boyamaya başlayın.',
    'Benzer alanları aynı renkle boyayabilirsiniz.',
    'Kontrast renkler kullanarak resmi daha canlı gösterebilirsiniz.',
    'Açık renklerden koyu renklere doğru ilerleyin.',
    'Küçük detaylar için ince fırça kullanır gibi dikkatli olun.',
    'Renkleri karıştırarak yeni tonlar elde edebilirsiniz.',
    'Büyük alanları önce boyayarak genel görünümü oluşturun.',
    'Her bölüm için uygun renk seçimi yapın.'
  ],
  balloon: [
    'Ekranın alt kısmındaki balonlara öncelik verin.',
    'Aynı renkteki balonları sırayla patlatmayı deneyin.',
    'Büyük balonlar daha kolay hedeflerdir.',
    'Balonların hareket yönünü tahmin etmeye çalışın.',
    'Ekranın ortasına odaklanın ve oradan dışa doğru ilerleyin.',
    'Hızlı hareket eden balonları takip edin.',
    'Balonları gruplar halinde patlatmaya çalışın.',
    'Fare imlecini stratejik noktalarda tutun.'
  ],
  puzzle: [
    'Önce köşe parçaları bulmaya çalışın.',
    'Kenar parçalarını birleştirerek çerçeveyi oluşturun.',
    'Benzer renk ve desenleri olan parçaları gruplandırın.',
    'Resmin bütününü hayal etmeye çalışın.',
    'Parçaları döndürerek farklı açılardan bakmayı deneyin.',
    'Belirgin desenleri olan parçaları önce yerleştirin.',
    'Parçaları renk tonlarına göre ayırın.',
    'Tamamladığınız bölümleri referans alın.'
  ],
  math: [
    'İşlem önceliğini hatırlayın: çarpma/bölme, toplama/çıkarma.',
    'Sayıları yuvarlayarak hızlı tahminler yapabilirsiniz.',
    'Çarpım tablosunu hatırlamaya çalışın.',
    'Zihninizde basit hesaplamalar yapın.',
    'Şıkları elemek için mantık kullanın.',
    'Büyük sayıları parçalara ayırarak hesaplayın.',
    'Sonucun mantıklı olup olmadığını kontrol edin.',
    'İşlemleri adım adım çözün.'
  ],
  whackamole: [
    'Köstebeklerin çıktığı deliklere odaklanın.',
    'Fare imlecini ekranın ortasında tutun.',
    'Belirli bir ritim veya desen arayın.',
    'Köstebeklerin tamamen çıkmasını bekleyin.',
    'Ekranın tamamını görmeye çalışın, sadece bir noktaya odaklanmayın.',
    'Köstebeklerin çıkış hızına dikkat edin.',
    'Yakın deliklerdeki köstebeklere öncelik verin.',
    'Fare hareketlerinizi minimize edin.'
  ]
};

// Provider component
export const HintProvider = ({ children }) => {
  const [hints, setHints] = useState({});
  const [showHintModal, setShowHintModal] = useState(false);
  const [currentGameId, setCurrentGameId] = useState(null);
  const [currentHintIndex, setCurrentHintIndex] = useState(0);
  const [hintUsageCount, setHintUsageCount] = useState({});

  // Initialize hints for a game
  const initializeHints = (gameId) => {
    if (!gameId) return;
    
    setCurrentGameId(gameId);
    setCurrentHintIndex(0);
    
    if (!hints[gameId]) {
      setHints(prev => ({
        ...prev,
        [gameId]: {
          available: gameHints[gameId] || [],
          used: []
        }
      }));
    }
  };

  // Get next hint
  const getNextHint = () => {
    if (!currentGameId) return null;
    
    const gameHintData = hints[currentGameId];
    if (!gameHintData) return null;
    
    const availableHints = gameHintData.available;
    if (availableHints.length === 0) return null;
    
    // Update hint usage count
    setHintUsageCount(prev => ({
      ...prev,
      [currentGameId]: (prev[currentGameId] || 0) + 1
    }));
    
    // Get next hint index with cycling
    const nextIndex = currentHintIndex % availableHints.length;
    const hint = availableHints[nextIndex];
    setCurrentHintIndex(prev => prev + 1);
    
    // Add to used hints
    setHints(prev => ({
      ...prev,
      [currentGameId]: {
        ...prev[currentGameId],
        used: [...prev[currentGameId].used, hint]
      }
    }));
    
    return hint;
  };

  // Reset hints for a game
  const resetHints = (gameId) => {
    if (!gameId) return;
    
    setCurrentHintIndex(0);
    setHintUsageCount(prev => ({ ...prev, [gameId]: 0 }));
    setHints(prev => ({
      ...prev,
      [gameId]: {
        available: gameHints[gameId] || [],
        used: []
      }
    }));
  };

  // Toggle hint modal
  const toggleHintModal = () => {
    setShowHintModal(prev => !prev);
  };

  // Hint Modal Component
  const HintModal = () => {
    const hint = currentGameId ? getNextHint() : null;
    
    return (
      <AnimatePresence>
        {showHintModal && hint && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
            onClick={toggleHintModal}
          >
            <motion.div 
              className="bg-white rounded-xl p-6 max-w-md w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-primary-600">İpucu</h3>
                <button 
                  onClick={toggleHintModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="p-4 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg mb-4">
                <p className="text-gray-800 text-lg">{hint}</p>
              </div>
              
              <div className="flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-full font-medium"
                  onClick={toggleHintModal}
                >
                  Anladım
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  // Hint Button Component
  const HintButton = ({ gameId }) => {
    // Make sure we have the correct game ID
    if (gameId && currentGameId !== gameId) {
      initializeHints(gameId);
    }
    
    return (
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-4 py-2 bg-gradient-to-r from-amber-400 to-yellow-500 text-white rounded-full font-medium flex items-center shadow-md hover:shadow-lg transition-all"
        onClick={toggleHintModal}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
        İpucu Al
      </motion.button>
    );
  };

  return (
    <HintContext.Provider value={{ 
      initializeHints, 
      getNextHint, 
      resetHints,
      toggleHintModal,
      HintButton,
      HintModal
    }}>
      {children}
      <HintModal />
    </HintContext.Provider>
  );
};

// Custom hook to use the hint context
export const useHint = () => {
  const context = useContext(HintContext);
  if (!context) {
    throw new Error('useHint must be used within a HintProvider');
  }
  return context;
};