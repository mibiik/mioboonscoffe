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
  const [containerSize, setContainerSize] = useState(Math.min(400, window.innerWidth - 48));

  useEffect(() => {
    const handleResize = () => {
      setContainerSize(Math.min(400, window.innerWidth - 48));
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Initialize the puzzle
  const initializePuzzle = () => {
    const newPieces = [];
    const pieceSize = containerSize / GRID_SIZE;
    
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
    const pieceSize = containerSize / GRID_SIZE;
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
            x: emptyPiece.col * (containerSize / GRID_SIZE),
            y: emptyPiece.row * (containerSize / GRID_SIZE)
          };
        }
        if (piece.id === emptyPiece.id) {
          return {
            ...piece,
            row: clickedPiece.row,
            col: clickedPiece.col,
            x: clickedPiece.col * (containerSize / GRID_SIZE),
            y: clickedPiece.row * (containerSize / GRID_SIZE)
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
        <p className="text-lg text-gray-600 mb-4">Sevimli hayvan resimlerini tamamla!</p>
        
        <div className="flex justify-center gap-4 mb-6">
          {gameImages.map((image) => (
            <motion.button
              key={image.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`w-16 h-16 rounded-lg overflow-hidden border-2 ${selectedImage.id === image.id ? 'border-primary-500' : 'border-gray-200'}`}
              onClick={() => handleImageChange(image)}
            >
              <img
                src={image.image}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
            </motion.button>
          ))}
        </div>
        
        {!gameStarted ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all"
            onClick={startGame}
          >
            Oyunu Başlat
          </motion.button>
        ) : (
          <div className="flex justify-between items-center max-w-xs mx-auto mb-4">
            <div className="text-xl font-semibold text-primary-600">Hamle: {moves}</div>
            {solved && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-xl font-semibold text-green-600"
              >
                Tebrikler! 🎉
              </motion.div>
            )}
          </div>
        )}
      </div>

      {gameStarted && (
        <div
          className="relative mx-auto rounded-lg overflow-hidden bg-gray-100"
          style={{
            width: containerSize,
            height: containerSize
          }}
        >
          {pieces.map((piece) => (
            <motion.div
              key={piece.id}
              className={`absolute cursor-pointer ${piece.isEmpty ? 'bg-gray-200' : ''}`}
              style={{
                width: piece.width,
                height: piece.height,
                x: piece.x,
                y: piece.y,
                backgroundImage: piece.isEmpty ? 'none' : `url(${selectedImage.image})`,
                backgroundSize: `${containerSize}px ${containerSize}px`,
                backgroundPosition: piece.backgroundPosition
              }}
              onClick={() => handlePieceClick(piece)}
              whileHover={!piece.isEmpty && !solved ? { scale: 0.95 } : {}}
              animate={{ x: piece.x, y: piece.y }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}