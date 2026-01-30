// Server-only exports
export { authRouter } from "./router";
export { syncUser } from "./sync-user";

// Re-exports from Clerk (server-only)
export { currentUser, auth } from "@clerk/nextjs/server";
