"use client";

import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { getWorkoutById } from "@/lib/supabase/queries";

export function useWorkout(id: string) {
  return useQuery({
    queryKey: ["workout", id],
    queryFn: async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        throw new Error("Not authenticated");
      }

      return getWorkoutById(id, user.id);
    },
    staleTime: 30000, // 30 seconds
  });
}
