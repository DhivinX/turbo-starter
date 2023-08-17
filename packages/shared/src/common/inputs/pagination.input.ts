import { z } from 'zod';
import { UseSchema } from '../use-schema';

export const paginationDtoSchema = z.object({
  page: z.number().gte(1).optional().default(1),
  take: z.number().gte(1).lte(50).optional().default(10),
  sortBy: z.string().optional(),
  descending: z.boolean().optional(),
  filter: z.string().optional(),
});

@UseSchema(paginationDtoSchema)
export class PaginationDto {}
export interface PaginationDto extends z.infer<typeof paginationDtoSchema> {}
