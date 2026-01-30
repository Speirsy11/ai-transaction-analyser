import { router, protectedProcedure, z } from "@finance/api";
import { db, transactions } from "@finance/db";
import { eq, and, gte, lte, desc, like, sql } from "drizzle-orm";
import { transactionFilterSchema } from "./schema";
import { classifyTransaction, classifyTransactionsBatch } from "./classifier";

export const transactionsRouter = router({
  list: protectedProcedure
    .input(
      z.object({
        filters: transactionFilterSchema.optional(),
        limit: z.number().min(1).max(100).default(50),
        offset: z.number().min(0).default(0),
      })
    )
    .query(async ({ ctx, input }) => {
      const conditions = [eq(transactions.userId, ctx.userId)];

      if (input.filters?.startDate) {
        conditions.push(gte(transactions.date, input.filters.startDate));
      }
      if (input.filters?.endDate) {
        conditions.push(lte(transactions.date, input.filters.endDate));
      }
      if (input.filters?.categoryId) {
        conditions.push(eq(transactions.categoryId, input.filters.categoryId));
      }
      if (input.filters?.minAmount !== undefined) {
        conditions.push(gte(transactions.amount, input.filters.minAmount));
      }
      if (input.filters?.maxAmount !== undefined) {
        conditions.push(lte(transactions.amount, input.filters.maxAmount));
      }
      if (input.filters?.search) {
        conditions.push(
          like(transactions.description, `%${input.filters.search}%`)
        );
      }

      const [data, countResult] = await Promise.all([
        db.query.transactions.findMany({
          where: and(...conditions),
          orderBy: [desc(transactions.date)],
          limit: input.limit,
          offset: input.offset,
          with: {
            category: true,
          },
        }),
        db
          .select({ count: sql<number>`count(*)` })
          .from(transactions)
          .where(and(...conditions)),
      ]);

      return {
        data,
        total: countResult[0]?.count ?? 0,
        hasMore: input.offset + data.length < (countResult[0]?.count ?? 0),
      };
    }),

  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const transaction = await db.query.transactions.findFirst({
        where: and(
          eq(transactions.id, input.id),
          eq(transactions.userId, ctx.userId)
        ),
        with: {
          category: true,
        },
      });

      return transaction;
    }),

  create: protectedProcedure
    .input(
      z.object({
        amount: z.number(),
        date: z.date(),
        description: z.string(),
        merchant: z.string().optional(),
        categoryId: z.string().optional(),
        notes: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const [transaction] = await db
        .insert(transactions)
        .values({
          userId: ctx.userId,
          amount: input.amount,
          date: input.date,
          description: input.description,
          merchant: input.merchant,
          categoryId: input.categoryId,
          notes: input.notes,
        })
        .returning();

      return transaction;
    }),

  createMany: protectedProcedure
    .input(
      z.object({
        transactions: z.array(
          z.object({
            amount: z.number(),
            date: z.date(),
            description: z.string(),
            merchant: z.string().optional(),
          })
        ),
        autoClassify: z.boolean().default(true),
      })
    )
    .mutation(async ({ ctx, input }) => {
      let transactionsToInsert = input.transactions.map((t) => ({
        userId: ctx.userId,
        amount: t.amount,
        date: t.date,
        description: t.description,
        merchant: t.merchant,
      }));

      // Auto-classify if requested
      if (input.autoClassify) {
        const classifications = await classifyTransactionsBatch(
          input.transactions.map((t) => ({
            description: t.description,
            amount: t.amount,
            merchant: t.merchant,
            date: t.date,
          }))
        );

        transactionsToInsert = transactionsToInsert.map((t, i) => {
          // eslint-disable-next-line security/detect-object-injection -- Safe array index access within map callback
          const classification = classifications[i];
          return {
            ...t,
            aiClassified: classification?.category,
            necessityScore:
              classification?.necessityType === "need"
                ? 1
                : classification?.necessityType === "savings"
                  ? 0.5
                  : 0,
          };
        });
      }

      const inserted = await db
        .insert(transactions)
        .values(transactionsToInsert)
        .returning();

      return { count: inserted.length, transactions: inserted };
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        amount: z.number().optional(),
        date: z.date().optional(),
        description: z.string().optional(),
        merchant: z.string().optional(),
        categoryId: z.string().nullable().optional(),
        notes: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...updateData } = input;

      const [updated] = await db
        .update(transactions)
        .set({
          ...updateData,
          updatedAt: new Date(),
        })
        .where(
          and(eq(transactions.id, id), eq(transactions.userId, ctx.userId))
        )
        .returning();

      return updated;
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await db
        .delete(transactions)
        .where(
          and(
            eq(transactions.id, input.id),
            eq(transactions.userId, ctx.userId)
          )
        );

      return { success: true };
    }),

  classify: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const transaction = await db.query.transactions.findFirst({
        where: and(
          eq(transactions.id, input.id),
          eq(transactions.userId, ctx.userId)
        ),
      });

      if (!transaction) {
        throw new Error("Transaction not found");
      }

      const classification = await classifyTransaction({
        description: transaction.description,
        amount: transaction.amount,
        merchant: transaction.merchant ?? undefined,
        date: transaction.date,
      });

      const [updated] = await db
        .update(transactions)
        .set({
          aiClassified: classification.category,
          necessityScore:
            classification.necessityType === "need"
              ? 1
              : classification.necessityType === "savings"
                ? 0.5
                : 0,
          updatedAt: new Date(),
        })
        .where(eq(transactions.id, input.id))
        .returning();

      return { transaction: updated, classification };
    }),

  getSummary: protectedProcedure
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

      const totalIncome = userTransactions
        .filter((t) => t.amount > 0)
        .reduce((sum, t) => sum + t.amount, 0);

      const totalExpenses = userTransactions
        .filter((t) => t.amount < 0)
        .reduce((sum, t) => sum + Math.abs(t.amount), 0);

      const categoryTotals: Record<string, number> = {};
      for (const t of userTransactions) {
        const category = t.aiClassified || "Uncategorized";
        // eslint-disable-next-line security/detect-object-injection -- Safe: category is derived from user data in typed Record
        const currentTotal = categoryTotals[category] || 0;
        // eslint-disable-next-line security/detect-object-injection -- Safe: category is derived from user data in typed Record
        categoryTotals[category] = currentTotal + Math.abs(t.amount);
      }

      return {
        totalIncome,
        totalExpenses,
        netCashFlow: totalIncome - totalExpenses,
        transactionCount: userTransactions.length,
        categoryTotals,
      };
    }),
});
