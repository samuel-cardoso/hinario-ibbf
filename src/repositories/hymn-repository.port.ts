import type { Hymn } from '@/models';

export interface HymnFilter {
  /** Busca case/acento-insensível por substring no título ou na letra. */
  search?: string;
}

export interface Pagination {
  page: number;
  limit: number;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
}

export interface HymnRepositoryPort {
  findMany(filter: HymnFilter, pagination: Pagination): Promise<PaginatedResult<Hymn>>;
  findById(id: number): Promise<Hymn | null>;
}
