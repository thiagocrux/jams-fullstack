import type { Company } from '../../domain/entities'
import type { QueryOptions, PaginatedResult } from '../../domain/types/query-options'

/**
 * Boundary interface for company use cases.
 */
export interface CompanyUseCase {
  create(data: Omit<Company, 'id' | 'createdAt' | 'updatedAt'>): Promise<Company>
  getById(id: string): Promise<Company>
  listAll(options?: QueryOptions): Promise<PaginatedResult<Company>>
  update(id: string, data: Partial<Company>): Promise<Company>
  delete(id: string): Promise<void>
}
