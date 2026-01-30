import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@finance/ui", "@finance/payments"],
};

export default nextConfig;
