"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createWorkout, updateWorkout } from "@/app/actions/workouts";
import type { CreateWorkoutInput, Workout } from "@/lib/types/workout";

const workoutFormSchema = z.object({
  workout_date: z.string().min(1, "Workout date is required"),
  workout_type: z.string().min(1, "Workout type is required"),
  duration_minutes: z
    .number({
      message: "Duration must be a number",
    })
    .positive("Duration must be greater than 0")
    .max(1440, "Duration cannot exceed 1440 minutes (24 hours)"),
  notes: z.string().optional(),
});

type WorkoutFormValues = z.infer<typeof workoutFormSchema>;

interface WorkoutFormProps {
  mode?: "create" | "edit";
  workout?: Workout;
  defaultValues?: Partial<WorkoutFormValues>;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function WorkoutForm({ 
  mode = "create", 
  workout,
  defaultValues,
  onSuccess,
  onCancel 
}: WorkoutFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [todayDate] = useState(() => format(new Date(), "yyyy-MM-dd"));

  const form = useForm<WorkoutFormValues>({
    resolver: zodResolver(workoutFormSchema),
    defaultValues: {
      workout_date: defaultValues?.workout_date || todayDate,
      workout_type: defaultValues?.workout_type || "",
      duration_minutes: defaultValues?.duration_minutes || 0,
      notes: defaultValues?.notes || "",
    },
  });

  async function onSubmit(values: WorkoutFormValues) {
    setIsSubmitting(true);
    try {
      if (mode === "edit" && workout) {
        // Update existing workout
        const result = await updateWorkout({
          id: workout.id,
          workout_date: values.workout_date,
          workout_type: values.workout_type,
          duration_minutes: values.duration_minutes,
          notes: values.notes || undefined,
        });

        if (result.success) {
          toast.success("Workout updated successfully!");
          if (onSuccess) {
            onSuccess();
          } else {
            router.push(`/workouts/${workout.id}`);
            router.refresh();
          }
        } else {
          toast.error(result.error);
        }
      } else {
        // Create new workout
        const input: CreateWorkoutInput = {
          workout_date: values.workout_date,
          workout_type: values.workout_type,
          duration_minutes: values.duration_minutes,
          notes: values.notes || undefined,
        };

        const result = await createWorkout(input);

        if (result.success) {
          toast.success("Workout created successfully!");
          router.push("/workouts");
          router.refresh();
        } else {
          toast.error(result.error);
        }
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="workout_date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Workout Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="workout_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Workout Type</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Running, Cycling, Gym" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="duration_minutes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Duration (minutes)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="60"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes (optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Add any notes about your workout..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-2">
          <Button type="submit" disabled={isSubmitting} className="flex-1">
            {isSubmitting 
              ? "Saving..." 
              : mode === "edit" 
              ? "Update Workout" 
              : "Save Workout"}
          </Button>
          {mode === "edit" && onCancel && (
            <Button 
              type="button" 
              variant="outline" 
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
