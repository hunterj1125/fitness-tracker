'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { WorkoutStat } from '../types/fitness';

interface StatCardProps {
  stat: WorkoutStat;
  index: number;
}

function CountUpAnimation({ end, duration = 2 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return <span>{count}</span>;
}

export default function StatCard({ stat, index }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        type: 'spring',
        stiffness: 100,
      }}
      whileHover={{
        scale: 1.05,
        y: -5,
        transition: { duration: 0.2 },
      }}
      className={`relative overflow-hidden bg-gradient-to-br ${stat.color} rounded-2xl p-6 shadow-xl cursor-pointer group`}
    >
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"
        animate={{
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
            }}
            animate={{
              y: [-10, -30, -10],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 2 + i * 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.2,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Icon */}
        <motion.div
          className="text-5xl mb-4"
          animate={{
            rotate: [0, 10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {stat.icon}
        </motion.div>

        {/* Label */}
        <p className="text-white/80 text-sm font-medium mb-2 uppercase tracking-wide">
          {stat.label}
        </p>

        {/* Value with count-up animation */}
        <div className="flex items-baseline gap-2 mb-3">
          <motion.h3
            className="text-5xl font-bold text-white"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: 'spring',
              stiffness: 200,
              delay: index * 0.1 + 0.3,
            }}
          >
            <CountUpAnimation end={stat.value} duration={1.5} />
          </motion.h3>
          <span className="text-2xl font-semibold text-white/70">{stat.unit}</span>
        </div>

        {/* Change indicator */}
        <motion.div
          className={`flex items-center gap-1 text-sm font-semibold ${
            stat.change >= 0 ? 'text-green-300' : 'text-red-300'
          }`}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 + 0.5 }}
        >
          <motion.span
            animate={{
              y: stat.change >= 0 ? [-2, 0, -2] : [2, 0, 2],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            {stat.change >= 0 ? '↑' : '↓'}
          </motion.span>
          <span>{Math.abs(stat.change)}%</span>
          <span className="text-white/60">vs last week</span>
        </motion.div>
      </div>

      {/* Shimmer effect on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        initial={{ x: '-100%' }}
        animate={{ x: '200%' }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 3,
          ease: 'easeInOut',
        }}
      />

      {/* Glow effect on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          boxShadow: '0 0 30px rgba(255, 255, 255, 0.3)',
        }}
      />
    </motion.div>
  );
}
