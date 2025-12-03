import { BottomNav } from "@/components/common/BottomNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[640px] mx-auto pb-20">
        {children}
      </div>
      <BottomNav />
    </div>
  );
}
