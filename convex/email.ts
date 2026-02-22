"use node";

import { action } from "./_generated/server";
import { v } from "convex/values";

async function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("RESEND_API_KEY environment variable is not set");
  const { Resend } = await import("resend");
  return new Resend(apiKey);
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(amount);
}

/**
 * Send a welcome email to a new user.
 */
export const sendWelcomeEmail = action({
  args: {
    email: v.string(),
    firstName: v.string(),
  },
  handler: async (_ctx, args) => {
    const resend = await getResendClient();

    await resend.emails.send({
      from: process.env.FROM_EMAIL || "noreply@budgetbuddy.app",
      to: args.email,
      subject: "Welcome to BudgetBuddy!",
      html: `
        <h1>Welcome to BudgetBuddy, ${args.firstName}!</h1>
        <p>We're excited to help you take control of your finances.</p>
        <p>Get started by importing your bank transactions and let our AI categorize your spending automatically.</p>
        <p>Your budget buddy is ready to help!</p>
      `,
    });
  },
});

/**
 * Send a budget alert email.
 */
export const sendBudgetAlertEmail = action({
  args: {
    email: v.string(),
    firstName: v.string(),
    category: v.string(),
    spent: v.float64(),
    budget: v.float64(),
  },
  handler: async (_ctx, args) => {
    const resend = await getResendClient();

    const percentUsed = ((args.spent / args.budget) * 100).toFixed(0);

    await resend.emails.send({
      from: process.env.FROM_EMAIL || "noreply@budgetbuddy.app",
      to: args.email,
      subject: `Budget Alert: ${args.category} at ${percentUsed}%`,
      html: `
        <h1>Budget Alert</h1>
        <p>Hi ${args.firstName},</p>
        <p>Your <strong>${args.category}</strong> spending has reached ${percentUsed}% of your budget.</p>
        <p>Spent: ${formatCurrency(args.spent)} / Budget: ${formatCurrency(args.budget)}</p>
        <p>Log in to BudgetBuddy to review your spending.</p>
      `,
    });
  },
});
