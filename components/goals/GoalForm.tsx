"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import { createGoal } from "@/app/actions/goals";
import type { CreateGoalInput } from "@/lib/types/goal";

const goalFormSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title cannot exceed 200 characters"),
  target: z.string().min(1, "Target is required").max(500, "Target cannot exceed 500 characters"),
});

type GoalFormValues = z.infer<typeof goalFormSchema>;

interface GoalFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function GoalForm({ onSuccess, onCancel }: GoalFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<GoalFormValues>({
    resolver: zodResolver(goalFormSchema),
    defaultValues: {
      title: "",
      target: "",
    },
  });

  async function onSubmit(values: GoalFormValues) {
    setIsSubmitting(true);
    try {
      const input: CreateGoalInput = {
        title: values.title,
        target: values.target,
      };

      const result = await createGoal(input);

      if (result.success) {
        toast.success("Goal created successfully!");
        form.reset();
        if (onSuccess) {
          onSuccess();
        }
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      console.error("Error creating goal:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Run 10k" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="target"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Target</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Complete by end of year" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-2">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Goal"}
          </Button>
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
