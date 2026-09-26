import type { z } from 'zod';
import type { FastifyReply, FastifyRequest } from 'fastify';
import type { HymnDetailsUseCase } from './hymn-details.usecase';
import type { hymnDetailsParamsSchema } from './hymn-details.schema';

interface Dependencies {
  hymnDetailsUseCase: HymnDetailsUseCase;
}

export class HymnDetailsController {
  constructor(private readonly dependencies: Dependencies) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const params = request.params as z.infer<typeof hymnDetailsParamsSchema>;

    const hymn = await this.dependencies.hymnDetailsUseCase.execute(params);

    return reply.status(200).send({ success: true, data: { hymn: hymn.toJSON() } });
  }
}
