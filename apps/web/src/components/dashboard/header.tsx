"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { UserButton } from "@finance/auth";
import { Button } from "@finance/ui";
import { Bell, Menu, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { MobileSidebar } from "./sidebar";

const pageTitles: Record<string, { title: string; description: string }> = {
  "/dashboard": {
    title: "Overview",
    description: "Your financial snapshot at a glance",
  },
  "/dashboard/transactions": {
    title: "Transactions",
    description: "View and manage all your transactions",
  },
  "/dashboard/budget": {
    title: "Budget",
    description: "Track your 50/30/20 budget goals",
  },
  "/dashboard/analytics": {
    title: "Analytics",
    description: "Understand your spending patterns",
  },
  "/dashboard/import": {
    title: "Import",
    description: "Upload bank statements to get started",
  },
  "/dashboard/settings": {
    title: "Settings",
    description: "Manage your account and preferences",
  },
};

export function DashboardHeader() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // eslint-disable-next-line security/detect-object-injection -- Safe: pathname is from Next.js router, used as key in hardcoded Record
  const page = pageTitles[pathname] || {
    title: "Dashboard",
    description: "",
  };

  return (
    <>
      <header className="sticky top-0 z-30 border-b bg-background/95 backdrop-blur-sm">
        <div className="flex h-16 items-center gap-4 px-4 sm:px-6">
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0 lg:hidden"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>

          {/* Page title */}
          <div className="min-w-0 flex-1">
            <h1 className="truncate text-lg font-semibold tracking-tight">
              {page.title}
            </h1>
            <p className="hidden truncate text-xs text-muted-foreground sm:block">
              {page.description}
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1.5">
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 text-muted-foreground hover:text-foreground"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <Sun className="h-[1.15rem] w-[1.15rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.15rem] w-[1.15rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="relative h-9 w-9 text-muted-foreground hover:text-foreground"
            >
              <Bell className="h-[1.15rem] w-[1.15rem]" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-blue-500" />
              <span className="sr-only">Notifications</span>
            </Button>

            <div className="mx-1.5 h-6 w-px bg-border" />

            <UserButton />
          </div>
        </div>
      </header>

      <MobileSidebar
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
}
