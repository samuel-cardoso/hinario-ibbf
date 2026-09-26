import { NotFoundError } from '@/shared/errors';
import type { HymnRepositoryPort } from '@/repositories';
import type { HymnDetailsInput } from './hymn-details.dto';

interface Dependencies {
  hymnRepository: HymnRepositoryPort;
}

export class HymnDetailsUseCase {
  constructor(private readonly dependencies: Dependencies) {}

  async execute(input: HymnDetailsInput) {
    const hymn = await this.dependencies.hymnRepository.findById(input.id);

    if (!hymn) {
      throw new NotFoundError('Hino');
    }

    return hymn;
  }
}
