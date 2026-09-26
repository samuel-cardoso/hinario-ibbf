import type { z } from 'zod';
import type { FastifyReply, FastifyRequest } from 'fastify';
import type { HymnListUseCase } from './hymn-list.usecase';
import type { hymnListQuerySchema } from './hymn-list.schema';

interface Dependencies {
  hymnListUseCase: HymnListUseCase;
}

export class HymnListController {
  constructor(private readonly dependencies: Dependencies) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const query = request.query as z.infer<typeof hymnListQuerySchema>;

    const result = await this.dependencies.hymnListUseCase.execute(query);

    return reply.status(200).send({
      success: true,
      data: { hymns: result.hymns.map((hymn) => hymn.toJSON()), pagination: result.pagination },
    });
  }
}
