import { z } from "zod";

export const transactionSchema = z.object({
  amount: z.number().refine((val) => val !== 0, "Amount cannot be zero"),
  date: z.date(),
  description: z.string().min(1, "Description is required"),
  merchant: z.string().optional(),
  categoryId: z.string().optional(),
  notes: z.string().optional(),
});

export type TransactionFormData = z.infer<typeof transactionSchema>;

export const transactionFilterSchema = z.object({
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  categoryId: z.string().optional(),
  minAmount: z.number().optional(),
  maxAmount: z.number().optional(),
  search: z.string().optional(),
  necessityType: z.enum(["need", "want", "savings"]).optional(),
});

export type TransactionFilter = z.infer<typeof transactionFilterSchema>;

export const importTransactionSchema = z.object({
  amount: z.number(),
  date: z.string().or(z.date()),
  description: z.string(),
  merchant: z.string().optional(),
});

export type ImportTransaction = z.infer<typeof importTransactionSchema>;
