import { pgTable, text, timestamp, real, integer } from "drizzle-orm/pg-core";
import { users } from "./users";
import { categories } from "./categories";

export const budgets = pgTable("budgets", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  categoryId: text("category_id").references(() => categories.id),
  name: text("name").notNull(),
  amount: real("amount").notNull(),
  period: text("period").notNull().default("monthly"), // monthly, weekly, yearly
  month: integer("month"), // 1-12 for monthly budgets
  year: integer("year"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type Budget = typeof budgets.$inferSelect;
export type NewBudget = typeof budgets.$inferInsert;

// 50/30/20 rule allocations
export const budgetAllocations = pgTable("budget_allocations", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  totalIncome: real("total_income").notNull(),
  needsPercent: real("needs_percent").notNull().default(50),
  wantsPercent: real("wants_percent").notNull().default(30),
  savingsPercent: real("savings_percent").notNull().default(20),
  month: integer("month").notNull(),
  year: integer("year").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type BudgetAllocation = typeof budgetAllocations.$inferSelect;
export type NewBudgetAllocation = typeof budgetAllocations.$inferInsert;
