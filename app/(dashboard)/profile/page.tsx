import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { AppHeader } from "@/components/common/AppHeader";
import { ProfileClient } from "@/components/profile/ProfileClient";

export const metadata = {
  title: "Profile - FitTrack",
};

export default async function ProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <>
      <AppHeader title="Profile" />
      <ProfileClient user={user} />
    </>
  );
}
