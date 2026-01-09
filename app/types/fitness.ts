export interface WorkoutStat {
  label: string;
  value: number;
  unit: string;
  change: number;
  icon: string;
  color: string;
}

export interface Exercise {
  name: string;
  sets: number;
  reps: number;
  weight?: number;
  duration?: number;
  completed: boolean;
}

export interface Workout {
  id: string;
  date: string;
  type: string;
  duration: number;
  caloriesBurned: number;
  exercises: Exercise[];
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface NutritionData {
  date: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

export interface ProgressData {
  date: string;
  weight: number;
  workouts: number;
  calories: number;
}
