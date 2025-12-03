export interface Goal {
  id: string;
  user_id: string;
  title: string;
  target: string;
  created_at: string;
  updated_at: string;
}

export interface CreateGoalInput {
  title: string;
  target: string;
}

export interface UpdateGoalInput extends Partial<CreateGoalInput> {
  id: string;
}

export type GoalFormData = CreateGoalInput;

export type ActionResult<T> = 
  | { success: true; data: T }
  | { success: false; error: string };
