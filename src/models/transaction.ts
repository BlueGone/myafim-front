import * as z from 'zod';

export type Transaction = z.infer<typeof TransactionSchema>;

export const TransactionSchema = z.object({
  id: z.int(),
  description: z.string().nullish(),
  amount: z.number(),
});
