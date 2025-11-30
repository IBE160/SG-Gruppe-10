export interface Workout {
  id: string;
  user_id: string;
  workout_date: string; // ISO 8601 date string
  workout_type: string;
  duration_minutes: number;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateWorkoutInput {
  workout_date: string;
  workout_type: string;
  duration_minutes: number;
  notes?: string;
}

export interface UpdateWorkoutInput extends Partial<CreateWorkoutInput> {
  id: string;
}

export type WorkoutFormData = Omit<CreateWorkoutInput, 'notes'> & {
  notes: string;
};

export type ActionResult<T> = 
  | { success: true; data: T }
  | { success: false; error: string };
