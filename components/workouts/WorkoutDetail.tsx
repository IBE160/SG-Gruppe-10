"use client";

import { format } from "date-fns";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    <div className="container max-w-2xl py-8">
      <Link href="/workouts">
        <Button variant="ghost" className="mb-6">
          ← Back to History
        </Button>
      </Link>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl">{workout.workout_type}</CardTitle>
            <div className="flex gap-2">
              {onEdit && (
                <Button onClick={onEdit} variant="outline" size="sm">
                  Edit
                </Button>
              )}
              {onDelete && (
                <Button onClick={onDelete} variant="destructive" size="sm">
                  Delete
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm font-medium text-gray-500">Date</p>
            <p className="text-lg">{formattedDate}</p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500">Duration</p>
            <p className="text-lg">{formatDuration(workout.duration_minutes)}</p>
          </div>

          {workout.notes && (
            <div>
              <p className="text-sm font-medium text-gray-500">Notes</p>
              <p className="text-base whitespace-pre-wrap">{workout.notes}</p>
            </div>
          )}

          {!workout.notes && (
            <div>
              <p className="text-sm font-medium text-gray-500">Notes</p>
              <p className="text-base text-gray-400 italic">No notes added</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
