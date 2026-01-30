import { redirect } from "next/navigation";
import { auth } from "@finance/auth";
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
    <div className="bg-muted/30 min-h-screen">
      <DashboardSidebar />
      <div className="lg:pl-72">
        <DashboardHeader />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
