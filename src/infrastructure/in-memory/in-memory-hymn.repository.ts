import hinosData from '@/data/hinos.json';
import { Hymn } from '@/models';
import { normalizeText } from '@/shared/normalize-text';
import type { HymnFilter, HymnRepositoryPort, Pagination, PaginatedResult } from '@/repositories/hymn-repository.port';

interface IndexedHymn {
  hymn: Hymn;
  normalizedTitle: string;
  normalizedLyrics: string;
}

/**
 * O Cantor Cristão é um catálogo fechado (não muda em runtime), então os 581 hinos
 * são carregados uma vez, com um índice normalizado (sem acento/caixa) pré-computado
 * para a busca — evita normalizar a letra inteira a cada request.
 */
export class InMemoryHymnRepository implements HymnRepositoryPort {
  private readonly index: IndexedHymn[];

  constructor() {
    this.index = (hinosData as { id: number; title: string; lyrics: string }[])
      .map((raw) => {
        const hymn = new Hymn(raw);
        return { hymn, normalizedTitle: normalizeText(hymn.title), normalizedLyrics: normalizeText(hymn.lyrics) };
      })
      .sort((a, b) => a.hymn.id - b.hymn.id);
  }

  async findMany(filter: HymnFilter, pagination: Pagination): Promise<PaginatedResult<Hymn>> {
    const term = filter.search ? normalizeText(filter.search) : undefined;

    const filtered = term
      ? this.index.filter((entry) => entry.normalizedTitle.includes(term) || entry.normalizedLyrics.includes(term))
      : this.index;

    const start = (pagination.page - 1) * pagination.limit;
    const page = filtered.slice(start, start + pagination.limit).map((entry) => entry.hymn);

    return { data: page, total: filtered.length };
  }

  async findById(id: number): Promise<Hymn | null> {
    return this.index.find((entry) => entry.hymn.id === id)?.hymn ?? null;
  }
}
