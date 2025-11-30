import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import LogoutButton from "@/components/auth/logout-button";

export default async function DashboardPage() {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect("/signup");
  }

  return (
    <div className="min-h-screen">
      <header className="border-b">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-2xl font-bold">FitTrack</h1>
          <LogoutButton />
        </div>
      </header>
      <main className="p-8">
        <h2 className="text-3xl font-bold">Welcome back!</h2>
        <p className="mt-4 text-gray-600">Email: {user.email}</p>
        <p className="text-sm text-gray-500 mt-2">
          This is a placeholder dashboard. Workout features coming in next stories!
        </p>
      </main>
    </div>
  );
}
