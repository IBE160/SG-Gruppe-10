"use client";

import { format } from "date-fns";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { WorkoutIcon } from "@/components/dashboard/WorkoutIcon";
import { Button } from "@/components/ui/button";
import type { Workout } from "@/lib/types/workout";

interface WorkoutDetailProps {
  workout: Workout;
  onEdit?: () => void;
  onDelete?: () => void;
}

function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} min`;
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (remainingMinutes === 0) {
    return `${hours} hr`;
  }

  return `${hours} hr ${remainingMinutes} min`;
}

export function WorkoutDetail({ workout, onEdit, onDelete }: WorkoutDetailProps) {
  const formattedDate = format(new Date(workout.workout_date), "MMMM d, yyyy");

  return (
    <div className="min-h-screen bg-graphite-50 pb-20">
      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-primary-green text-white rounded-xl p-8 shadow-lg mb-6">
          <div className="flex flex-col items-center mb-6">
            <WorkoutIcon workoutType={workout.workout_type} size="lg" variant="default" />
            <h1 className="text-3xl font-bold mt-4">{workout.workout_type}</h1>
            <p className="text-white/80 text-sm mt-1">{formattedDate}</p>
          </div>
          
          <div className="grid grid-cols-1 gap-4 mb-6">
            <div className="bg-white/10 rounded-lg p-4">
              <p className="text-sm opacity-80 mb-1">Duration</p>
              <p className="text-2xl font-semibold">{formatDuration(workout.duration_minutes)}</p>
            </div>
          </div>
          
          {workout.notes && (
            <div className="bg-white/10 rounded-lg p-4">
              <p className="text-sm opacity-80 mb-2">Notes</p>
              <p className="text-base whitespace-pre-wrap">{workout.notes}</p>
            </div>
          )}

          {!workout.notes && (
            <div className="bg-white/10 rounded-lg p-4">
              <p className="text-sm opacity-80 mb-2">Notes</p>
              <p className="text-base opacity-60 italic">No notes added</p>
            </div>
          )}
        </div>
        
        <div className="flex gap-4">
          {onEdit && (
            <Button 
              onClick={onEdit} 
              variant="outline" 
              className="flex-1 h-12 border-primary-green text-primary-green hover:bg-primary-green/10"
            >
              <MaterialIcon icon="edit" className="mr-2" />
              Edit
            </Button>
          )}
          {onDelete && (
            <Button 
              onClick={onDelete} 
              variant="destructive" 
              className="flex-1 h-12"
            >
              <MaterialIcon icon="delete" className="mr-2" />
              Delete
            </Button>
          )}
        </div>
      </main>
    </div>
  );
}
