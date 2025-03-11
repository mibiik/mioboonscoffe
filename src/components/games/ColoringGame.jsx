import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

const colors = [
  '#FF5733', // Red
  '#FFC300', // Yellow
  '#36D7B7', // Teal
  '#3498DB', // Blue
  '#9B59B6', // Purple
  '#2ECC71', // Green
  '#F1C40F', // Gold
  '#E74C3C', // Crimson
  '#1ABC9C', // Turquoise
  '#FF9FF3', // Pink
];

const drawings = [
  {
    id: 'butterfly',
    name: 'Kelebek',
    paths: [
      'M50,40 C60,30 70,50 80,40 C90,30 100,50 110,40 C120,30 130,50 140,40 C130,60 120,80 110,100 C100,80 90,60 80,40 C70,60 60,80 50,100 C40,80 30,60 20,40 C30,50 40,30 50,40 Z',
      'M80,70 C85,75 95,75 100,70',
      'M80,80 C90,90 100,80 110,90',
      'M70,50 C75,55 85,55 90,50',
      'M100,50 C105,55 115,55 120,50',
    ],
  },
  {
    id: 'fish',
    name: 'Balık',
    paths: [
      'M50,80 C70,60 130,60 150,80 C130,100 70,100 50,80 Z',
      'M150,80 L170,95 L170,65 Z',
      'M75,70 C78,73 82,73 85,70',
      'M80,70 A2,2 0 1,1 80,74',
    ],
  },
  {
    id: 'house',
    name: 'Ev',
    paths: [
      'M50,120 L50,70 L100,40 L150,70 L150,120 Z', // House outline
      'M75,120 L75,90 L100,90 L100,120 Z', // Door
      'M110,100 L130,100 L130,80 L110,80 Z', // Window
      'M60,60 C65,50 75,50 80,60', // Smoke 1
      'M70,50 C75,40 85,40 90,50', // Smoke 2
    ],
  },
];

export default function ColoringGame() {
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [currentDrawing, setCurrentDrawing] = useState(drawings[0]);
  const [coloredPaths, setColoredPaths] = useState({});
  const svgRef = useRef(null);

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  const handlePathClick = (pathIndex) => {
    setColoredPaths({
      ...coloredPaths,
      [pathIndex]: selectedColor,
    });
  };

  const handleDrawingChange = (drawing) => {
    setCurrentDrawing(drawing);
    setColoredPaths({});
  };

  const handleClearAll = () => {
    setColoredPaths({});
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 bg-white rounded-2xl shadow-xl max-w-4xl mx-auto"
    >
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Boyama Oyunu</h2>
        <p className="text-lg text-gray-600 mb-4">Sevimli resimleri istediğin gibi renklendir!</p>
        
        <div className="flex justify-center gap-4 mb-6">
          {drawings.map((drawing) => (
            <motion.button
              key={drawing.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-full font-semibold transition-colors ${currentDrawing.id === drawing.id ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-800'}`}
              onClick={() => handleDrawingChange(drawing)}
            >
              {drawing.name}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 flex flex-col items-center">
          <div className="bg-gray-100 rounded-xl p-4 w-full max-w-md aspect-square flex items-center justify-center">
            <svg
              ref={svgRef}
              viewBox="0 0 200 150"
              className="w-full h-full"
            >
              {currentDrawing.paths.map((path, index) => (
                <motion.path
                  key={index}
                  d={path}
                  fill={coloredPaths[index] || 'white'}
                  stroke="black"
                  strokeWidth="2"
                  onClick={() => handlePathClick(index)}
                  whileHover={{ scale: 1.01 }}
                  className="cursor-pointer"
                />
              ))}
            </svg>
          </div>
        </div>

        <div className="flex-shrink-0 md:w-48">
          <div className="bg-gray-100 rounded-xl p-4">
            <h3 className="text-lg font-semibold mb-3 text-center">Renkler</h3>
            <div className="grid grid-cols-2 gap-3">
              {colors.map((color) => (
                <motion.div
                  key={color}
                  className="aspect-square rounded-full cursor-pointer ring-2 ring-offset-2"
                  style={{
                    backgroundColor: color,
                    ringColor: selectedColor === color ? 'black' : 'transparent',
                  }}
                  onClick={() => handleColorSelect(color)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full mt-4 px-4 py-2 bg-secondary-500 text-white rounded-full font-semibold hover:bg-secondary-600 transition-colors"
              onClick={handleClearAll}
            >
              Temizle
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}