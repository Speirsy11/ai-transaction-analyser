"use client";

import { usePathname } from "next/navigation";
import { UserButton } from "@finance/auth";
import { Button, Separator } from "@finance/ui";
import { Bell, Menu, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const pageTitles: Record<string, string> = {
  "/dashboard": "Overview",
  "/dashboard/transactions": "Transactions",
  "/dashboard/budget": "Budget",
  "/dashboard/analytics": "Analytics",
  "/dashboard/import": "Import",
  "/dashboard/settings": "Settings",
};

export function DashboardHeader() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  const title = pageTitles[pathname] || "Dashboard";

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-6">
      {/* Mobile menu button */}
      <Button variant="ghost" size="icon" className="lg:hidden">
        <Menu className="h-5 w-5" />
      </Button>

      {/* Page title */}
      <div className="flex-1">
        <h1 className="text-lg font-semibold">{title}</h1>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>

        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </Button>

        <Separator orientation="vertical" className="h-6" />

        <UserButton />
      </div>
    </header>
  );
}
