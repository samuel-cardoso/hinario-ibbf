import type { HymnRepositoryPort } from '@/repositories';
import { PAGINATION } from '@/shared/constants';
import type { HymnListInput } from './hymn-list.dto';

interface Dependencies {
  hymnRepository: HymnRepositoryPort;
}

export class HymnListUseCase {
  constructor(private readonly dependencies: Dependencies) {}

  async execute(input: HymnListInput) {
    const page = input.page ?? PAGINATION.DEFAULT_PAGE;
    const limit = input.limit ?? PAGINATION.DEFAULT_LIMIT;

    const result = await this.dependencies.hymnRepository.findMany({ search: input.search }, { page, limit });
    const totalPages = Math.ceil(result.total / limit);

    return { hymns: result.data, pagination: { total: result.total, page, limit, totalPages } };
  }
}
