"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn, Separator } from "@finance/ui";
import {
  LayoutDashboard,
  Receipt,
  PieChart,
  Settings,
  Upload,
  Sparkles,
  TrendingUp,
} from "lucide-react";

const navigation = [
  {
    name: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Transactions",
    href: "/dashboard/transactions",
    icon: Receipt,
  },
  {
    name: "Budget",
    href: "/dashboard/budget",
    icon: PieChart,
  },
  {
    name: "Analytics",
    href: "/dashboard/analytics",
    icon: TrendingUp,
  },
  {
    name: "Import",
    href: "/dashboard/import",
    icon: Upload,
  },
];

const secondaryNavigation = [
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:z-40 lg:flex lg:w-72 lg:flex-col">
        <div className="bg-card flex grow flex-col gap-y-5 overflow-y-auto border-r px-6 pb-4">
          {/* Logo */}
          <div className="flex h-16 shrink-0 items-center">
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-lg">
                <Sparkles className="text-primary-foreground h-5 w-5" />
              </div>
              <span className="text-xl font-bold">FinanceAI</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className={cn(
                            "group flex gap-x-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                            isActive
                              ? "bg-primary text-primary-foreground"
                              : "text-muted-foreground hover:bg-muted hover:text-foreground"
                          )}
                        >
                          <item.icon
                            className={cn(
                              "h-5 w-5 shrink-0",
                              isActive
                                ? "text-primary-foreground"
                                : "text-muted-foreground group-hover:text-foreground"
                            )}
                          />
                          {item.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>

              <li className="mt-auto">
                <Separator className="mb-4" />
                <ul role="list" className="-mx-2 space-y-1">
                  {secondaryNavigation.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className={cn(
                            "group flex gap-x-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                            isActive
                              ? "bg-primary text-primary-foreground"
                              : "text-muted-foreground hover:bg-muted hover:text-foreground"
                          )}
                        >
                          <item.icon
                            className={cn(
                              "h-5 w-5 shrink-0",
                              isActive
                                ? "text-primary-foreground"
                                : "text-muted-foreground group-hover:text-foreground"
                            )}
                          />
                          {item.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </aside>

      {/* Mobile navigation would go here */}
    </>
  );
}
