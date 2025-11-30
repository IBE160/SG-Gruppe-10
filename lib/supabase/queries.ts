import { createClient } from "./server";
import type { Workout } from "@/lib/types/workout";

export async function getWorkouts(userId: string): Promise<Workout[]> {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from("workouts")
    .select("*")
    .eq("user_id", userId)
    .order("workout_date", { ascending: false });

  if (error) {
    console.error("Error fetching workouts:", error);
    throw new Error("Failed to fetch workouts");
  }

  return data || [];
}

export async function getWorkoutById(
  id: string,
  userId: string
): Promise<Workout | null> {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from("workouts")
    .select("*")
    .eq("id", id)
    .eq("user_id", userId)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return null; // Not found
    }
    console.error("Error fetching workout:", error);
    throw new Error("Failed to fetch workout");
  }

  return data;
}
