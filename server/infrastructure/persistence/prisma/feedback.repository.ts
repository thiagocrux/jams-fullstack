import prisma from '../../../../utils/prisma'
import type { Feedback as DomainFeedback } from '../../../domain/entities'
import type { FeedbackRepository } from '../../../domain/repositories/feedback.repository'
import type {
  PaginatedResult,
  QueryOptions,
} from '../../../domain/types/query-options'

/**
 * Prisma implementation of the Feedback repository.
 */
export class PrismaFeedbackRepository implements FeedbackRepository {
  /**
   * Maps a Prisma feedback model to a Domain feedback entity.
   *
   * @param model The Prisma model.
   * @returns The domain entity.
   * @private
   */
  private mapToDomain(model: any): DomainFeedback {
    return {
      id: model.id,
      stepId: model.stepId,
      title: model.title,
      content: model.content,
      senderName: model.senderName,
      senderEmail: model.senderEmail,
      senderLinkedin: model.senderLinkedin,
      interactionType: model.interactionType,
      status: model.status,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    } as DomainFeedback
  }

  async save(feedback: DomainFeedback): Promise<DomainFeedback> {
    const model = await prisma.feedback.upsert({
      where: { id: feedback.id || '' },
      update: {
        ...feedback,
        updatedAt: new Date(),
      },
      create: {
        ...feedback,
      },
    })

    return this.mapToDomain(model)
  }

  async findById(id: string): Promise<DomainFeedback | null> {
    const model = await prisma.feedback.findUnique({
      where: { id },
    })

    return model ? this.mapToDomain(model) : null
  }

  async findByStepId(
    stepId: string,
    options?: QueryOptions
  ): Promise<PaginatedResult<DomainFeedback>> {
    const {
      skip,
      take,
      orderBy = 'createdAt',
      orderDir = 'desc',
      search,
    } = options || {}

    const where = {
      stepId,
      ...(search
        ? {
            OR: [
              { title: { contains: search } },
              { content: { contains: search } },
            ],
          }
        : {}),
    }

    const [items, total] = await Promise.all([
      prisma.feedback.findMany({
        where,
        skip,
        take,
        orderBy: { [orderBy]: orderDir },
      }),
      prisma.feedback.count({ where }),
    ])

    return {
      items: items.map((item) => this.mapToDomain(item)),
      total,
    }
  }

  async update(
    id: string,
    data: Partial<DomainFeedback>
  ): Promise<DomainFeedback> {
    const model = await prisma.feedback.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    })

    return this.mapToDomain(model)
  }

  async delete(id: string): Promise<void> {
    await prisma.feedback.delete({
      where: { id },
    })
  }
}
