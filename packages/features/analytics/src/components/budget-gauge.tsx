"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  cn,
  formatCurrency,
  formatPercent,
} from "@finance/ui";
import type { BudgetBreakdown } from "../calculations";

interface BudgetGaugeProps {
  breakdown: BudgetBreakdown;
  className?: string;
}

export function BudgetGauge({ breakdown, className }: BudgetGaugeProps) {
  const categories = [
    {
      name: "Needs",
      data: breakdown.needs,
      color: "bg-blue-500",
      bgColor: "bg-blue-100 dark:bg-blue-900/30",
      description: "Housing, utilities, groceries, healthcare",
    },
    {
      name: "Wants",
      data: breakdown.wants,
      color: "bg-purple-500",
      bgColor: "bg-purple-100 dark:bg-purple-900/30",
      description: "Entertainment, dining out, shopping",
    },
    {
      name: "Savings",
      data: breakdown.savings,
      color: "bg-green-500",
      bgColor: "bg-green-100 dark:bg-green-900/30",
      description: "Savings, investments, debt paydown",
    },
  ];

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>50/30/20 Budget</span>
          <span className="text-muted-foreground text-sm font-normal">
            Savings Rate: {formatPercent(breakdown.savingsRate)}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {categories.map((category) => {
          const progressPercent = Math.min(
            (category.data.actual / category.data.target) * 100,
            100
          );
          const isOver = category.data.actual > category.data.target;

          return (
            <div key={category.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{category.name}</p>
                  <p className="text-muted-foreground text-xs">
                    {category.description}
                  </p>
                </div>
                <div className="text-right">
                  <p
                    className={cn(
                      "font-semibold tabular-nums",
                      isOver ? "text-red-500" : "text-foreground"
                    )}
                  >
                    {formatCurrency(category.data.actual)}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    of {formatCurrency(category.data.target)}
                  </p>
                </div>
              </div>
              <div
                className={cn(
                  "h-3 overflow-hidden rounded-full",
                  category.bgColor
                )}
              >
                <div
                  className={cn(
                    "h-full rounded-full transition-all duration-500",
                    isOver ? "bg-red-500" : category.color
                  )}
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <div className="flex justify-between text-xs">
                <span
                  className={cn(
                    "font-medium",
                    category.data.status === "over"
                      ? "text-red-500"
                      : category.data.status === "on-track"
                        ? "text-green-500"
                        : "text-muted-foreground"
                  )}
                >
                  {category.data.status === "over"
                    ? `${formatCurrency(category.data.actual - category.data.target)} over`
                    : category.data.status === "on-track"
                      ? "On track"
                      : `${formatCurrency(category.data.target - category.data.actual)} remaining`}
                </span>
                <span className="text-muted-foreground">
                  {formatPercent(category.data.percentage)} of income
                </span>
              </div>
            </div>
          );
        })}

        <div className="border-t pt-4">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-green-500">
                {formatCurrency(breakdown.totalIncome)}
              </p>
              <p className="text-muted-foreground text-sm">Total Income</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-red-500">
                {formatCurrency(breakdown.totalExpenses)}
              </p>
              <p className="text-muted-foreground text-sm">Total Expenses</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
