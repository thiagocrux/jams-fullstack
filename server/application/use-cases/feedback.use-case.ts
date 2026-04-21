import type { Feedback } from '../../domain/entities'
import type { QueryOptions, PaginatedResult } from '../../domain/types/query-options'

export interface FeedbackUseCase {
  create(data: Omit<Feedback, 'id' | 'createdAt' | 'updatedAt'>): Promise<Feedback>
  getById(id: string): Promise<Feedback>
  listByStep(stepId: string, options?: QueryOptions): Promise<PaginatedResult<Feedback>>
  update(id: string, data: Partial<Feedback>): Promise<Feedback>
  delete(id: string): Promise<void>
}
