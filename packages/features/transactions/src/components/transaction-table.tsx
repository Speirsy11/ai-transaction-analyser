"use client";

import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Badge,
  Button,
  cn,
  formatCurrency,
} from "@finance/ui";
import { MoreHorizontal, Sparkles, Pencil, Trash2 } from "lucide-react";
import { CategoryBadge } from "./category-badge";

export interface TransactionTableData {
  id: string;
  date: Date;
  description: string;
  merchant?: string | null;
  amount: number;
  categoryId?: string | null;
  aiClassified?: string | null;
  necessityScore?: number | null;
  category?: {
    id: string;
    name: string;
    color?: string | null;
    necessityType: "need" | "want" | "savings";
  } | null;
}

interface TransactionTableProps {
  transactions: TransactionTableData[];
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onClassify?: (id: string) => void;
  isLoading?: boolean;
}

export function TransactionTable({
  transactions,
  onEdit,
  onDelete,
  onClassify,
  isLoading,
}: TransactionTableProps) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="h-16 rounded-lg bg-muted animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="rounded-full bg-muted p-4 mb-4">
          <Sparkles className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold">No transactions yet</h3>
        <p className="text-muted-foreground mt-1">
          Import your bank statement or add transactions manually.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border bg-card">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-[120px]">Date</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead className="w-[80px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id} className="group">
              <TableCell className="font-medium text-muted-foreground">
                {format(new Date(transaction.date), "MMM d, yyyy")}
              </TableCell>
              <TableCell>
                <div>
                  <p className="font-medium">{transaction.description}</p>
                  {transaction.merchant && (
                    <p className="text-sm text-muted-foreground">
                      {transaction.merchant}
                    </p>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <CategoryBadge
                  category={transaction.category?.name ?? transaction.aiClassified}
                  necessityType={transaction.category?.necessityType}
                  isAiSuggested={!transaction.category && !!transaction.aiClassified}
                />
              </TableCell>
              <TableCell
                className={cn(
                  "text-right font-semibold tabular-nums",
                  transaction.amount < 0
                    ? "text-red-600 dark:text-red-400"
                    : "text-green-600 dark:text-green-400"
                )}
              >
                {transaction.amount < 0 ? "-" : "+"}
                {formatCurrency(Math.abs(transaction.amount))}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  {onClassify && !transaction.aiClassified && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => onClassify(transaction.id)}
                    >
                      <Sparkles className="h-4 w-4" />
                    </Button>
                  )}
                  {onEdit && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => onEdit(transaction.id)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                  )}
                  {onDelete && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:text-destructive"
                      onClick={() => onDelete(transaction.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
