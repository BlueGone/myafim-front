import * as z from 'zod';

export type Transaction = z.infer<typeof TransactionSchema>;

export const TransactionSchema = z.object({
  id: z.int(),
  description: z.string().optional(),
  amount: z.number(),
  sourceAccountId: z.int().optional(),
  sourceAccountName: z.string().optional(),
  destinationAccountId: z.int().optional(),
  destinationAccountName: z.string().optional(),
});
