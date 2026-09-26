import { describe, expect, it } from 'vitest';
import { InMemoryHymnRepository } from '@/infrastructure/in-memory/in-memory-hymn.repository';
import { NotFoundError } from '@/shared/errors';
import { HymnDetailsUseCase } from '../hymn-details.usecase';

describe('HymnDetailsUseCase', () => {
  const hymnRepository = new InMemoryHymnRepository();
  const useCase = new HymnDetailsUseCase({ hymnRepository });

  it('retorna o hino pelo número', async () => {
    const hymn = await useCase.execute({ id: 1 });

    expect(hymn.id).toBe(1);
    expect(hymn.title).toBe('ANTÍFONA');
  });

  it('lança NotFoundError quando o número não existe', async () => {
    await expect(useCase.execute({ id: 999999 })).rejects.toThrow(NotFoundError);
  });
});
