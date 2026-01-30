import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  title: "FinanceAI - AI-Powered Personal Finance",
  description:
    "Take control of your finances with AI-powered transaction categorization, smart budgeting with the 50/30/20 rule, and actionable insights.",
  keywords: [
    "personal finance",
    "budgeting",
    "AI",
    "transaction categorization",
    "50/30/20 rule",
    "money management",
  ],
  authors: [{ name: "FinanceAI" }],
  openGraph: {
    title: "FinanceAI - AI-Powered Personal Finance",
    description:
      "Take control of your finances with AI-powered transaction categorization and smart budgeting.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "FinanceAI - AI-Powered Personal Finance",
    description:
      "Take control of your finances with AI-powered transaction categorization and smart budgeting.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
