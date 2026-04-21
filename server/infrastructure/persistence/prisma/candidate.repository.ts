import type { Candidate as DomainCandidate } from '../../../domain/entities'
import type { CandidateRepository } from '../../../domain/repositories/candidate.repository'
import type {
  PaginatedResult,
  QueryOptions,
} from '../../../domain/types/query-options'
import prisma from '../../../../utils/prisma'

/**
 * Prisma implementation of the Candidate repository.
 */
export class PrismaCandidateRepository implements CandidateRepository {
  /**
   * Maps a Prisma candidate model to a Domain candidate entity.
   *
   * @param model The Prisma model.
   * @returns The domain entity.
   * @private
   */
  private mapToDomain(model: any): DomainCandidate {
    return {
      id: model.id,
      name: model.name,
      email: model.email,
      password: model.password,
      linkedin: model.linkedin,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    } as DomainCandidate
  }

  async save(candidate: DomainCandidate): Promise<DomainCandidate> {
    const model = await prisma.candidate.upsert({
      where: { id: candidate.id || '' },
      update: {
        name: candidate.name,
        email: candidate.email,
        password: candidate.password,
        linkedin: candidate.linkedin,
        updatedAt: new Date(),
      },
      create: {
        id: candidate.id,
        name: candidate.name,
        email: candidate.email,
        password: candidate.password,
        linkedin: candidate.linkedin,
      },
    })

    return this.mapToDomain(model)
  }

  async findById(id: string): Promise<DomainCandidate | null> {
    const model = await prisma.candidate.findUnique({
      where: { id },
    })

    return model ? this.mapToDomain(model) : null
  }

  async findByEmail(email: string): Promise<DomainCandidate | null> {
    const model = await prisma.candidate.findUnique({
      where: { email },
    })

    return model ? this.mapToDomain(model) : null
  }

  async findAll(
    options?: QueryOptions,
  ): Promise<PaginatedResult<DomainCandidate>> {
    const {
      skip,
      take,
      orderBy = 'createdAt',
      orderDir = 'desc',
      search,
    } = options || {}

    const where = search
      ? {
          OR: [{ name: { contains: search } }, { email: { contains: search } }],
        }
      : {}

    const [items, total] = await Promise.all([
      prisma.candidate.findMany({
        where,
        skip,
        take,
        orderBy: { [orderBy]: orderDir },
      }),
      prisma.candidate.count({ where }),
    ])

    return {
      items: items.map((item) => this.mapToDomain(item)),
      total,
    }
  }

  async update(
    id: string,
    data: Partial<DomainCandidate>,
  ): Promise<DomainCandidate> {
    const model = await prisma.candidate.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    })

    return this.mapToDomain(model)
  }

  async delete(id: string): Promise<void> {
    await prisma.candidate.delete({
      where: { id },
    })
  }
}
