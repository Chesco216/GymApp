export interface RoutineExercise {
  set: string;
  description: string;
  series: string;
  reps: string;
}

export interface RoutineWorkoutDay {
  day: string;
  group: string;
  exercises: RoutineExercise[];
  cals: string;
  duration: string;
}

export type TrainingRoutine = RoutineWorkoutDay[];

/** Shape actually stored in Firestore (createRoutine remaps exercise fields). */
export interface StoredExercise {
  description: string;
  reps: string;
  series: string;
  set?: string;
}

export interface StoredWorkoutDay {
  day: string;
  group: string;
  exercises: StoredExercise[];
  cals: string;
  duration: string;
}
