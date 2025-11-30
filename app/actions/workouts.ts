"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import type { ActionResult, CreateWorkoutInput, Workout } from "@/lib/types/workout";

const createWorkoutSchema = z.object({
  workout_date: z.string().min(1, "Workout date is required"),
  workout_type: z.string().min(1, "Workout type is required"),
  duration_minutes: z
    .number()
    .positive("Duration must be greater than 0")
    .max(1440, "Duration cannot exceed 1440 minutes (24 hours)"),
  notes: z.string().optional(),
});

export async function createWorkout(
  input: CreateWorkoutInput
): Promise<ActionResult<Workout>> {
  try {
    // Validate input
    const validatedInput = createWorkoutSchema.parse(input);

    // Get authenticated user
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return { success: false, error: "Unauthorized" };
    }

    // Insert workout
    const { data, error } = await supabase
      .from("workouts")
      .insert({
        user_id: user.id,
        workout_date: validatedInput.workout_date,
        workout_type: validatedInput.workout_type,
        duration_minutes: validatedInput.duration_minutes,
        notes: validatedInput.notes || null,
      })
      .select()
      .single();

    if (error) {
      console.error("Database error:", error);
      return { success: false, error: "Failed to create workout" };
    }

    // Revalidate the workouts page
    revalidatePath("/workouts");

    return { success: true, data };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0].message };
    }
    console.error("Unexpected error:", error);
    return { success: false, error: "An unexpected error occurred" };
  }
}
