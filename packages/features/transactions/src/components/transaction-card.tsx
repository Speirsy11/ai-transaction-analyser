"use client";

import { format } from "date-fns";
import { Card, CardContent, cn, formatCurrency } from "@finance/ui";
import { CategoryBadge } from "./category-badge";

interface TransactionCardProps {
  transaction: {
    id: string;
    date: Date;
    description: string;
    merchant?: string | null;
    amount: number;
    aiClassified?: string | null;
    category?: {
      name: string;
      necessityType: "need" | "want" | "savings";
    } | null;
  };
  onClick?: () => void;
}

export function TransactionCard({ transaction, onClick }: TransactionCardProps) {
  return (
    <Card
      className={cn(
        "cursor-pointer transition-all hover:shadow-md hover:border-primary/20",
        onClick && "hover:bg-accent/50"
      )}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <p className="font-medium truncate">{transaction.description}</p>
            {transaction.merchant && (
              <p className="text-sm text-muted-foreground truncate">
                {transaction.merchant}
              </p>
            )}
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs text-muted-foreground">
                {format(new Date(transaction.date), "MMM d, yyyy")}
              </span>
              <CategoryBadge
                category={transaction.category?.name ?? transaction.aiClassified}
                necessityType={transaction.category?.necessityType}
                isAiSuggested={!transaction.category && !!transaction.aiClassified}
              />
            </div>
          </div>
          <div
            className={cn(
              "text-lg font-semibold tabular-nums whitespace-nowrap",
              transaction.amount < 0
                ? "text-red-600 dark:text-red-400"
                : "text-green-600 dark:text-green-400"
            )}
          >
            {transaction.amount < 0 ? "-" : "+"}
            {formatCurrency(Math.abs(transaction.amount))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
