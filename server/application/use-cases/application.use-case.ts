import type { Application } from '../../domain/entities'
import type { QueryOptions, PaginatedResult } from '../../domain/types/query-options'

/**
 * Boundary interface for application use cases.
 */
export interface ApplicationUseCase {
  create(data: Omit<Application, 'id' | 'createdAt' | 'updatedAt'>): Promise<Application>
  getById(id: string): Promise<Application>
  listByCandidate(candidateId: string, options?: QueryOptions): Promise<PaginatedResult<Application>>
  update(id: string, data: Partial<Application>): Promise<Application>
  delete(id: string): Promise<void>
}
