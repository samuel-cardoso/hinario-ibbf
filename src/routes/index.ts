import type { FastifyInstance } from 'fastify';
import { systemRoutes } from './system/system-router.factory';
import { hymnRoutes } from './hymn/hymn-router.factory';

export async function registerRoutes(server: FastifyInstance) {
  await server.register(systemRoutes);
  await server.register(hymnRoutes, { prefix: '/hymns' });
}
