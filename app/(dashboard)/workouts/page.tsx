import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

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
      <h1 className="mb-6 text-3xl font-bold">Workout History</h1>
      <p className="text-gray-600">
        Workout created successfully! Full workout history will be implemented in Story 2.2.
      </p>
    </div>
  );
}
