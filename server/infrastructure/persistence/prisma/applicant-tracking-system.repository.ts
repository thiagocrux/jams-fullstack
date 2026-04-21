import type { ApplicantTrackingSystem as DomainATS } from '../../../domain/entities'
import type { ApplicantTrackingSystemRepository } from '../../../domain/repositories/applicant-tracking-system.repository'
import type {
  PaginatedResult,
  QueryOptions,
} from '../../../domain/types/query-options'
import prisma from '../../../../utils/prisma'

/**
 * Prisma implementation of the Applicant Tracking System repository.
 */
export class PrismaApplicantTrackingSystemRepository
  implements ApplicantTrackingSystemRepository
{
  /**
   * Maps a Prisma ATS model to a Domain ATS entity.
   *
   * @param model The Prisma model.
   * @returns The domain entity.
   * @private
   */
  private mapToDomain(model: any): DomainATS {
    return {
      id: model.id,
      name: model.name,
      site: model.site,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    } as DomainATS
  }

  async save(ats: DomainATS): Promise<DomainATS> {
    const model = await prisma.applicantTrackingSystem.upsert({
      where: { id: ats.id || '' },
      update: {
        name: ats.name,
        site: ats.site,
        updatedAt: new Date(),
      },
      create: {
        id: ats.id,
        name: ats.name,
        site: ats.site,
      },
    })

    return this.mapToDomain(model)
  }

  async findById(id: string): Promise<DomainATS | null> {
    const model = await prisma.applicantTrackingSystem.findUnique({
      where: { id },
    })

    return model ? this.mapToDomain(model) : null
  }

  async findAll(options?: QueryOptions): Promise<PaginatedResult<DomainATS>> {
    const {
      skip,
      take,
      orderBy = 'name',
      orderDir = 'asc',
      search,
    } = options || {}

    const where = search
      ? {
          OR: [{ name: { contains: search } }, { site: { contains: search } }],
        }
      : {}

    const [items, total] = await Promise.all([
      prisma.applicantTrackingSystem.findMany({
        where,
        skip,
        take,
        orderBy: { [orderBy]: orderDir },
      }),
      prisma.applicantTrackingSystem.count({ where }),
    ])

    return {
      items: items.map((item) => this.mapToDomain(item)),
      total,
    }
  }

  async update(id: string, data: Partial<DomainATS>): Promise<DomainATS> {
    const model = await prisma.applicantTrackingSystem.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    })

    return this.mapToDomain(model)
  }

  async delete(id: string): Promise<void> {
    await prisma.applicantTrackingSystem.delete({
      where: { id },
    })
  }
}
