import cors from '@fastify/cors';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import fastify, { type FastifyError } from 'fastify';
import { jsonSchemaTransform, serializerCompiler, validatorCompiler, ZodTypeProvider } from 'fastify-type-provider-zod';
import { registerRoutes } from './routes';
import { NotFoundError } from './shared/errors';

function isFastifyError(error: unknown): error is FastifyError {
  return error instanceof Error && 'code' in error && typeof (error as FastifyError).code === 'string';
}

export async function createServer() {
  const server = fastify({ logger: { level: process.env.LOG_LEVEL ?? 'info' } }).withTypeProvider<ZodTypeProvider>();
  server.setValidatorCompiler(validatorCompiler);
  server.setSerializerCompiler(serializerCompiler);

  await server.register(cors, { origin: process.env.WEB_ORIGIN ?? true });

  await server.register(swagger, {
    openapi: {
      info: {
        title: 'Hinário IBBF API',
        version: '0.1.0',
        description:
          'API pública e somente-leitura que serve o catálogo do **Cantor Cristão** (581 hinos) para o ' +
          'front da Plataforma IBBF. Não requer autenticação — os hinos são conteúdo público do hinário.\n\n' +
          '### Catálogo\n' +
          'O catálogo é estático (carregado em memória a partir de um JSON no build), então `id` é sempre o ' +
          'número do hino impresso no hinário (1 a 581), estável entre deploys.\n\n' +
          '### Formato de resposta\n' +
          'Sucesso: `{ "success": true, "data": {...} }`. Erro: `{ "success": false, "code": "ALGUM_CODE", "message": "..." }` ' +
          '— o `code` é estável e feito para ser tratado programaticamente pelo cliente; a `message` é só para humanos.\n\n' +
          '### Busca\n' +
          'O parâmetro `search` de `GET /hymns` faz um "contains" case/acento-insensível no título e na letra — ' +
          'não é full-text search nem aceita operadores.',
      },
      tags: [
        { name: 'System', description: 'Endpoints públicos de infraestrutura (health check).' },
        { name: 'Hymns', description: 'Consulta e busca dos hinos do Cantor Cristão.' },
      ],
    },
    transform: jsonSchemaTransform,
  });
  await server.register(swaggerUi, {
    routePrefix: '/docs',
    uiConfig: { docExpansion: 'list', deepLinking: true },
  });

  server.setErrorHandler((error, request, reply) => {
    if (error instanceof NotFoundError) {
      return reply.status(404).send({ success: false, code: 'NOT_FOUND', message: error.message });
    }
    if (isFastifyError(error) && error.code === 'FST_ERR_VALIDATION') {
      return reply.status(400).send({ success: false, code: 'VALIDATION_ERROR', message: error.message });
    }
    request.log.error(error);
    return reply.status(500).send({ success: false, code: 'INTERNAL_ERROR', message: 'Erro interno do servidor' });
  });

  await registerRoutes(server);
  return server;
}
