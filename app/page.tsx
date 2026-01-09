'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import StatCard from './components/StatCard';
import WorkoutCard from './components/WorkoutCard';
import dynamic from 'next/dynamic';

const ProgressChart = dynamic(() => import('./components/ProgressChart'), {
  ssr: false,
  loading: () => <div className="h-64 bg-white/5 rounded-2xl animate-pulse" />
});
import MotivationalMessage from './components/MotivationalMessage';
import CelebrationEffect from './components/CelebrationEffect';
import { WorkoutStat, Workout, ProgressData } from './types/fitness';

export default function FitnessTracker() {
  const [activeTab, setActiveTab] = useState<'overview' | 'workouts' | 'progress'>('overview');
  const [showMotivation, setShowMotivation] = useState(true);

  // Sample stats data
  const stats: WorkoutStat[] = [
    { label: 'Calories Burned', value: 2847, unit: 'kcal', change: 12.5, icon: '', color: 'from-orange-500 to-red-500' },
    { label: 'Active Minutes', value: 187, unit: 'min', change: 8.3, icon: '', color: 'from-blue-500 to-cyan-500' },
    { label: 'Workouts', value: 24, unit: 'total', change: 15.7, icon: '', color: 'from-purple-500 to-pink-500' },
    { label: 'Current Streak', value: 12, unit: 'days', change: 200, icon: '', color: 'from-yellow-500 to-orange-500' },
  ];

  // Sample workout data
  const workouts: Workout[] = [
    {
      id: '1',
      date: '2026-01-08',
      type: 'Strength',
      duration: 45,
      caloriesBurned: 320,
      difficulty: 'Hard',
      exercises: [
        { name: 'Bench Press', sets: 4, reps: 10, weight: 80, completed: true },
        { name: 'Squats', sets: 4, reps: 12, weight: 100, completed: true },
        { name: 'Deadlifts', sets: 3, reps: 8, weight: 120, completed: true },
        { name: 'Pull-ups', sets: 3, reps: 12, completed: false },
      ],
    },
    {
      id: '2',
      date: '2026-01-07',
      type: 'Cardio',
      duration: 30,
      caloriesBurned: 280,
      difficulty: 'Medium',
      exercises: [
        { name: 'Running', duration: 20, completed: true },
        { name: 'Jump Rope', sets: 3, duration: 3, completed: true },
        { name: 'Burpees', sets: 3, reps: 15, completed: true },
      ],
    },
    {
      id: '3',
      date: '2026-01-06',
      type: 'Yoga',
      duration: 60,
      caloriesBurned: 180,
      difficulty: 'Easy',
      exercises: [
        { name: 'Sun Salutation', sets: 5, completed: true },
        { name: 'Warrior Poses', duration: 15, completed: true },
        { name: 'Tree Pose', duration: 10, completed: true },
        { name: 'Meditation', duration: 10, completed: true },
      ],
    },
  ];

  // Sample progress data
  const weightData: ProgressData[] = [
    { date: 'Jan 1', weight: 82, workouts: 0, calories: 0 },
    { date: 'Jan 2', weight: 81.8, workouts: 1, calories: 250 },
    { date: 'Jan 3', weight: 81.5, workouts: 1, calories: 320 },
    { date: 'Jan 4', weight: 81.3, workouts: 0, calories: 0 },
    { date: 'Jan 5', weight: 81.0, workouts: 2, calories: 480 },
    { date: 'Jan 6', weight: 80.8, workouts: 1, calories: 180 },
    { date: 'Jan 7', weight: 80.5, workouts: 1, calories: 280 },
    { date: 'Jan 8', weight: 80.2, workouts: 1, calories: 320 },
  ];

  const workoutData: ProgressData[] = weightData;
  const calorieData: ProgressData[] = weightData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Large floating orbs */}
        <motion.div
          className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute top-1/3 -right-40 w-96 h-96 bg-gradient-to-br from-blue-500/30 to-cyan-500/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -30, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute -bottom-40 left-1/3 w-96 h-96 bg-gradient-to-br from-orange-500/30 to-red-500/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.4, 1],
            x: [0, 40, 0],
            y: [0, -40, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Floating particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            style={{
              left: `${(i * 7) % 100}%`,
              top: `${(i * 13) % 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 5 + (i % 5),
              repeat: Infinity,
              delay: i * 0.3,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-7xl">
        {/* Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            {/* Title section with creative layout */}
            <div className="relative">
              <motion.div
                className="absolute -top-8 -left-8 text-8xl opacity-10"
                animate={{
                  rotate: [0, 10, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                
              </motion.div>
              <h1 className="text-6xl md:text-7xl font-black mb-4">
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500">
                  Fitness
                </span>
                <span className="block text-white">Tracker</span>
              </h1>
              <div className="flex items-center gap-3 mb-4">
                <motion.div
                  className="h-1 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: 120 }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
                <p className="text-gray-400 text-lg font-medium">Your Journey, Your Rules</p>
              </div>
              <p className="text-gray-300 text-sm max-w-md">
                Track your progress, crush your goals, and become the strongest version of yourself 
              </p>
            </div>

            {/* Achievement badges */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
              className="flex flex-wrap gap-3"
            >
              {[
                { icon: '', label: 'Goal Crusher', color: 'from-yellow-400 to-orange-500' },
                { icon: '', label: 'Beast Mode', color: 'from-blue-400 to-cyan-500' },
                { icon: '', label: 'On Fire', color: 'from-red-400 to-pink-500' },
              ].map((badge, i) => (
                <motion.div
                  key={i}
                  className={`relative group px-6 py-3 bg-gradient-to-r ${badge.color} rounded-2xl shadow-lg cursor-pointer`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{badge.icon}</span>
                    <span className="text-white font-bold text-sm">{badge.label}</span>
                  </div>
                  <motion.div
                    className="absolute inset-0 bg-white/20 rounded-2xl"
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Creative Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl p-2 border border-white/10 inline-flex gap-2">
            {(['overview', 'workouts', 'progress'] as const).map((tab) => (
              <motion.button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-8 py-4 rounded-2xl font-bold text-lg capitalize transition-colors ${
                  activeTab === tab
                    ? 'text-white'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {activeTab === tab && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tab}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Stats Cards - Creative asymmetric layout */}
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-12"
          >
            {/* Stats grid with creative sizes */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  <CelebrationEffect message={`${stat.value} ${stat.unit}! You''re crushing it! `}>
                    <StatCard stat={stat} index={index} />
                  </CelebrationEffect>
                </motion.div>
              ))}
            </div>

            {/* Motivational quote section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 }}
              className="relative bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-orange-500/20 backdrop-blur-xl rounded-3xl p-8 border border-white/10 overflow-hidden"
            >
              <motion.div
                className="absolute -top-20 -right-20 text-9xl opacity-10"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              >
                
              </motion.div>
              <div className="relative z-10">
                <p className="text-3xl md:text-4xl font-bold text-white mb-4">
                  "The only bad workout is the one that didn't happen."
                </p>
                <p className="text-gray-300 text-lg"> Keep pushing, champion! </p>
              </div>
            </motion.div>

            {/* Charts section - Asymmetric creative layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.1 }}
                className="lg:col-span-2"
              >
                <ProgressChart data={calorieData} type="calories" title="Calorie Burn Trend" icon="" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 }}
              >
                <ProgressChart data={workoutData} type="workouts" title="Weekly Activity" icon="" />
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3 }}
            >
              <ProgressChart data={weightData} type="weight" title="Weight Progress Journey" icon="" />
            </motion.div>
          </motion.div>
        )}

        {/* Workouts section - Creative card layout */}
        {activeTab === 'workouts' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between"
            >
              <h2 className="text-4xl font-bold text-white">Recent Workouts </h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-2xl shadow-lg"
              >
                + Add Workout
              </motion.button>
            </motion.div>

            {workouts.map((workout, index) => {
              const completionRate = (workout.exercises.filter(e => e.completed).length / workout.exercises.length * 100).toFixed(0);
              const encouragement = completionRate === '100' ? 'Perfect workout! ' : `${completionRate}% complete! Keep going! `;
              
              return (
                <motion.div
                  key={workout.id}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <CelebrationEffect message={encouragement}>
                    <WorkoutCard workout={workout} index={index} />
                  </CelebrationEffect>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* Progress section - Full analytics */}
        {activeTab === 'progress' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold text-white mb-8"
            >
              Your Progress 
            </motion.h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <ProgressChart data={weightData} type="weight" title="Weight Progress" icon="" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <ProgressChart data={workoutData} type="workouts" title="Workout Frequency" icon="" />
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <ProgressChart data={calorieData} type="calories" title="Calories Burned" icon="" />
            </motion.div>

            {/* Stats summary */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              {[
                { label: 'Total Workouts', value: '24', icon: '' },
                { label: 'Avg Duration', value: '45 min', icon: '' },
                { label: 'Total Calories', value: '6,840', icon: '' },
                { label: 'Best Streak', value: '12 days', icon: '' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
                >
                  <div className="text-4xl mb-3">{item.icon}</div>
                  <div className="text-3xl font-bold text-white mb-1">{item.value}</div>
                  <div className="text-gray-400 text-sm">{item.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}

        {/* Footer with personality */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-500 text-sm mb-2" suppressHydrationWarning>
            Last updated: {new Date().toLocaleString('en-US', { 
              month: 'short', 
              day: 'numeric', 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </p>
          <p className="text-gray-600 text-xs">
            Built with  and lots of  | Keep crushing it! 
          </p>
        </motion.div>
      </div>

      {/* Motivational Messages */}
      {showMotivation && (
        <MotivationalMessage
          streak={stats[3].value}
          caloriesBurned={stats[0].value}
          workoutCount={stats[2].value}
          onClose={() => setShowMotivation(false)}
        />
      )}

      {/* Floating Action Button for Quick Motivation */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, type: 'spring', stiffness: 200 }}
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowMotivation(true)}
        className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-2xl flex items-center justify-center text-3xl z-40 cursor-pointer"
        title="Get motivated!"
      >
        <motion.span
          animate={{
            rotate: [0, -10, 10, -10, 0],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            repeatDelay: 2,
          }}
        >
          
        </motion.span>
      </motion.button>

      {/* Celebration Confetti Effect (on hover over stats) */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        .celebrate {
          animation: float 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
















