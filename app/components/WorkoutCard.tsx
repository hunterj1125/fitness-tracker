'use client';

import { motion } from 'framer-motion';
import { Workout } from '../types/fitness';

interface WorkoutCardProps {
  workout: Workout;
  index: number;
}

function getDifficultyColor(difficulty: string): string {
  switch (difficulty) {
    case 'Easy':
      return 'from-green-500 to-emerald-500';
    case 'Medium':
      return 'from-yellow-500 to-orange-500';
    case 'Hard':
      return 'from-red-500 to-rose-500';
    default:
      return 'from-gray-500 to-gray-600';
  }
}

function getWorkoutIcon(type: string): string {
  const lower = type.toLowerCase();
  if (lower.includes('strength') || lower.includes('weight')) return '💪';
  if (lower.includes('cardio') || lower.includes('run')) return '🏃';
  if (lower.includes('yoga')) return '🧘';
  if (lower.includes('swim')) return '🏊';
  if (lower.includes('cycle') || lower.includes('bike')) return '🚴';
  return '🏋️';
}

export default function WorkoutCard({ workout, index }: WorkoutCardProps) {
  const completedExercises = workout.exercises.filter(e => e.completed).length;
  const totalExercises = workout.exercises.length;
  const completionRate = (completedExercises / totalExercises) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, x: -30, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{
        duration: 0.4,
        delay: index * 0.1,
        type: 'spring',
        stiffness: 120,
      }}
      whileHover={{
        scale: 1.02,
        y: -3,
        transition: { duration: 0.2 },
      }}
      className="relative overflow-hidden bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 group cursor-pointer"
    >
      {/* Background gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${getDifficultyColor(workout.difficulty)} opacity-5 group-hover:opacity-10 transition-opacity duration-300`} />

      {/* Header */}
      <div className="relative z-10 flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <motion.div
            className="text-4xl"
            animate={{
              rotate: [0, -10, 10, -10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3,
              ease: 'easeInOut',
            }}
          >
            {getWorkoutIcon(workout.type)}
          </motion.div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {workout.type}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {new Date(workout.date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </p>
          </div>
        </div>

        {/* Difficulty badge */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: index * 0.1 + 0.2, type: 'spring' }}
          className={`px-3 py-1 bg-gradient-to-r ${getDifficultyColor(workout.difficulty)} text-white text-xs font-bold rounded-full shadow-lg`}
        >
          {workout.difficulty}
        </motion.div>
      </div>

      {/* Stats */}
      <div className="relative z-10 grid grid-cols-3 gap-4 mb-4">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 + 0.3 }}
        >
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {workout.duration}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
            Minutes
          </p>
        </motion.div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 + 0.4 }}
        >
          <p className="text-2xl font-bold text-orange-500">
            {workout.caloriesBurned}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
            Calories
          </p>
        </motion.div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 + 0.5 }}
        >
          <p className="text-2xl font-bold text-green-500">
            {completedExercises}/{totalExercises}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
            Exercises
          </p>
        </motion.div>
      </div>

      {/* Progress bar */}
      <div className="relative z-10 mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
            Completion
          </span>
          <span className="text-xs font-bold text-gray-900 dark:text-white">
            {Math.round(completionRate)}%
          </span>
        </div>
        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            className={`h-full bg-gradient-to-r ${getDifficultyColor(workout.difficulty)}`}
            initial={{ width: 0 }}
            animate={{ width: `${completionRate}%` }}
            transition={{
              duration: 1,
              delay: index * 0.1 + 0.6,
              ease: 'easeOut',
            }}
          />
        </div>
      </div>

      {/* Exercise list */}
      <motion.div
        className="relative z-10 space-y-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: index * 0.1 + 0.7 }}
      >
        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
          Exercises
        </p>
        <div className="space-y-1.5 max-h-32 overflow-y-auto pr-2 custom-scrollbar">
          {workout.exercises.map((exercise, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + 0.8 + idx * 0.05 }}
              className={`flex items-center gap-2 text-sm p-2 rounded-lg ${
                exercise.completed
                  ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300'
                  : 'bg-gray-50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-400'
              }`}
            >
              <span className="text-lg">
                {exercise.completed ? '✓' : '○'}
              </span>
              <span className="flex-1 font-medium">
                {exercise.name}
              </span>
              <span className="text-xs font-semibold">
                {exercise.sets}×{exercise.reps}
                {exercise.weight && ` @ ${exercise.weight}kg`}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Hover glow effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          boxShadow: 'inset 0 0 30px rgba(59, 130, 246, 0.1)',
        }}
      />

      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
        initial={{ x: '-100%' }}
        animate={{ x: '200%' }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 4,
          ease: 'easeInOut',
        }}
      />
    </motion.div>
  );
}
