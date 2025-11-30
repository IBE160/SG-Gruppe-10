import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function HomePage() {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect("/signup");
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Welcome to FitTrack</h1>
      <p className="mt-4 text-gray-600">Email: {user.email}</p>
      
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="flex gap-4">
          <Link href="/workouts/new">
            <Button>Log Workout</Button>
          </Link>
          <Link href="/workouts">
            <Button variant="outline">View History</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
