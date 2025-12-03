import { redirect, notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getWorkoutById } from "@/lib/supabase/queries";
import { WorkoutDetailClient } from "@/components/workouts/WorkoutDetailClient";
import { AppHeader } from "@/components/common/AppHeader";
import { BottomNav } from "@/components/common/BottomNav";

export default async function WorkoutDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Await params in Next.js 15+
  const { id } = await params;

  // Check authentication
  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/login");
  }

  // Fetch workout data
  const workout = await getWorkoutById(id, user.id);

  // Handle not found
  if (!workout) {
    notFound();
  }

  return (
    <>
      <AppHeader title="Workout Details" showBackButton={true} />
      <WorkoutDetailClient workout={workout} />
      <BottomNav activeTab="workouts" />
    </>
  );
}
