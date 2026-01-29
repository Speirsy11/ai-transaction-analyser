import { router, protectedProcedure } from "@finance/api";
import { db, users } from "@finance/db";
import { eq } from "drizzle-orm";

export const authRouter = router({
  getMe: protectedProcedure.query(async ({ ctx }) => {
    const user = await db.query.users.findFirst({
      where: eq(users.id, ctx.userId),
    });

    return user ?? null;
  }),
});
