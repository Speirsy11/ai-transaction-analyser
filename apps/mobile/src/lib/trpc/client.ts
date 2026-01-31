import { createTRPCReact } from "@trpc/react-query";
import type { AnyRouter } from "@trpc/server";

// Create the tRPC React client with a generic AnyRouter type
// This is necessary because the mobile app doesn't have direct access to the server router types
// The index signature allows dynamic router access (analytics, transactions, etc.)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RouterProxy = Record<string, any>;

type TRPCClient = ReturnType<typeof createTRPCReact<AnyRouter>> & RouterProxy;

export const trpc: TRPCClient = createTRPCReact<AnyRouter>() as TRPCClient;

// Re-export types for convenience
export type {
  Transaction,
  Budget503020,
  TrendData,
  CategoryData,
  MonthlyData,
} from "./types";
