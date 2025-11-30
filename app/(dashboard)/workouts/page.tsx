import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { WorkoutHistoryClient } from "@/components/workouts/WorkoutHistoryClient";

export default async function WorkoutsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="p-8">
      <WorkoutHistoryClient />
    </div>
  );
}
