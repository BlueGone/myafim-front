import * as z from 'zod';

export type Page<T> = z.infer<ReturnType<typeof PageSchema<z.ZodSchema<T>>>>;

export function PageSchema<InnerSchema extends z.ZodSchema>(innerSchema: InnerSchema) {
  return z.object({
    items: z.array(innerSchema),
    totalCount: z.number(),
    currentPage: z.number(),
    totalPages: z.number(),
  });
}
