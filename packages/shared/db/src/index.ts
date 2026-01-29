import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";
import * as relations from "./relations";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL environment variable is not set");
}

const client = postgres(connectionString);
export const db = drizzle(client, { schema: { ...schema, ...relations } });

export * from "./schema";
export * from "./relations";
export { eq, and, or, gte, lte, desc, asc, like, sql } from "drizzle-orm";
export type { InferSelectModel, InferInsertModel } from "drizzle-orm";
