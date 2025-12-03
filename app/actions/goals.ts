"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import type { ActionResult, CreateGoalInput, Goal } from "@/lib/types/goal";

const createGoalSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title cannot exceed 200 characters"),
  target: z.string().min(1, "Target is required").max(500, "Target cannot exceed 500 characters"),
});

export async function createGoal(
  input: CreateGoalInput
): Promise<ActionResult<Goal>> {
  try {
    // Validate input
    const validatedInput = createGoalSchema.parse(input);

    // Get authenticated user
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return { success: false, error: "Unauthorized" };
    }

    // Insert goal
    const { data, error } = await supabase
      .from("goals")
      .insert({
        user_id: user.id,
        title: validatedInput.title,
        target: validatedInput.target,
      })
      .select()
      .single();

    if (error) {
      console.error("Database error:", error);
      return { success: false, error: "Failed to create goal" };
    }

    // Revalidate the goals page
    revalidatePath("/goals");

    return { success: true, data };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0].message };
    }
    console.error("Unexpected error:", error);
    return { success: false, error: "An unexpected error occurred" };
  }
}
