import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Define difficulty levels
const DIFFICULTY_LEVELS = {
  EASY: 'easy',
  MEDIUM: 'medium',
  HARD: 'hard'
};

// Generate a random math problem based on difficulty
const generateProblem = (difficulty) => {
  let num1, num2, operator, answer, options;
  
  switch (difficulty) {
    case DIFFICULTY_LEVELS.EASY:
      num1 = Math.floor(Math.random() * 10) + 1; // 1-10
      num2 = Math.floor(Math.random() * 10) + 1; // 1-10
      operator = '+';
      answer = num1 + num2;
      break;
    case DIFFICULTY_LEVELS.MEDIUM:
      num1 = Math.floor(Math.random() * 15) + 5; // 5-20
      num2 = Math.floor(Math.random() * 10) + 1; // 1-10
      operator = Math.random() > 0.5 ? '+' : '-';
      answer = operator === '+' ? num1 + num2 : num1 - num2;
      // Ensure subtraction doesn't result in negative numbers
      if (operator === '-' && num1 < num2) {
        [num1, num2] = [num2, num1];
        answer = num1 - num2;
      }
      break;
    case DIFFICULTY_LEVELS.HARD:
      num1 = Math.floor(Math.random() * 10) + 1; // 1-10
      num2 = Math.floor(Math.random() * 10) + 1; // 1-10
      const operators = ['+', '-', '×'];
      operator = operators[Math.floor(Math.random() * operators.length)];
      
      if (operator === '+') answer = num1 + num2;
      else if (operator === '-') {
        // Ensure subtraction doesn't result in negative numbers
        if (num1 < num2) {
          [num1, num2] = [num2, num1];
        }
        answer = num1 - num2;
      }
      else answer = num1 * num2;
      break;
    default:
      num1 = Math.floor(Math.random() * 10) + 1;
      num2 = Math.floor(Math.random() * 10) + 1;
      operator = '+';
      answer = num1 + num2;
  }
  
  // Generate answer options (including the correct one)
  options = generateOptions(answer, difficulty);
  
  return {
    num1,
    num2,
    operator,
    answer,
    options
  };
};

// Generate answer options
const generateOptions = (correctAnswer, difficulty) => {
  const options = [correctAnswer];
  const optionCount = 4; // 4 options total
  
  // Range for wrong answers based on difficulty
  let range;
  switch (difficulty) {
    case DIFFICULTY_LEVELS.EASY:
      range = 5;
      break;
    case DIFFICULTY_LEVELS.MEDIUM:
      range = 10;
      break;
    case DIFFICULTY_LEVELS.HARD:
      range = 15;
      break;
    default:
      range = 5;
  }
  
  // Generate wrong options
  while (options.length < optionCount) {
    // Generate a random offset from the correct answer
    const offset = Math.floor(Math.random() * range) + 1;
    // Randomly add or subtract the offset
    const wrongAnswer = Math.random() > 0.5 
      ? correctAnswer + offset 
      : Math.max(1, correctAnswer - offset); // Ensure no negative or zero answers
    
    // Only add if not already in options
    if (!options.includes(wrongAnswer)) {
      options.push(wrongAnswer);
    }
  }
  
  // Shuffle options
  return options.sort(() => Math.random() - 0.5);
};

