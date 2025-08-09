import * as z from 'zod';

export type Transaction = z.infer<typeof TransactionSchema>;
export type CreateTransactionRequest = z.infer<typeof createTransactionRequestSchema>;

export const TransactionSchema = z.object({
  id: z.int(),
  description: z.string().nullish(),
  amount: z.number(),
  sourceAccountId: z.int().nullish(),
  sourceAccountName: z.string().nullish(),
  destinationAccountId: z.int().nullish(),
  destinationAccountName: z.string().nullish(),
});

export const createTransactionRequestSchema = z.object({
  amount: z.number().gt(0).multipleOf(0.01),
  description: z.string(),
  date: z.iso.date(),
});
