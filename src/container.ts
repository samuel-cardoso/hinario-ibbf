import { InMemoryHymnRepository } from './infrastructure/in-memory/in-memory-hymn.repository';

import { HealthCheckUseCase } from './usecases/system/health-check/health-check.usecase';
import { HealthCheckController } from './usecases/system/health-check/health-check.controller';

import { HymnListUseCase } from './usecases/hymn/hymn-list/hymn-list.usecase';
import { HymnListController } from './usecases/hymn/hymn-list/hymn-list.controller';
import { HymnDetailsUseCase } from './usecases/hymn/hymn-details/hymn-details.usecase';
import { HymnDetailsController } from './usecases/hymn/hymn-details/hymn-details.controller';

/**
 * Sem Awilix/Prisma aqui: o único "repositório" é o catálogo de hinos em memória,
 * então a composição manual de dependências é mais simples que um container de DI.
 */
const hymnRepository = new InMemoryHymnRepository();

const healthCheckUseCase = new HealthCheckUseCase();
const hymnListUseCase = new HymnListUseCase({ hymnRepository });
const hymnDetailsUseCase = new HymnDetailsUseCase({ hymnRepository });

export const container = {
  healthCheckController: new HealthCheckController({ healthCheckUseCase }),
  hymnListController: new HymnListController({ hymnListUseCase }),
  hymnDetailsController: new HymnDetailsController({ hymnDetailsUseCase }),
};
