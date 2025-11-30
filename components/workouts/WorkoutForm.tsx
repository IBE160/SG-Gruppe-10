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
import { createWorkout } from "@/app/actions/workouts";
import type { CreateWorkoutInput } from "@/lib/types/workout";

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
  defaultValues?: Partial<WorkoutFormValues>;
}

export function WorkoutForm({ defaultValues }: WorkoutFormProps) {
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

        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? "Saving..." : "Save Workout"}
        </Button>
      </form>
    </Form>
  );
}
