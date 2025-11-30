import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect("/signup");
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Welcome to FitTrack</h1>
      <p className="mt-4 text-gray-600">Email: {user.email}</p>
      <p className="text-sm text-gray-500 mt-2">
        This is a placeholder dashboard. Workout features coming in next stories!
      </p>
    </div>
  );
}
