import { router } from "@finance/api";
import { authRouter } from "@finance/auth";
import { transactionsRouter } from "@finance/transactions";
import { analyticsRouter } from "@finance/analytics";

export const appRouter = router({
  auth: authRouter,
  transactions: transactionsRouter,
  analytics: analyticsRouter,
});

export type AppRouter = typeof appRouter;
