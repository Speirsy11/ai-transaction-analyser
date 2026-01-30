import { router, protectedProcedure, z } from "@finance/api";
import { db, transactions, budgetAllocations } from "@finance/db";
import { eq, and, gte, lte, desc } from "drizzle-orm";
import {
  calculate503020,
  calculateSpendingTrends,
  calculateCategoryTotals,
} from "./calculations";

export const analyticsRouter = router({
  get503020: protectedProcedure
    .input(
      z.object({
        month: z.number().min(1).max(12),
        year: z.number(),
      })
    )
    .query(async ({ ctx, input }) => {
      const startDate = new Date(input.year, input.month - 1, 1);
      const endDate = new Date(input.year, input.month, 0, 23, 59, 59);

      const monthTransactions = await db.query.transactions.findMany({
        where: and(
          eq(transactions.userId, ctx.userId),
          gte(transactions.date, startDate),
          lte(transactions.date, endDate)
        ),
      });

      // Calculate income from positive transactions
      const income = monthTransactions
        .filter((t) => t.amount > 0)
        .reduce((sum, t) => sum + t.amount, 0);

      // Get user's custom allocation if exists
      const allocation = await db.query.budgetAllocations.findFirst({
        where: and(
          eq(budgetAllocations.userId, ctx.userId),
          eq(budgetAllocations.month, input.month),
          eq(budgetAllocations.year, input.year)
        ),
      });

      const customRatios = allocation
        ? {
            needs: allocation.needsPercent,
            wants: allocation.wantsPercent,
            savings: allocation.savingsPercent,
          }
        : undefined;

      return calculate503020(income, monthTransactions, customRatios);
    }),

  getSpendingTrends: protectedProcedure
    .input(
      z.object({
        startDate: z.date(),
        endDate: z.date(),
        groupBy: z.enum(["day", "week", "month"]).default("day"),
      })
    )
    .query(async ({ ctx, input }) => {
      const userTransactions = await db.query.transactions.findMany({
        where: and(
          eq(transactions.userId, ctx.userId),
          gte(transactions.date, input.startDate),
          lte(transactions.date, input.endDate)
        ),
        orderBy: [desc(transactions.date)],
      });

      return calculateSpendingTrends(userTransactions, input.groupBy);
    }),

  getCategoryBreakdown: protectedProcedure
    .input(
      z.object({
        startDate: z.date(),
        endDate: z.date(),
      })
    )
    .query(async ({ ctx, input }) => {
      const userTransactions = await db.query.transactions.findMany({
        where: and(
          eq(transactions.userId, ctx.userId),
          gte(transactions.date, input.startDate),
          lte(transactions.date, input.endDate)
        ),
      });

      return calculateCategoryTotals(userTransactions);
    }),

  updateAllocation: protectedProcedure
    .input(
      z.object({
        month: z.number().min(1).max(12),
        year: z.number(),
        totalIncome: z.number(),
        needsPercent: z.number().min(0).max(100).default(50),
        wantsPercent: z.number().min(0).max(100).default(30),
        savingsPercent: z.number().min(0).max(100).default(20),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Validate percentages sum to 100
      const total =
        input.needsPercent + input.wantsPercent + input.savingsPercent;
      if (Math.abs(total - 100) > 0.01) {
        throw new Error("Percentages must sum to 100");
      }

      const existing = await db.query.budgetAllocations.findFirst({
        where: and(
          eq(budgetAllocations.userId, ctx.userId),
          eq(budgetAllocations.month, input.month),
          eq(budgetAllocations.year, input.year)
        ),
      });

      if (existing) {
        const [updated] = await db
          .update(budgetAllocations)
          .set({
            totalIncome: input.totalIncome,
            needsPercent: input.needsPercent,
            wantsPercent: input.wantsPercent,
            savingsPercent: input.savingsPercent,
            updatedAt: new Date(),
          })
          .where(eq(budgetAllocations.id, existing.id))
          .returning();
        return updated;
      }

      const [created] = await db
        .insert(budgetAllocations)
        .values({
          userId: ctx.userId,
          month: input.month,
          year: input.year,
          totalIncome: input.totalIncome,
          needsPercent: input.needsPercent,
          wantsPercent: input.wantsPercent,
          savingsPercent: input.savingsPercent,
        })
        .returning();

      return created;
    }),

  getMonthlyComparison: protectedProcedure
    .input(
      z.object({
        months: z.number().min(1).max(12).default(6),
      })
    )
    .query(async ({ ctx, input }) => {
      const endDate = new Date();
      const startDate = new Date();
      startDate.setMonth(startDate.getMonth() - input.months);

      const userTransactions = await db.query.transactions.findMany({
        where: and(
          eq(transactions.userId, ctx.userId),
          gte(transactions.date, startDate),
          lte(transactions.date, endDate)
        ),
      });

      // Group by month
      const monthlyData = new Map<
        string,
        { income: number; expenses: number }
      >();

      for (const t of userTransactions) {
        const date = new Date(t.date);
        const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;

        const existing = monthlyData.get(key) ?? { income: 0, expenses: 0 };
        if (t.amount > 0) {
          existing.income += t.amount;
        } else {
          existing.expenses += Math.abs(t.amount);
        }
        monthlyData.set(key, existing);
      }

      return Array.from(monthlyData.entries())
        .map(([month, data]) => ({
          month,
          income: data.income,
          expenses: data.expenses,
          savings: data.income - data.expenses,
          savingsRate:
            data.income > 0
              ? ((data.income - data.expenses) / data.income) * 100
              : 0,
        }))
        .sort((a, b) => a.month.localeCompare(b.month));
    }),
});
