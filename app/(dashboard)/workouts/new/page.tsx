import { WorkoutForm } from "@/components/workouts/WorkoutForm";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { AppHeader } from "@/components/common/AppHeader";
import { BottomNav } from "@/components/common/BottomNav";

export default async function NewWorkoutPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <>
      <AppHeader title="Log Workout" showBackButton={true} />
      <div className="min-h-screen bg-graphite-50 pb-20">
        <main className="max-w-4xl mx-auto px-4 py-6">
          <div className="bg-primary-green text-white rounded-xl p-8 shadow-lg">
            <h1 className="mb-6 text-2xl font-bold">Log Workout</h1>
            <WorkoutForm />
          </div>
        </main>
      </div>
      <BottomNav activeTab="workouts" />
    </>
  );
}
