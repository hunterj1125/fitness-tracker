'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface MotivationalMessageProps {
  streak?: number;
  caloriesBurned?: number;
  workoutCount?: number;
  onClose?: () => void;
}

const motivationalMessages = {
  streak: [
    { text: " You're on FIRE! {streak} days strong!", emoji: "", color: "from-orange-500 to-red-500" },
    { text: " {streak} days in a row? You're a BEAST!", emoji: "", color: "from-purple-500 to-pink-500" },
    { text: " Consistency is KEY! Keep that {streak}-day streak alive!", emoji: "", color: "from-yellow-500 to-orange-500" },
    { text: " {streak} days! Champions show up every single day!", emoji: "", color: "from-yellow-400 to-orange-500" },
  ],
  calories: [
    { text: " {calories} calories CRUSHED! You're unstoppable!", emoji: "", color: "from-red-500 to-orange-500" },
    { text: " That's {calories} kcal of pure POWER!", emoji: "", color: "from-purple-500 to-pink-500" },
    { text: " {calories} calories down! Sky's the limit!", emoji: "", color: "from-blue-500 to-cyan-500" },
    { text: " Burning through {calories} calories like a PRO!", emoji: "", color: "from-yellow-500 to-red-500" },
  ],
  workouts: [
    { text: " {count} workouts completed! You're building greatness!", emoji: "", color: "from-purple-500 to-pink-500" },
    { text: " {count} workouts done! That's dedication right there!", emoji: "", color: "from-blue-500 to-indigo-500" },
    { text: " {count} sessions in the books! You're a STAR!", emoji: "", color: "from-yellow-400 to-orange-500" },
    { text: " {count} workouts closer to your GOALS!", emoji: "", color: "from-green-500 to-emerald-500" },
  ],
  general: [
    { text: "You got this, champion! ", emoji: "", color: "from-purple-500 to-pink-500" },
    { text: "Every rep counts! Keep pushing! ", emoji: "", color: "from-orange-500 to-red-500" },
    { text: "Strong today, STRONGER tomorrow! ", emoji: "", color: "from-yellow-500 to-orange-500" },
    { text: "Your only limit is YOU! Break it! ", emoji: "", color: "from-blue-500 to-cyan-500" },
    { text: "Pain is temporary, PRIDE is forever! ", emoji: "", color: "from-yellow-400 to-orange-500" },
    { text: "Sweat now, SHINE later! ", emoji: "", color: "from-purple-500 to-pink-500" },
  ],
};

export default function MotivationalMessage({ streak, caloriesBurned, workoutCount, onClose }: MotivationalMessageProps) {
  const [message, setMessage] = useState<{ text: string; emoji: string; color: string } | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    let selectedMessage;
    
    if (streak && streak >= 5) {
      const messages = motivationalMessages.streak;
      selectedMessage = messages[Math.floor(Math.random() * messages.length)];
      selectedMessage.text = selectedMessage.text.replace('{streak}', streak.toString());
    } else if (caloriesBurned && caloriesBurned >= 2000) {
      const messages = motivationalMessages.calories;
      selectedMessage = messages[Math.floor(Math.random() * messages.length)];
      selectedMessage.text = selectedMessage.text.replace('{calories}', caloriesBurned.toString());
    } else if (workoutCount && workoutCount >= 10) {
      const messages = motivationalMessages.workouts;
      selectedMessage = messages[Math.floor(Math.random() * messages.length)];
      selectedMessage.text = selectedMessage.text.replace('{count}', workoutCount.toString());
    } else {
      const messages = motivationalMessages.general;
      selectedMessage = messages[Math.floor(Math.random() * messages.length)];
    }

    setMessage(selectedMessage);
    setTimeout(() => setShow(true), 500);

    const timer = setTimeout(() => {
      setShow(false);
      setTimeout(() => onClose?.(), 300);
    }, 6000);

    return () => clearTimeout(timer);
  }, [streak, caloriesBurned, workoutCount, onClose]);

  if (!message) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -100, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="fixed top-8 right-8 z-50 max-w-md"
        >
          <div className={`relative bg-gradient-to-r ${message.color} rounded-2xl p-6 shadow-2xl border-2 border-white/20`}>
            {/* Animated background pulse */}
            <motion.div
              className="absolute inset-0 bg-white/10 rounded-2xl"
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            <div className="relative z-10 flex items-start gap-4">
              {/* Animated emoji */}
              <motion.div
                className="text-5xl"
                animate={{
                  rotate: [0, -10, 10, -10, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  repeatDelay: 2,
                }}
              >
                {message.emoji}
              </motion.div>

              <div className="flex-1">
                <p className="text-white font-bold text-xl leading-tight">
                  {message.text}
                </p>
              </div>

              {/* Close button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  setShow(false);
                  setTimeout(() => onClose?.(), 300);
                }}
                className="text-white/70 hover:text-white text-2xl leading-none"
              >
                
              </motion.button>
            </div>

            {/* Progress bar */}
            <motion.div
              className="absolute bottom-0 left-0 h-1 bg-white/50 rounded-b-2xl"
              initial={{ width: '100%' }}
              animate={{ width: '0%' }}
              transition={{ duration: 6, ease: 'linear' }}
            />

            {/* Sparkles */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full"
                style={{
                  left: `${20 + i * 20}%`,
                  top: '50%',
                }}
                animate={{
                  y: [-20, -40, -20],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
