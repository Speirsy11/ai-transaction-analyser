"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Skeleton,
  formatCurrency,
  Button,
} from "@finance/ui";
import { BudgetGauge, InsightCard, SpendingChart } from "@finance/analytics";
import { TransactionCard } from "@finance/transactions";
import { trpc } from "@/trpc/client";
import {
  Wallet,
  TrendingDown,
  TrendingUp,
  PiggyBank,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const now = new Date();
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [year, setYear] = useState(now.getFullYear());
  const [hasAutoDetected, setHasAutoDetected] = useState(false);

  // Auto-detect date range from transactions
  const dateRangeQuery = trpc.analytics.getDateRange.useQuery();

  // Update to the most recent transaction month when data loads
  useEffect(() => {
    if (dateRangeQuery.data?.hasTransactions && !hasAutoDetected) {
      setMonth(dateRangeQuery.data.suggestedMonth);
      setYear(dateRangeQuery.data.suggestedYear);
      setHasAutoDetected(true);
    }
  }, [dateRangeQuery.data, hasAutoDetected]);

  const startOfMonth = new Date(year, month - 1, 1);
  const endOfMonth = new Date(year, month, 0, 23, 59, 59);

  const monthName = new Date(year, month - 1).toLocaleDateString("en-GB", {
    month: "long",
    year: "numeric",
  });

  const handlePrevMonth = () => {
    if (month === 1) {
      setMonth(12);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  const handleNextMonth = () => {
    if (month === 12) {
      setMonth(1);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };

  const budgetQuery = trpc.analytics.get503020.useQuery({ month, year });
  const transactionsQuery = trpc.transactions.list.useQuery({
    limit: 5,
    filters: {
      startDate: startOfMonth,
      endDate: endOfMonth,
    },
  });
  const trendsQuery = trpc.analytics.getSpendingTrends.useQuery({
    startDate: new Date(year, month - 1, 1),
    endDate: endOfMonth,
    groupBy: "day",
  });

  const isLoading =
    budgetQuery.isLoading ||
    transactionsQuery.isLoading ||
    trendsQuery.isLoading;

  const budget = budgetQuery.data;
  const transactions = transactionsQuery.data?.data || [];
  const trends = trendsQuery.data || [];

  // Generate insights based on data
  const insights = budget
    ? [
        budget.needs.status === "over"
          ? {
              type: "warning" as const,
              title: "Needs Over Budget",
              description: `You've spent ${formatCurrency(budget.needs.actual - budget.needs.target)} more than planned on essentials.`,
              value: formatCurrency(budget.needs.actual),
            }
          : budget.savingsRate >= 20
            ? {
                type: "positive" as const,
                title: "Great Savings Rate!",
                description: `You're saving ${budget.savingsRate.toFixed(1)}% of your income. Keep it up!`,
                value: `${budget.savingsRate.toFixed(1)}%`,
              }
            : {
                type: "tip" as const,
                title: "Boost Your Savings",
                description: `Try to save at least 20% of your income. You're currently at ${budget.savingsRate.toFixed(1)}%.`,
                value: `${budget.savingsRate.toFixed(1)}%`,
              },
      ]
    : [];

  return (
    <div className="space-y-6">
      {/* Header with Month Navigation */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Your financial overview at a glance
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={handlePrevMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="min-w-[150px] text-center font-medium">
            {monthName}
          </span>
          <Button variant="outline" size="icon" onClick={handleNextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Income</CardTitle>
            <Wallet className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-24" />
            ) : (
              <>
                <div className="text-2xl font-bold text-green-600">
                  {formatCurrency(budget?.totalIncome || 0)}
                </div>
                <p className="text-muted-foreground text-xs">{monthName}</p>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Expenses
            </CardTitle>
            <TrendingDown className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-24" />
            ) : (
              <>
                <div className="text-2xl font-bold text-red-600">
                  {formatCurrency(budget?.totalExpenses || 0)}
                </div>
                <p className="text-muted-foreground text-xs">{monthName}</p>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Cash Flow</CardTitle>
            <TrendingUp className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-24" />
            ) : (
              <>
                <div
                  className={`text-2xl font-bold ${
                    (budget?.totalIncome || 0) - (budget?.totalExpenses || 0) >=
                    0
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {formatCurrency(
                    (budget?.totalIncome || 0) - (budget?.totalExpenses || 0)
                  )}
                </div>
                <p className="text-muted-foreground text-xs">{monthName}</p>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Savings Rate</CardTitle>
            <PiggyBank className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <>
                <div className="text-2xl font-bold">
                  {(budget?.savingsRate || 0).toFixed(1)}%
                </div>
                <p className="text-muted-foreground text-xs">Target: 20%</p>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Insights */}
      {insights.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {insights.map((insight, i) => (
            <InsightCard key={i} {...insight} />
          ))}
        </div>
      )}

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Budget Gauge */}
        {budget ? (
          <BudgetGauge breakdown={budget} />
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Smart Budget Goals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-full" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Spending Trends */}
        {trends.length > 0 ? (
          <SpendingChart
            data={trends}
            title="Daily Spending"
            description={`Your spending in ${monthName}`}
          />
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Daily Spending</CardTitle>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-[300px] w-full" />
            </CardContent>
          </Card>
        )}
      </div>

      {/* Recent Transactions */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Transactions in {monthName}</CardDescription>
          </div>
          <Link
            href="/dashboard/transactions"
            className="text-primary flex items-center gap-1 text-sm font-medium hover:underline"
          >
            View All
            <ArrowRight className="h-4 w-4" />
          </Link>
        </CardHeader>
        <CardContent>
          {transactionsQuery.isLoading ? (
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-20 w-full" />
              ))}
            </div>
          ) : transactions.length > 0 ? (
            <div className="space-y-3">
              {transactions.map((transaction) => (
                <TransactionCard
                  key={transaction.id}
                  transaction={{
                    ...transaction,
                    category: transaction.category ?? undefined,
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="py-8 text-center">
              <p className="text-muted-foreground mb-4">
                No transactions for {monthName}. Import your bank statement or
                try navigating to a different month.
              </p>
              <Link
                href="/dashboard/import"
                className="text-primary hover:underline"
              >
                Import Transactions
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
