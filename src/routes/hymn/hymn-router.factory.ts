import type { FastifyInstance } from 'fastify';
import { container } from '@/container';
import { hymnListQuerySchema, hymnListResponseSchema } from '@/usecases/hymn/hymn-list/hymn-list.schema';
import { hymnDetailsParamsSchema, hymnDetailsResponseSchema, hymnDetailsErrorSchema } from '@/usecases/hymn/hymn-details/hymn-details.schema';

export async function hymnRoutes(server: FastifyInstance) {
  server.get(
    '/',
    {
      schema: {
        tags: ['Hymns'],
        summary: 'Lista e busca hinos do Cantor Cristão',
        description:
          'Retorna os hinos em ordem crescente de número. Sem `search`, lista o hinário inteiro paginado. ' +
          'Com `search`, filtra por substring (case/acento-insensível) no título OU na letra — ' +
          'útil tanto para "achar o hino que fala sobre X" quanto para autocomplete por título.',
        querystring: hymnListQuerySchema,
        response: { 200: hymnListResponseSchema },
      },
    },
    async (request, reply) => container.hymnListController.handle(request, reply)
  );

  server.get(
    '/:id',
    {
      schema: {
        tags: ['Hymns'],
        summary: 'Busca um hino pelo número',
        description: '`id` é o número do hino impresso no hinário (ex.: 1 = "Antífona"), não um UUID nem um índice de array.',
        params: hymnDetailsParamsSchema,
        response: { 200: hymnDetailsResponseSchema, 404: hymnDetailsErrorSchema },
      },
    },
    async (request, reply) => container.hymnDetailsController.handle(request, reply)
  );
}
