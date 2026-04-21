import type { Step as DomainStep } from '../../../domain/entities'
import type { StepRepository } from '../../../domain/repositories/step.repository'
import type {
  PaginatedResult,
  QueryOptions,
} from '../../../domain/types/query-options'
import prisma from '../../../../utils/prisma'

/**
 * Prisma implementation of the Step repository.
 */
export class PrismaStepRepository implements StepRepository {
  /**
   * Maps a Prisma step model to a Domain step entity.
   *
   * @param model The Prisma model.
   * @returns The domain entity.
   * @private
   */
  private mapToDomain(model: any): DomainStep {
    return {
      id: model.id,
      applicationId: model.applicationId,
      name: model.name,
      description: model.description,
      status: model.status,
      startedAt: model.startedAt,
      finishedAt: model.finishedAt,
      observations: model.observations,
      organizerContact: model.organizerContact,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    } as DomainStep
  }

  async save(step: DomainStep): Promise<DomainStep> {
    const model = await prisma.step.upsert({
      where: { id: step.id || '' },
      update: {
        ...step,
        updatedAt: new Date(),
      },
      create: {
        ...step,
      },
    })

    return this.mapToDomain(model)
  }

  async findById(id: string): Promise<DomainStep | null> {
    const model = await prisma.step.findUnique({
      where: { id },
    })

    return model ? this.mapToDomain(model) : null
  }

  async findByApplicationId(
    applicationId: string,
    options?: QueryOptions,
  ): Promise<PaginatedResult<DomainStep>> {
    const {
      skip,
      take,
      orderBy = 'createdAt',
      orderDir = 'asc',
      search,
    } = options || {}

    const where = {
      applicationId,
      ...(search
        ? {
            OR: [
              { name: { contains: search } },
              { description: { contains: search } },
            ],
          }
        : {}),
    }

    const [items, total] = await Promise.all([
      prisma.step.findMany({
        where,
        skip,
        take,
        orderBy: { [orderBy]: orderDir },
      }),
      prisma.step.count({ where }),
    ])

    return {
      items: items.map((item) => this.mapToDomain(item)),
      total,
    }
  }

  async update(id: string, data: Partial<DomainStep>): Promise<DomainStep> {
    const model = await prisma.step.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    })

    return this.mapToDomain(model)
  }

  async delete(id: string): Promise<void> {
    await prisma.step.delete({
      where: { id },
    })
  }
}
