import { describe, expect, it } from 'vitest';
import { InMemoryHymnRepository } from '@/infrastructure/in-memory/in-memory-hymn.repository';
import { HymnListUseCase } from '../hymn-list.usecase';

describe('HymnListUseCase', () => {
  const hymnRepository = new InMemoryHymnRepository();
  const useCase = new HymnListUseCase({ hymnRepository });

  it('lista hinos paginados com os defaults', async () => {
    const result = await useCase.execute({});

    expect(result.hymns).toHaveLength(20);
    expect(result.pagination).toMatchObject({ page: 1, limit: 20 });
    expect(result.pagination.total).toBeGreaterThan(500);
  });

  it('busca por trecho do título ignorando acento e caixa', async () => {
    const result = await useCase.execute({ search: 'justo es senhor' });

    expect(result.hymns.some((hymn) => hymn.title.includes('JUSTO ÉS SENHOR'))).toBe(true);
  });

  it('busca por trecho da letra', async () => {
    const result = await useCase.execute({ search: 'aleluia' });

    expect(result.pagination.total).toBeGreaterThan(0);
    expect(result.hymns.every((hymn) => hymn.lyrics.toLowerCase().includes('aleluia'))).toBe(true);
  });

  it('retorna vazio quando nada casa com a busca', async () => {
    const result = await useCase.execute({ search: 'xyzxyzxyz-inexistente' });

    expect(result.hymns).toHaveLength(0);
    expect(result.pagination.total).toBe(0);
  });
});
