import type { Company as DomainCompany } from '../../../domain/entities'
import type { CompanyRepository } from '../../../domain/repositories/company.repository'
import type {
  PaginatedResult,
  QueryOptions,
} from '../../../domain/types/query-options'
import prisma from '../../../../utils/prisma'

/**
 * Prisma implementation of the Company repository.
 */
export class PrismaCompanyRepository implements CompanyRepository {
  /**
   * Maps a Prisma company model to a Domain company entity.
   *
   * @param model The Prisma model.
   * @returns The domain entity.
   * @private
   */
  private mapToDomain(model: any): DomainCompany {
    return {
      id: model.id,
      name: model.name,
      category: model.category,
      site: model.site,
      linkedin: model.linkedin,
      observations: model.observations,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    } as DomainCompany
  }

  async save(company: DomainCompany): Promise<DomainCompany> {
    const model = await prisma.company.upsert({
      where: { id: company.id || '' },
      update: {
        name: company.name,
        category: company.category,
        site: company.site,
        linkedin: company.linkedin,
        observations: company.observations,
        updatedAt: new Date(),
      },
      create: {
        id: company.id,
        name: company.name,
        category: company.category,
        site: company.site,
        linkedin: company.linkedin,
        observations: company.observations,
      },
    })

    return this.mapToDomain(model)
  }

  async findById(id: string): Promise<DomainCompany | null> {
    const model = await prisma.company.findUnique({
      where: { id },
    })

    return model ? this.mapToDomain(model) : null
  }

  async findAll(options?: QueryOptions): Promise<PaginatedResult<DomainCompany>> {
    const {
      skip,
      take,
      orderBy = 'createdAt',
      orderDir = 'desc',
      search,
    } = options || {}

    const where = search
      ? {
          OR: [
            { name: { contains: search } },
            { site: { contains: search } },
            { observations: { contains: search } },
          ],
        }
      : {}

    const [items, total] = await Promise.all([
      prisma.company.findMany({
        where,
        skip,
        take,
        orderBy: { [orderBy]: orderDir },
      }),
      prisma.company.count({ where }),
    ])

    return {
      items: items.map((item) => this.mapToDomain(item)),
      total,
    }
  }

  async update(id: string, data: Partial<DomainCompany>): Promise<DomainCompany> {
    const model = await prisma.company.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    })

    return this.mapToDomain(model)
  }

  async delete(id: string): Promise<void> {
    await prisma.company.delete({
      where: { id },
    })
  }
}
