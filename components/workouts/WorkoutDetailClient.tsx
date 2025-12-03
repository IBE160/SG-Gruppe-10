"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { WorkoutDetail } from "@/components/workouts/WorkoutDetail";
import { WorkoutForm } from "@/components/workouts/WorkoutForm";
import { deleteWorkout } from "@/app/actions/workouts";
import type { Workout } from "@/lib/types/workout";

interface WorkoutDetailClientProps {
  workout: Workout;
}

export function WorkoutDetailClient({ workout }: WorkoutDetailClientProps) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    const result = await deleteWorkout({ id: workout.id });

    if (result.success) {
      toast.success("Workout deleted successfully");
      router.push("/workouts");
    } else {
      toast.error(result.error || "Failed to delete workout");
      setIsDeleting(false);
      setShowDeleteDialog(false);
    }
  };

  if (isEditing) {
    return (
      <div className="min-h-screen bg-graphite-50 pb-20">
        <main className="max-w-4xl mx-auto px-4 py-6">
          <div className="bg-primary-green text-white rounded-xl p-8 shadow-lg">
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
        </main>
      </div>
    );
  }

  return (
    <>
      <WorkoutDetail
        workout={workout}
        onEdit={() => setIsEditing(true)}
        onDelete={() => setShowDeleteDialog(true)}
      />

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              workout.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
