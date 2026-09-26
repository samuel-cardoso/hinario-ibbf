import { z } from 'zod';
import { PAGINATION } from '@/shared/constants';
import { hymnResponseItemSchema, hymnErrorSchema } from '../hymn.schema';

export const hymnListQuerySchema = z.object({
  page: z.coerce
    .number()
    .int()
    .positive()
    .optional()
    .default(PAGINATION.DEFAULT_PAGE)
    .describe('Página (1-indexada).'),
  limit: z.coerce
    .number()
    .int()
    .positive()
    .max(PAGINATION.MAX_LIMIT)
    .optional()
    .default(PAGINATION.DEFAULT_LIMIT)
    .describe(`Itens por página (máx. ${PAGINATION.MAX_LIMIT}).`),
  search: z
    .string()
    .min(1)
    .optional()
    .describe(
      'Busca por substring no título OU na letra do hino. Case-insensitive e ignora acentos ' +
        '(ex.: "jesus" encontra "Jesus", "JESUS" e "Jesús"). Não usa operadores especiais nem full-text — é um "contains" simples.'
    ),
});

export const hymnListResponseSchema = z.object({
  success: z.literal(true),
  data: z.object({
    hymns: z.array(hymnResponseItemSchema),
    pagination: z.object({
      total: z.number().int().nonnegative().describe('Total de hinos que casam com o filtro (antes da paginação).'),
      page: z.number().int().positive(),
      limit: z.number().int().positive(),
      totalPages: z.number().int().nonnegative(),
    }),
  }),
});

export { hymnErrorSchema as hymnListErrorSchema };
