'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface CelebrationEffectProps {
  children: React.ReactNode;
  message?: string;
}

export default function CelebrationEffect({ children, message = "Great job!" }: CelebrationEffectProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const handleClick = () => {
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 2000);
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {children}

      {/* Confetti particles on hover */}
      {isHovered && (
        <>
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute pointer-events-none"
              style={{
                left: '50%',
                top: '50%',
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                x: [0, (Math.random() - 0.5) * 100],
                y: [0, (Math.random() - 0.5) * 100],
                rotate: [0, Math.random() * 360],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.1,
              }}
            >
              <span className="text-2xl">
                {['', '', '', '', '', '', '', ''][i]}
              </span>
            </motion.div>
          ))}
        </>
      )}

      {/* Popup message on click */}
      {showMessage && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.8 }}
          animate={{ opacity: 1, y: -40, scale: 1 }}
          exit={{ opacity: 0, y: -60, scale: 0.8 }}
          className="absolute top-0 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold px-6 py-3 rounded-full shadow-2xl whitespace-nowrap z-50 pointer-events-none"
        >
          {message} 
        </motion.div>
      )}
    </div>
  );
}
