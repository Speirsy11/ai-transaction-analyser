import type { Config } from "tailwindcss";
import baseConfig from "@finance/ui/tailwind.config";

const config: Config = {
  ...baseConfig,
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/shared/ui/src/**/*.{js,ts,jsx,tsx}",
  ],
};

export default config;
