import type { Step } from '../../domain/entities'
import type { QueryOptions, PaginatedResult } from '../../domain/types/query-options'

export interface StepUseCase {
  create(data: Omit<Step, 'id' | 'createdAt' | 'updatedAt'>): Promise<Step>
  getById(id: string): Promise<Step>
  listByApplication(applicationId: string, options?: QueryOptions): Promise<PaginatedResult<Step>>
  update(id: string, data: Partial<Step>): Promise<Step>
  delete(id: string): Promise<void>
}
