import { auth, currentUser, syncUser } from "@finance/auth/server";
import type { TRPCContext } from "@finance/api";
import { appRouter } from "./routers";
import { createCallerFactory } from "@finance/api";

export async function createContext(): Promise<TRPCContext> {
  const session = await auth();

  // Sync user to database if authenticated
  if (session?.userId) {
    const user = await currentUser();
    if (user) {
      // Sync user to ensure they exist in our database
      await syncUser({
        id: user.id,
        emailAddresses: user.emailAddresses,
        firstName: user.firstName,
        lastName: user.lastName,
        imageUrl: user.imageUrl,
      }).catch(() => {
        // Ignore sync errors - user will be synced on next request
      });
    }
  }

  return {
    userId: session?.userId ?? null,
  };
}

export const createCaller = createCallerFactory(appRouter);
