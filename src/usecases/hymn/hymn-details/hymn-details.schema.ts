import { z } from 'zod';
import { hymnResponseItemSchema, hymnErrorSchema } from '../hymn.schema';

export const hymnDetailsParamsSchema = z.object({
  id: z.coerce.number().int().positive().describe('Número do hino no hinário impresso do Cantor Cristão.'),
});

export const hymnDetailsResponseSchema = z.object({
  success: z.literal(true),
  data: z.object({ hymn: hymnResponseItemSchema }),
});

export { hymnErrorSchema as hymnDetailsErrorSchema };
