import type { Session } from '../../domain/entities'
import type { QueryOptions, PaginatedResult } from '../../domain/types/query-options'

export interface SessionUseCase {
  create(data: Omit<Session, 'id' | 'createdAt' | 'updatedAt'>): Promise<Session>
  getById(id: string): Promise<Session>
  listByCandidate(candidateId: string, options?: QueryOptions): Promise<PaginatedResult<Session>>
  delete(id: string): Promise<void>
  clearExpired(candidateId: string): Promise<void>
}
