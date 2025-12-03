import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { GoalsClient } from "@/components/goals/GoalsClient";
import { BottomNav } from "@/components/common/BottomNav";

export const metadata = {
  title: "Goals - FitTrack",
};

export default async function GoalsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <>
      <GoalsClient />
      <BottomNav activeTab="goals" />
    </>
  );
}
