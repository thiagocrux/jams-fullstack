import { ApplicantTrackingSystem } from '../../domain/entities'
import type { ApplicantTrackingSystemRepository } from '../../domain/repositories'
import { NotFoundError } from '../../domain/errors'
import type { QueryOptions, PaginatedResult } from '../../domain/types/query-options'
import type { ApplicantTrackingSystemUseCase } from '../use-cases/applicant-tracking-system.use-case'

export class DefaultApplicantTrackingSystemService implements ApplicantTrackingSystemUseCase {
  constructor(private atsRepository: ApplicantTrackingSystemRepository) {}

  async create(data: Omit<ApplicantTrackingSystem, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApplicantTrackingSystem> {
    const ats = new ApplicantTrackingSystem(
      crypto.randomUUID(),
      data.name,
      data.site,
      new Date(),
      null
    )
    return this.atsRepository.save(ats)
  }

  async getById(id: string): Promise<ApplicantTrackingSystem> {
    const ats = await this.atsRepository.findById(id)
    if (!ats) {
      throw new NotFoundError('ATS não encontrado.')
    }
    return ats
  }

  async listAll(options?: QueryOptions): Promise<PaginatedResult<ApplicantTrackingSystem>> {
    return this.atsRepository.findAll(options)
  }

  async update(id: string, data: Partial<ApplicantTrackingSystem>): Promise<ApplicantTrackingSystem> {
    const ats = await this.atsRepository.findById(id)
    if (!ats) {
      throw new NotFoundError('ATS não encontrado.')
    }
    return this.atsRepository.update(id, data)
  }

  async delete(id: string): Promise<void> {
    const ats = await this.atsRepository.findById(id)
    if (!ats) {
      throw new NotFoundError('ATS não encontrado.')
    }
    await this.atsRepository.delete(id)
  }
}
