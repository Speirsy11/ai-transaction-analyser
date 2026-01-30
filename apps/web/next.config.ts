import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [
    "@finance/ui",
    "@finance/db",
    "@finance/api",
    "@finance/ai",
    "@finance/auth",
    "@finance/transactions",
    "@finance/analytics",
  ],
  serverExternalPackages: ["ioredis", "postgres"],
  experimental: {
    optimizePackageImports: ["@finance/ui", "lucide-react"],
  },
};

export default nextConfig;
