import { auth } from "@finance/auth/server";
import type { TRPCContext } from "@finance/api";
import { appRouter } from "./routers";
import { createCallerFactory } from "@finance/api";

export async function createContext(): Promise<TRPCContext> {
  const session = await auth();

  return {
    userId: session?.userId ?? null,
  };
}

export const createCaller = createCallerFactory(appRouter);
