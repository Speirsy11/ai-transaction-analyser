import { redirect } from "next/navigation";
import { auth } from "@finance/auth/server";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { DashboardHeader } from "@/components/dashboard/header";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.userId) {
    redirect("/sign-in");
  }

  return (
    <div className="min-h-screen bg-muted/40">
      <DashboardSidebar />
      <div className="lg:pl-64">
        <DashboardHeader />
        <main className="p-4 pb-20 sm:p-6 lg:pb-6">{children}</main>
      </div>
    </div>
  );
}
