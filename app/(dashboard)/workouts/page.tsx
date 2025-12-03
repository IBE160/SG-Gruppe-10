import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { WorkoutHistoryClient } from "@/components/workouts/WorkoutHistoryClient";
import { BottomNav } from "@/components/common/BottomNav";

export default async function WorkoutsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <>
      <WorkoutHistoryClient />
      <BottomNav activeTab="workouts" />
    </>
  );
}
