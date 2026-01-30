import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  title: "BudgetBuddy - AI-Powered Personal Finance",
  description:
    "Your friendly AI finance buddy that categorizes transactions, sets personalized budget goals, and gives you helpful insights.",
  keywords: [
    "personal finance",
    "budgeting",
    "AI",
    "transaction categorization",
    "smart budgeting",
    "money management",
  ],
  authors: [{ name: "BudgetBuddy" }],
  openGraph: {
    title: "BudgetBuddy - AI-Powered Personal Finance",
    description:
      "Take control of your finances with AI-powered transaction categorization and smart budgeting.",
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "BudgetBuddy - AI-Powered Personal Finance",
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