export default function MathGame() {
  const [difficulty, setDifficulty] = useState(DIFFICULTY_LEVELS.EASY);
  const [problem, setProblem] = useState(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [isCorrect, setIsCorrect] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [timerActive, setTimerActive] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // Generate hint based on current problem
  const generateHint = () => {
    if (!problem) return '';
    
    let hint = '';
    switch (difficulty) {
      case DIFFICULTY_LEVELS.EASY:
        hint = `İpucu: ${problem.num1} ve ${problem.num2} sayılarını topla`;
        break;
      case DIFFICULTY_LEVELS.MEDIUM:
        if (problem.operator === '+')
          hint = `İpucu: Önce ${problem.num1}'e ${Math.floor(problem.num2/2)} ekle, sonra ${problem.num2 - Math.floor(problem.num2/2)} ekle`;
        else
          hint = `İpucu: ${problem.num1}'den ${Math.floor(problem.num2/2)} çıkar, sonra ${problem.num2 - Math.floor(problem.num2/2)} çıkar`;
        break;
      case DIFFICULTY_LEVELS.HARD:
        if (problem.operator === '×')
          hint = `İpucu: ${problem.num1}'i ${Math.floor(problem.num2/2)} ile çarp ve sonuca ${problem.num1 * (problem.num2 - Math.floor(problem.num2/2))} ekle`;
        else
          hint = `İpucu: İşlemi adım adım yap`;
        break;
      default:
        hint = 'İpucu: İşlemi dikkatli yap';
    }
    return hint;
  };
  
  // Initialize or reset the game
  const startGame = () => {
    setProblem(generateProblem(difficulty));
    setScore(0);
    setStreak(0);
    setIsCorrect(null);
    setSelectedOption(null);
    setGameStarted(true);
    setTimeLeft(30);
    setTimerActive(true);
  };
  
  // Generate a new problem
  const nextProblem = () => {
    setProblem(generateProblem(difficulty));
    setIsCorrect(null);
    setSelectedOption(null);
  };
  
  // Handle answer selection
  const handleOptionSelect = (option) => {
    if (isCorrect !== null) return; // Prevent multiple selections
    
    setSelectedOption(option);
    const correct = option === problem.answer;
    setIsCorrect(correct);
    
    if (correct) {
      setScore(score + (difficulty === DIFFICULTY_LEVELS.EASY ? 1 : 
                        difficulty === DIFFICULTY_LEVELS.MEDIUM ? 2 : 3));
      setStreak(streak + 1);
    } else {
      setStreak(0);
    }
    
    // Move to next problem after a delay
    setTimeout(() => {
      nextProblem();
    }, 1500);
  };
  
  // Handle difficulty change
  const handleDifficultyChange = (newDifficulty) => {
    setDifficulty(newDifficulty);
    if (gameStarted) {
      setProblem(generateProblem(newDifficulty));
      setIsCorrect(null);
      setSelectedOption(null);
    }
  };
  
  // Timer effect
  useEffect(() => {
    let timer;
    if (timerActive && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setTimerActive(false);
      setGameStarted(false);
    }
    
    return () => clearTimeout(timer);
  }, [timerActive, timeLeft]);
  
  // Initialize the first problem
  useEffect(() => {
    if (!problem && gameStarted) {
      setProblem(generateProblem(difficulty));
    }
  }, [problem, gameStarted, difficulty]);
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 bg-white rounded-2xl shadow-xl max-w-4xl mx-auto"
    >
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Matematik Oyunu</h2>
        <p className="text-lg text-gray-600 mb-4">Eğlenceli matematik soruları çöz!</p>
        {gameStarted && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-yellow-500 text-white rounded-full font-semibold hover:bg-yellow-600 transition-colors mb-4"
            onClick={() => setShowHint(!showHint)}
          >
            {showHint ? 'İpucunu Gizle' : 'İpucu Göster'}
          </motion.button>
        )}
        {showHint && gameStarted && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-yellow-100 p-3 rounded-lg text-yellow-800 mb-4"
          >
            {generateHint()}
          </motion.div>
        )}
        
        <div className="flex justify-center gap-4 mb-6">
          {Object.values(DIFFICULTY_LEVELS).map((level) => (
            <motion.button
              key={level}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-full font-semibold transition-colors ${difficulty === level ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-800'}`}
              onClick={() => handleDifficultyChange(level)}
            >
              {level === DIFFICULTY_LEVELS.EASY ? 'Kolay' : 
               level === DIFFICULTY_LEVELS.MEDIUM ? 'Orta' : 'Zor'}
            </motion.button>
          ))}
        </div>
        
        <div className="flex justify-between items-center max-w-xs mx-auto mb-6">
          <div className="text-lg font-semibold text-primary-600">Puan: {score}</div>
          {gameStarted && (
            <div className="text-lg font-semibold text-secondary-600">Süre: {timeLeft}s</div>
          )}
        </div>
        
        {!gameStarted && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all mb-6"
            onClick={startGame}
          >
            Oyunu Başlat
          </motion.button>
        )}
        
        {gameStarted && streak >= 3 && (
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="mb-4 inline-block px-4 py-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-full"
          >
            🔥 {streak} seri doğru!
          </motion.div>
        )}
      </div>
      
      {gameStarted && problem && (
        <div className="max-w-md mx-auto">
          <motion.div 
            className="bg-gradient-to-r from-purple-100 to-indigo-100 rounded-xl p-8 mb-6 shadow-md"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            key={problem.num1 + problem.operator + problem.num2} // Force animation on problem change
          >
            <div className="text-4xl font-bold text-center mb-6">
              {problem.num1} {problem.operator} {problem.num2} = ?
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {problem.options.map((option, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`py-4 text-xl font-bold rounded-lg shadow transition-colors ${selectedOption === option ? 
                    (isCorrect === true ? 'bg-green-500 text-white' : 
                     isCorrect === false ? 'bg-red-500 text-white' : 'bg-blue-500 text-white') : 
                    'bg-white hover:bg-gray-100'}`}
                  onClick={() => handleOptionSelect(option)}
                  disabled={isCorrect !== null}
                >
                  {option}
                </motion.button>
              ))}
            </div>
          </motion.div>
          
          <AnimatePresence>
            {isCorrect === true && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center text-green-500 text-xl font-bold"
              >
                Doğru! 👏
              </motion.div>
            )}
            
            {isCorrect === false && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center text-red-500 text-xl font-bold"
              >
                Yanlış! Doğru cevap: {problem.answer}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
      
      {!gameStarted && score > 0 && (
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="max-w-md mx-auto p-6 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-xl text-center"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Oyun Bitti!</h3>
          <p className="text-xl text-gray-800 mb-4">Toplam Puanın: {score}</p>
          <p className="text-lg text-gray-700">Tekrar oynamak için "Oyunu Başlat" butonuna tıkla!</p>
        </motion.div>
      )}
    </motion.div>
  );
}