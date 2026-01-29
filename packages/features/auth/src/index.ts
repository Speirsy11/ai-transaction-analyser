// Components
export { UserButton } from "./components/user-button";
export { SignInButton } from "./components/sign-in-button";
export { SignUpButton } from "./components/sign-up-button";

// Hooks
export { useCurrentUser } from "./hooks/use-current-user";

// Server
export { authRouter } from "./router";
export { syncUser } from "./sync-user";

// Re-exports from Clerk
export {
  SignIn,
  SignUp,
  ClerkProvider,
  useAuth,
  useUser,
  useClerk,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";

export { currentUser, auth } from "@clerk/nextjs/server";
