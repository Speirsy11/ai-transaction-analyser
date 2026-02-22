/**
 * Get the authenticated user's Clerk ID or throw an error.
 * Shared helper used across Convex query/mutation handlers.
 */
export async function getUserId(ctx: {
  auth: { getUserIdentity: () => Promise<{ subject: string } | null> };
}) {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) throw new Error("Unauthenticated");
  return identity.subject;
}
