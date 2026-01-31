import { router, protectedProcedure } from "@finance/api";
import { db, users } from "@finance/db";
import { logger } from "@finance/logger";
import { eq } from "drizzle-orm";

const log = logger.child({ module: "auth" });

export const authRouter = router({
  getMe: protectedProcedure.query(async ({ ctx }) => {
    log.debug({ userId: ctx.userId }, "getMe: fetching user profile");

    const user = await db.query.users.findFirst({
      where: eq(users.id, ctx.userId),
    });

    if (!user) {
      log.warn({ userId: ctx.userId }, "getMe: user not found in database");
    } else {
      log.debug({ userId: ctx.userId }, "getMe: user found");
    }

    return user ?? null;
  }),
});
