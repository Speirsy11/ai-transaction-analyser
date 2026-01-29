"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Button,
  Input,
  Label,
  Skeleton,
} from "@finance/ui";
import { BudgetGauge, CategoryBreakdown } from "@finance/analytics";
import { trpc } from "@/trpc/client";
import { ChevronLeft, ChevronRight, Settings } from "lucide-react";

export default function BudgetPage() {
  const now = new Date();
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [year, setYear] = useState(now.getFullYear());
  const [isEditing, setIsEditing] = useState(false);

  const startOfMonth = new Date(year, month - 1, 1);
  const endOfMonth = new Date(year, month, 0, 23, 59, 59);

  const budgetQuery = trpc.analytics.get503020.useQuery({ month, year });
  const categoryQuery = trpc.analytics.getCategoryBreakdown.useQuery({
    startDate: startOfMonth,
    endDate: endOfMonth,
  });

  const updateAllocation = trpc.analytics.updateAllocation.useMutation({
    onSuccess: () => {
      budgetQuery.refetch();
      setIsEditing(false);
    },
  });

  const budget = budgetQuery.data;
  const categories = categoryQuery.data || [];

  const monthName = new Date(year, month - 1).toLocaleDateString("en-US", {
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

  const [incomeInput, setIncomeInput] = useState(
    budget?.totalIncome.toString() || ""
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Budget</h2>
          <p className="text-muted-foreground">
            Track your spending against the 50/30/20 rule
          </p>
        </div>
        <div className="flex items-center gap-4">
          {/* Month Navigation */}
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
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(!isEditing)}
          >
            <Settings className="h-4 w-4 mr-2" />
            {isEditing ? "Cancel" : "Customize"}
          </Button>
        </div>
      </div>

      {/* Editing Panel */}
      {isEditing && (
        <Card>
          <CardHeader>
            <CardTitle>Customize Budget</CardTitle>
            <CardDescription>
              Set your monthly income and adjust allocation percentages
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                updateAllocation.mutate({
                  month,
                  year,
                  totalIncome: parseFloat(formData.get("income") as string) || 0,
                  needsPercent:
                    parseFloat(formData.get("needs") as string) || 50,
                  wantsPercent:
                    parseFloat(formData.get("wants") as string) || 30,
                  savingsPercent:
                    parseFloat(formData.get("savings") as string) || 20,
                });
              }}
              className="space-y-4"
            >
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="space-y-2">
                  <Label htmlFor="income">Monthly Income ($)</Label>
                  <Input
                    id="income"
                    name="income"
                    type="number"
                    placeholder="5000"
                    defaultValue={budget?.totalIncome || ""}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="needs">Needs (%)</Label>
                  <Input
                    id="needs"
                    name="needs"
                    type="number"
                    placeholder="50"
                    defaultValue="50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="wants">Wants (%)</Label>
                  <Input
                    id="wants"
                    name="wants"
                    type="number"
                    placeholder="30"
                    defaultValue="30"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="savings">Savings (%)</Label>
                  <Input
                    id="savings"
                    name="savings"
                    type="number"
                    placeholder="20"
                    defaultValue="20"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={updateAllocation.isPending}>
                  {updateAllocation.isPending ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Budget Gauge */}
        {budgetQuery.isLoading ? (
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ) : budget ? (
          <BudgetGauge breakdown={budget} />
        ) : (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">
                No budget data available for this month
              </p>
            </CardContent>
          </Card>
        )}

        {/* Category Breakdown */}
        {categoryQuery.isLoading ? (
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-40" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-[280px] w-full" />
            </CardContent>
          </Card>
        ) : categories.length > 0 ? (
          <CategoryBreakdown data={categories} />
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Spending by Category</CardTitle>
            </CardHeader>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">
                No spending data for this month
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Budget Tips */}
      <Card>
        <CardHeader>
          <CardTitle>50/30/20 Rule Explained</CardTitle>
          <CardDescription>
            A simple budgeting framework to help you manage your money
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20">
              <div className="text-3xl font-bold text-blue-600 mb-2">50%</div>
              <h4 className="font-semibold text-blue-800 dark:text-blue-200">
                Needs
              </h4>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Essential expenses like housing, utilities, groceries, healthcare,
                and minimum debt payments.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-purple-50 dark:bg-purple-900/20">
              <div className="text-3xl font-bold text-purple-600 mb-2">30%</div>
              <h4 className="font-semibold text-purple-800 dark:text-purple-200">
                Wants
              </h4>
              <p className="text-sm text-purple-700 dark:text-purple-300">
                Non-essential spending like entertainment, dining out, shopping,
                and subscriptions.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20">
              <div className="text-3xl font-bold text-green-600 mb-2">20%</div>
              <h4 className="font-semibold text-green-800 dark:text-green-200">
                Savings
              </h4>
              <p className="text-sm text-green-700 dark:text-green-300">
                Savings, investments, and extra debt payments beyond the minimum
                required.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
