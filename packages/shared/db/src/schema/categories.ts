import { pgTable, text, timestamp, pgEnum, boolean } from "drizzle-orm/pg-core";
import { users } from "./users";

export const necessityTypeEnum = pgEnum("necessity_type", ["need", "want", "savings"]);

export const categories = pgTable("categories", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  icon: text("icon"),
  color: text("color"),
  necessityType: necessityTypeEnum("necessity_type").notNull().default("want"),
  isSystem: boolean("is_system").default(false).notNull(),
  userId: text("user_id").references(() => users.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Category = typeof categories.$inferSelect;
export type NewCategory = typeof categories.$inferInsert;
