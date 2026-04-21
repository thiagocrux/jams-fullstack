import { Feedback } from '../../domain/entities'
import type { FeedbackRepository, StepRepository } from '../../domain/repositories'
import { NotFoundError } from '../../domain/errors'
import type { QueryOptions, PaginatedResult } from '../../domain/types/query-options'
import type { FeedbackUseCase } from '../use-cases/feedback.use-case'

export class DefaultFeedbackService implements FeedbackUseCase {
  constructor(
    private feedbackRepository: FeedbackRepository,
    private stepRepository: StepRepository
  ) {}

  async create(data: Omit<Feedback, 'id' | 'createdAt' | 'updatedAt'>): Promise<Feedback> {
    const step = await this.stepRepository.findById(data.stepId)
    if (!step) {
      throw new NotFoundError('Etapa não encontrado.')
    }

    const feedback = new Feedback(
      crypto.randomUUID(),
      data.stepId,
      data.title,
      data.content,
      data.senderName,
      data.senderEmail,
      data.senderLinkedin,
      data.interactionType,
      data.status,
      new Date(),
      null
    )
    return this.feedbackRepository.save(feedback)
  }

  async getById(id: string): Promise<Feedback> {
    const feedback = await this.feedbackRepository.findById(id)
    if (!feedback) {
      throw new NotFoundError('Feedback não encontrado.')
    }
    return feedback
  }

  async listByStep(stepId: string, options?: QueryOptions): Promise<PaginatedResult<Feedback>> {
    return this.feedbackRepository.findByStepId(stepId, options)
  }

  async update(id: string, data: Partial<Feedback>): Promise<Feedback> {
    const feedback = await this.feedbackRepository.findById(id)
    if (!feedback) {
      throw new NotFoundError('Feedback não encontrado.')
    }
    return this.feedbackRepository.update(id, data)
  }

  async delete(id: string): Promise<void> {
    const feedback = await this.feedbackRepository.findById(id)
    if (!feedback) {
      throw new NotFoundError('Feedback não encontrado.')
    }
    await this.feedbackRepository.delete(id)
  }
}
