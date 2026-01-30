import { z } from "zod";

export const TransactionInputSchema = z.object({
  description: z.string(),
  amount: z.number(),
  merchant: z.string().optional(),
  date: z.string().optional(),
});

export type TransactionInput = z.infer<typeof TransactionInputSchema>;

export const ClassificationResultSchema = z.object({
  category: z.string(),
  necessityType: z.enum(["need", "want", "savings"]),
  confidence: z.number().min(0).max(1),
  reasoning: z.string().optional(),
  suggestedMerchant: z.string().optional(),
});

export type ClassificationResult = z.infer<typeof ClassificationResultSchema>;

export const BatchClassificationResultSchema = z.object({
  results: z.array(
    z.object({
      index: z.number(),
      classification: ClassificationResultSchema,
    })
  ),
});

export type BatchClassificationResult = z.infer<
  typeof BatchClassificationResultSchema
>;
