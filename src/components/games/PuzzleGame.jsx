import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import gameImages from '../GameImages';

const GRID_SIZE = 3; // 3x3 puzzle
const PUZZLE_CONTAINER_SIZE = 400; // in pixels

export default function PuzzleGame() {
  const [selectedImage, setSelectedImage] = useState(gameImages[0]);
  const [pieces, setPieces] = useState([]);
  const [solved, setSolved] = useState(false);
  const [moves, setMoves] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // Generate hint based on current puzzle state
  const generateHint = () => {
    if (!gameStarted || solved) return null;
    
    const emptyPiece = pieces.find(piece => piece.isEmpty);
    const adjacentPieces = pieces.filter(piece => 
      !piece.isEmpty && (
        (Math.abs(piece.row - emptyPiece.row) === 1 && piece.col === emptyPiece.col) ||
        (Math.abs(piece.col - emptyPiece.col) === 1 && piece.row === emptyPiece.row)
      )
    );
    
    // Find the best piece to move (closest to its target position)
    const bestMove = adjacentPieces.reduce((best, piece) => {
      const currentDistance = Math.abs(piece.row - piece.targetRow) + Math.abs(piece.col - piece.targetCol);
      const newDistance = Math.abs(emptyPiece.row - piece.targetRow) + Math.abs(emptyPiece.col - piece.targetCol);
      
      if (newDistance < currentDistance) {
        return piece;
      }
      return best;
    }, adjacentPieces[0]);
    
    return bestMove;
  };
  
  // Initialize the puzzle
  const initializePuzzle = () => {
    const newPieces = [];
    const pieceSize = PUZZLE_CONTAINER_SIZE / GRID_SIZE;
    
    // Create puzzle pieces
    for (let row = 0; row < GRID_SIZE; row++) {
      for (let col = 0; col < GRID_SIZE; col++) {
        // The last piece is empty (for 3x3, it's the 9th piece)
        if (row === GRID_SIZE - 1 && col === GRID_SIZE - 1) {
          newPieces.push({
            id: GRID_SIZE * GRID_SIZE - 1,
            row,
            col,
            targetRow: row,
            targetCol: col,
            isEmpty: true,
            x: col * pieceSize,
            y: row * pieceSize,
            width: pieceSize,
            height: pieceSize
          });
        } else {
          newPieces.push({
            id: row * GRID_SIZE + col,
            row,
            col,
            targetRow: row,
            targetCol: col,
            isEmpty: false,
            x: col * pieceSize,
            y: row * pieceSize,
            width: pieceSize,
            height: pieceSize,
            backgroundPosition: `-${col * pieceSize}px -${row * pieceSize}px`
          });
        }
      }
    }
    
    return newPieces;
  };
  
  // Shuffle the puzzle pieces
  const shufflePuzzle = () => {
    const shuffled = [...initializePuzzle()];
    
    // Perform random valid moves to shuffle
    for (let i = 0; i < 100; i++) {
      const emptyPiece = shuffled.find(piece => piece.isEmpty);
      const movablePieces = shuffled.filter(piece => 
        !piece.isEmpty && (
          (Math.abs(piece.row - emptyPiece.row) === 1 && piece.col === emptyPiece.col) ||
          (Math.abs(piece.col - emptyPiece.col) === 1 && piece.row === emptyPiece.row)
        )
      );
      
      if (movablePieces.length > 0) {
        const randomPiece = movablePieces[Math.floor(Math.random() * movablePieces.length)];
        // Swap positions
        const tempRow = randomPiece.row;
        const tempCol = randomPiece.col;
        randomPiece.row = emptyPiece.row;
        randomPiece.col = emptyPiece.col;
        emptyPiece.row = tempRow;
        emptyPiece.col = tempCol;
      }
    }
    
    // Update x, y coordinates based on new row, col values
    const pieceSize = PUZZLE_CONTAINER_SIZE / GRID_SIZE;
    shuffled.forEach(piece => {
      piece.x = piece.col * pieceSize;
      piece.y = piece.row * pieceSize;
    });
    
    return shuffled;
  };
  
  // Start a new game
  const startGame = () => {
    setPieces(shufflePuzzle());
    setMoves(0);
    setSolved(false);
    setGameStarted(true);
  };
  
  // Handle piece click
  const handlePieceClick = (clickedPiece) => {
    if (solved || clickedPiece.isEmpty) return;
    
    const emptyPiece = pieces.find(piece => piece.isEmpty);
    
    // Check if the clicked piece can move (adjacent to empty piece)
    const canMove = 
      (Math.abs(clickedPiece.row - emptyPiece.row) === 1 && clickedPiece.col === emptyPiece.col) ||
      (Math.abs(clickedPiece.col - emptyPiece.col) === 1 && clickedPiece.row === emptyPiece.row);
    
    if (canMove) {
      // Swap positions
      const newPieces = pieces.map(piece => {
        if (piece.id === clickedPiece.id) {
          return {
            ...piece,
            row: emptyPiece.row,
            col: emptyPiece.col,
            x: emptyPiece.col * (PUZZLE_CONTAINER_SIZE / GRID_SIZE),
            y: emptyPiece.row * (PUZZLE_CONTAINER_SIZE / GRID_SIZE)
          };
        }
        if (piece.id === emptyPiece.id) {
          return {
            ...piece,
            row: clickedPiece.row,
            col: clickedPiece.col,
            x: clickedPiece.col * (PUZZLE_CONTAINER_SIZE / GRID_SIZE),
            y: clickedPiece.row * (PUZZLE_CONTAINER_SIZE / GRID_SIZE)
          };
        }
        return piece;
      });
      
      setPieces(newPieces);
      setMoves(moves + 1);
      
      // Check if puzzle is solved
      const isSolved = newPieces.every(piece => 
        piece.row === piece.targetRow && piece.col === piece.targetCol
      );
      
      if (isSolved) {
        setSolved(true);
      }
    }
  };
  
  // Change the selected image
  const handleImageChange = (image) => {
    setSelectedImage(image);
    if (gameStarted) {
      // Restart the game with the new image
      startGame();
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 bg-white rounded-2xl shadow-xl max-w-4xl mx-auto"
    >
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Hayvan Yapbozu</h2>
        <p className="text-lg text-gray-600 mb-4">Parçaları doğru yerlere taşıyarak resmi tamamla!</p>
        
        <div className="flex justify-center gap-4 mb-6 flex-wrap">
          {gameImages.slice(0, 4).map((image) => (
            <motion.button
              key={image.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`relative overflow-hidden rounded-lg border-2 ${selectedImage.id === image.id ? 'border-primary-500' : 'border-gray-200'}`}
              onClick={() => handleImageChange(image)}
              style={{ width: '60px', height: '60px' }}
            >
              <img 
                src={image.image} 
                alt={image.alt} 
                className="w-full h-full object-cover"
              />
            </motion.button>
          ))}
        </div>
        
        <div className="flex flex-col items-center gap-4 max-w-xs mx-auto mb-6">
          <div className="flex justify-between items-center w-full">
            <div className="text-lg font-semibold text-primary-600">Hamle: {moves}</div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-green-500 text-white rounded-full font-semibold hover:bg-green-600 transition-colors"
              onClick={startGame}
            >
              {gameStarted ? 'Yeniden Başlat' : 'Oyunu Başlat'}
            </motion.button>
          </div>
          {gameStarted && !solved && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-yellow-500 text-white rounded-full font-semibold hover:bg-yellow-600 transition-colors w-full"
              onClick={() => setShowHint(!showHint)}
            >
              {showHint ? 'İpucunu Gizle' : 'İpucu Göster'}
            </motion.button>
          )}
        </div>
      </div>
      
      <div className="flex justify-center">
        <div 
          className="relative bg-gray-100 rounded-xl overflow-hidden w-full max-w-[400px] aspect-square"
        >
          {!gameStarted ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <img 
                src={selectedImage.image} 
                alt={selectedImage.alt} 
                className="w-full h-full object-cover opacity-50"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                <p className="text-xl text-white font-bold">Başlamak için butona tıkla!</p>
              </div>
            </div>
          ) : (
            pieces.map((piece) => (
              <motion.div
                key={piece.id}
                className={`absolute cursor-pointer ${piece.isEmpty ? 'bg-gray-200' : 'bg-white shadow-md'} ${showHint && generateHint()?.id === piece.id ? 'ring-4 ring-yellow-400 ring-opacity-75' : ''}`}
                style={{
                  width: `${100 / GRID_SIZE}%`,
                  height: `${100 / GRID_SIZE}%`,
                  x: `${(piece.col * 100) / GRID_SIZE}%`,
                  y: `${(piece.row * 100) / GRID_SIZE}%`,
                  backgroundImage: piece.isEmpty ? 'none' : `url(${selectedImage.image})`,
                  backgroundSize: '400% 400%',
                  backgroundPosition: `${-(piece.col * 100) / (GRID_SIZE - 1)}% ${-(piece.row * 100) / (GRID_SIZE - 1)}%`,
                  zIndex: piece.isEmpty ? 0 : 1,
                }}
                animate={{ 
                  x: `${(piece.col * 100) / GRID_SIZE}%`, 
                  y: `${(piece.row * 100) / GRID_SIZE}%` 
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                onClick={() => handlePieceClick(piece)}
                whileHover={{ scale: !piece.isEmpty && !solved ? 1.02 : 1 }}
              >
                {piece.isEmpty && !solved && (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-gray-400">Boş</span>
                  </div>
                )}
              </motion.div>
            ))
          )}
          
          {solved && (
            <motion.div 
              className="absolute inset-0 bg-green-500 bg-opacity-70 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div 
                className="bg-white p-6 rounded-xl shadow-lg text-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.3 }}
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Tebrikler!</h3>
                <p className="text-lg text-gray-600 mb-4">Yapbozu {moves} hamlede tamamladın!</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-primary-500 text-white rounded-full font-semibold hover:bg-primary-600 transition-colors"
                  onClick={startGame}
                >
                  Tekrar Oyna
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}