"use client";

import { Badge, cn } from "@finance/ui";
import { Sparkles } from "lucide-react";

interface CategoryBadgeProps {
  category?: string | null;
  necessityType?: "need" | "want" | "savings" | null;
  isAiSuggested?: boolean;
  className?: string;
}

const CATEGORY_COLORS: Record<string, string> = {
  Housing: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  Transportation:
    "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  "Food & Groceries":
    "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  "Dining & Restaurants":
    "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  Healthcare: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  Entertainment:
    "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
  Shopping:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  "Personal Care":
    "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200",
  Education:
    "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200",
  "Bills & Subscriptions":
    "bg-slate-100 text-slate-800 dark:bg-slate-900 dark:text-slate-200",
  Income:
    "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200",
  "Savings & Investments":
    "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200",
  "Fees & Interest":
    "bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200",
  Travel: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
  "Gifts & Donations":
    "bg-fuchsia-100 text-fuchsia-800 dark:bg-fuchsia-900 dark:text-fuchsia-200",
};

export function CategoryBadge({
  category,
  necessityType,
  isAiSuggested,
  className,
}: CategoryBadgeProps) {
  if (!category) {
    return (
      <Badge
        variant="outline"
        className={cn("text-muted-foreground", className)}
      >
        Uncategorized
      </Badge>
    );
  }

  const colorClass =
    // eslint-disable-next-line security/detect-object-injection -- Safe lookup in predefined color map with fallback
    CATEGORY_COLORS[category] ||
    "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";

  return (
    <div className="flex items-center gap-1.5">
      <Badge
        className={cn(
          "border-0 font-medium",
          colorClass,
          isAiSuggested && "pr-1.5",
          className
        )}
      >
        {category}
        {isAiSuggested && (
          <Sparkles className="ml-1 h-3 w-3 text-current opacity-60" />
        )}
      </Badge>
      {necessityType && (
        <Badge
          variant={
            necessityType === "need"
              ? "need"
              : necessityType === "savings"
                ? "savings"
                : "want"
          }
          className="px-1.5 py-0 text-[10px]"
        >
          {necessityType}
        </Badge>
      )}
    </div>
  );
}
