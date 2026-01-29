import { pgTable, text, timestamp, real, index } from "drizzle-orm/pg-core";
import { users } from "./users";
import { categories } from "./categories";

export const transactions = pgTable("transactions", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: text("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  amount: real("amount").notNull(),
  date: timestamp("date").notNull(),
  description: text("description").notNull(),
  merchant: text("merchant"),
  categoryId: text("category_id").references(() => categories.id),
  necessityScore: real("necessity_score"),
  aiClassified: text("ai_classified"), // AI-generated category suggestion
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => [
  index("transactions_user_id_idx").on(table.userId),
  index("transactions_date_idx").on(table.date),
  index("transactions_category_id_idx").on(table.categoryId),
]);

export type Transaction = typeof transactions.$inferSelect;
export type NewTransaction = typeof transactions.$inferInsert;
