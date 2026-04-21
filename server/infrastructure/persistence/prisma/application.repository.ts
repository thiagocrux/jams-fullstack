import type { Application as DomainApplication } from '../../../domain/entities'
import type { ApplicationRepository } from '../../../domain/repositories/application.repository'
import type {
  PaginatedResult,
  QueryOptions,
} from '../../../domain/types/query-options'
import prisma from '../../../../utils/prisma'

/**
 * Prisma implementation of the Application repository.
 */
export class PrismaApplicationRepository implements ApplicationRepository {
  /**
   * Maps a Prisma application model to a Domain application entity.
   *
   * @param model The Prisma model.
   * @returns The domain entity.
   * @private
   */
  private mapToDomain(model: any): DomainApplication {
    return {
      id: model.id,
      candidateId: model.candidateId,
      position: model.position,
      companyId: model.companyId,
      applicationDate: model.applicationDate,
      status: model.status,
      priority: model.priority,
      seniorityLevel: model.seniorityLevel,
      workModel: model.workModel,
      contractType: model.contractType,
      applicantTrackingSystemId: model.applicantTrackingSystemId,
      source: model.source,
      jobPostingLink: model.jobPostingLink,
      jobDescription: model.jobDescription,
      salaryInformation: model.salaryInformation,
      salaryOffer: Number(model.salaryOffer),
      agreedFollowupDate: model.agreedFollowupDate,
      completionDate: model.completionDate,
      ghosted: model.ghosted,
      hrLinkedin: model.hrLinkedin,
      hrObservations: model.hrObservations,
      leaderLinkedin: model.leaderLinkedin,
      leaderObservations: model.leaderObservations,
      hiredCompetitorLinkedin: model.hiredCompetitorLinkedin,
      hiredCompetitorAnalysis: model.hiredCompetitorAnalysis,
      improvementIdeas: model.improvementIdeas,
      generalNotes: model.generalNotes,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    } as DomainApplication
  }

  async save(application: DomainApplication): Promise<DomainApplication> {
    const model = await prisma.application.upsert({
      where: { id: application.id || '' },
      update: {
        ...application,
        salaryOffer: application.salaryOffer.toString(),
        updatedAt: new Date(),
      },
      create: {
        ...application,
        salaryOffer: application.salaryOffer.toString(),
      },
    })

    return this.mapToDomain(model)
  }

  async findById(id: string): Promise<DomainApplication | null> {
    const model = await prisma.application.findUnique({
      where: { id },
    })

    return model ? this.mapToDomain(model) : null
  }

  async findByCandidateId(
    candidateId: string,
    options?: QueryOptions,
  ): Promise<PaginatedResult<DomainApplication>> {
    const {
      skip,
      take,
      orderBy = 'applicationDate',
      orderDir = 'desc',
      search,
    } = options || {}

    const where = {
      candidateId,
      ...(search
        ? {
            OR: [
              { position: { contains: search } },
              { jobDescription: { contains: search } },
              { generalNotes: { contains: search } },
            ],
          }
        : {}),
    }

    const [items, total] = await Promise.all([
      prisma.application.findMany({
        where,
        skip,
        take,
        orderBy: { [orderBy]: orderDir },
      }),
      prisma.application.count({ where }),
    ])

    return {
      items: items.map((item) => this.mapToDomain(item)),
      total,
    }
  }

  async findAll(options?: QueryOptions): Promise<PaginatedResult<DomainApplication>> {
    const {
      skip,
      take,
      orderBy = 'applicationDate',
      orderDir = 'desc',
      search,
    } = options || {}

    const where = search
      ? {
          OR: [
            { position: { contains: search } },
            { jobDescription: { contains: search } },
          ],
        }
      : {}

    const [items, total] = await Promise.all([
      prisma.application.findMany({
        where,
        skip,
        take,
        orderBy: { [orderBy]: orderDir },
      }),
      prisma.application.count({ where }),
    ])

    return {
      items: items.map((item) => this.mapToDomain(item)),
      total,
    }
  }

  async update(id: string, data: Partial<DomainApplication>): Promise<DomainApplication> {
    const updateData: any = { ...data }
    if (data.salaryOffer !== undefined) {
      updateData.salaryOffer = data.salaryOffer.toString()
    }

    const model = await prisma.application.update({
      where: { id },
      data: {
        ...updateData,
        updatedAt: new Date(),
      },
    })

    return this.mapToDomain(model)
  }

  async delete(id: string): Promise<void> {
    await prisma.application.delete({
      where: { id },
    })
  }
}
