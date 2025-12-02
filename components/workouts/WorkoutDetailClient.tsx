"use client";

import { useState } from "react";
import { format } from "date-fns";
import { WorkoutDetail } from "@/components/workouts/WorkoutDetail";
import { WorkoutForm } from "@/components/workouts/WorkoutForm";
import type { Workout } from "@/lib/types/workout";

interface WorkoutDetailClientProps {
  workout: Workout;
}

export function WorkoutDetailClient({ workout }: WorkoutDetailClientProps) {
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return (
      <div className="container max-w-2xl py-8">
        <h1 className="text-2xl font-bold mb-6">Edit Workout</h1>
        <WorkoutForm
          mode="edit"
          workout={workout}
          defaultValues={{
            workout_date: format(new Date(workout.workout_date), "yyyy-MM-dd"),
            workout_type: workout.workout_type,
            duration_minutes: workout.duration_minutes,
            notes: workout.notes || "",
          }}
          onSuccess={() => setIsEditing(false)}
          onCancel={() => setIsEditing(false)}
        />
      </div>
    );
  }

  return <WorkoutDetail workout={workout} onEdit={() => setIsEditing(true)} />;
}
