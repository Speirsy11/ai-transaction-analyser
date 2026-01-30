"use client";

// Re-export utilities for creating tRPC client in apps
export { createTRPCReact } from "@trpc/react-query";
export { QueryClient, QueryClientProvider } from "@tanstack/react-query";
export { httpBatchLink } from "@trpc/client";
export { default as superjson } from "superjson";
