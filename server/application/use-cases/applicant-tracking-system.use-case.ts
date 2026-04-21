import type { ApplicantTrackingSystem } from '../../domain/entities'
import type { QueryOptions, PaginatedResult } from '../../domain/types/query-options'

export interface ApplicantTrackingSystemUseCase {
  create(data: Omit<ApplicantTrackingSystem, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApplicantTrackingSystem>
  getById(id: string): Promise<ApplicantTrackingSystem>
  listAll(options?: QueryOptions): Promise<PaginatedResult<ApplicantTrackingSystem>>
  update(id: string, data: Partial<ApplicantTrackingSystem>): Promise<ApplicantTrackingSystem>
  delete(id: string): Promise<void>
}
