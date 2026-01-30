"use client";

import { Card, CardContent, cn } from "@finance/ui";
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  Lightbulb,
  type LucideIcon,
} from "lucide-react";

type InsightType = "positive" | "negative" | "warning" | "neutral" | "tip";

interface InsightCardProps {
  type: InsightType;
  title: string;
  description: string;
  value?: string;
  className?: string;
}

const typeConfig: Record<
  InsightType,
  { icon: LucideIcon; bgColor: string; textColor: string; iconColor: string }
> = {
  positive: {
    icon: TrendingUp,
    bgColor: "bg-green-50 dark:bg-green-900/20",
    textColor: "text-green-800 dark:text-green-200",
    iconColor: "text-green-500",
  },
  negative: {
    icon: TrendingDown,
    bgColor: "bg-red-50 dark:bg-red-900/20",
    textColor: "text-red-800 dark:text-red-200",
    iconColor: "text-red-500",
  },
  warning: {
    icon: AlertTriangle,
    bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
    textColor: "text-yellow-800 dark:text-yellow-200",
    iconColor: "text-yellow-500",
  },
  neutral: {
    icon: CheckCircle2,
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
    textColor: "text-blue-800 dark:text-blue-200",
    iconColor: "text-blue-500",
  },
  tip: {
    icon: Lightbulb,
    bgColor: "bg-purple-50 dark:bg-purple-900/20",
    textColor: "text-purple-800 dark:text-purple-200",
    iconColor: "text-purple-500",
  },
};

export function InsightCard({
  type,
  title,
  description,
  value,
  className,
}: InsightCardProps) {
  // Type is constrained to InsightType union, safe to access
  // eslint-disable-next-line security/detect-object-injection
  const config = typeConfig[type];
  const Icon = config.icon;

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className={cn("p-4", config.bgColor)}>
        <div className="flex items-start gap-4">
          <div
            className={cn(
              "bg-background/80 rounded-full p-2",
              config.iconColor
            )}
          >
            <Icon className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <p className={cn("font-semibold", config.textColor)}>{title}</p>
              {value && (
                <span
                  className={cn(
                    "whitespace-nowrap text-lg font-bold",
                    config.textColor
                  )}
                >
                  {value}
                </span>
              )}
            </div>
            <p className={cn("mt-1 text-sm opacity-90", config.textColor)}>
              {description}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
