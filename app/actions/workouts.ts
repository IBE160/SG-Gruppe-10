"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import type { ActionResult, CreateWorkoutInput, UpdateWorkoutInput, Workout } from "@/lib/types/workout";

const createWorkoutSchema = z.object({
  workout_date: z.string().min(1, "Workout date is required"),
  workout_type: z.string().min(1, "Workout type is required"),
  duration_minutes: z
    .number()
    .positive("Duration must be greater than 0")
    .max(1440, "Duration cannot exceed 1440 minutes (24 hours)"),
  notes: z.string().optional(),
});

const updateWorkoutSchema = z.object({
  id: z.string().uuid("Invalid workout ID"),
  workout_date: z.string().min(1, "Workout date is required").optional(),
  workout_type: z.string().min(1, "Workout type is required").optional(),
  duration_minutes: z
    .number()
    .positive("Duration must be greater than 0")
    .max(1440, "Duration cannot exceed 1440 minutes (24 hours)")
    .optional(),
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

export async function updateWorkout(
  input: UpdateWorkoutInput
): Promise<ActionResult<Workout>> {
  try {
    // Validate input
    const validatedInput = updateWorkoutSchema.parse(input);

    // Get authenticated user
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return { success: false, error: "Unauthorized" };
    }

    // Build update object (only include provided fields)
    const updateData: Record<string, unknown> = {
      updated_at: new Date().toISOString(),
    };

    if (validatedInput.workout_date !== undefined) {
      updateData.workout_date = validatedInput.workout_date;
    }
    if (validatedInput.workout_type !== undefined) {
      updateData.workout_type = validatedInput.workout_type;
    }
    if (validatedInput.duration_minutes !== undefined) {
      updateData.duration_minutes = validatedInput.duration_minutes;
    }
    if (validatedInput.notes !== undefined) {
      updateData.notes = validatedInput.notes || null;
    }

    // Update workout (RLS ensures user owns it)
    const { data, error } = await supabase
      .from("workouts")
      .update(updateData)
      .eq("id", validatedInput.id)
      .eq("user_id", user.id)
      .select()
      .single();

    if (error) {
      console.error("Database error:", error);
      if (error.code === "PGRST116") {
        return { success: false, error: "Workout not found or unauthorized" };
      }
      return { success: false, error: "Failed to update workout" };
    }

    // Revalidate both the workout detail page and list page
    revalidatePath("/workouts");
    revalidatePath(`/workouts/${validatedInput.id}`);

    return { success: true, data };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0].message };
    }
    console.error("Unexpected error:", error);
    return { success: false, error: "An unexpected error occurred" };
  }
}
