import { Step } from '../../domain/entities'
import type { StepRepository, ApplicationRepository } from '../../domain/repositories'
import { NotFoundError } from '../../domain/errors'
import type { QueryOptions, PaginatedResult } from '../../domain/types/query-options'
import type { StepUseCase } from '../use-cases/step.use-case'

export class DefaultStepService implements StepUseCase {
  constructor(
    private stepRepository: StepRepository,
    private applicationRepository: ApplicationRepository
  ) {}

  async create(data: Omit<Step, 'id' | 'createdAt' | 'updatedAt'>): Promise<Step> {
    const application = await this.applicationRepository.findById(data.applicationId)
    if (!application) {
      throw new NotFoundError('Candidatura não encontrado.')
    }

    const step = new Step(
      crypto.randomUUID(),
      data.applicationId,
      data.name,
      data.description,
      data.status,
      data.startedAt,
      data.finishedAt,
      data.observations,
      data.organizerContact,
      new Date(),
      null
    )
    return this.stepRepository.save(step)
  }

  async getById(id: string): Promise<Step> {
    const step = await this.stepRepository.findById(id)
    if (!step) {
      throw new NotFoundError('Etapa não encontrado.')
    }
    return step
  }

  async listByApplication(applicationId: string, options?: QueryOptions): Promise<PaginatedResult<Step>> {
    return this.stepRepository.findByApplicationId(applicationId, options)
  }

  async update(id: string, data: Partial<Step>): Promise<Step> {
    const step = await this.stepRepository.findById(id)
    if (!step) {
      throw new NotFoundError('Etapa não encontrado.')
    }
    return this.stepRepository.update(id, data)
  }

  async delete(id: string): Promise<void> {
    const step = await this.stepRepository.findById(id)
    if (!step) {
      throw new NotFoundError('Etapa não encontrado.')
    }
    await this.stepRepository.delete(id)
  }
}
