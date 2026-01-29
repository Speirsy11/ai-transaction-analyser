"use client";

import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "./types";

export const trpc = createTRPCReact<AppRouter>();

export { QueryClient, QueryClientProvider } from "@tanstack/react-query";
export { httpBatchLink } from "@trpc/client";
export { default as superjson } from "superjson";
