import type { Session as DomainSession } from '../../../domain/entities'
import type { SessionRepository } from '../../../domain/repositories/session.repository'
import type {
  PaginatedResult,
  QueryOptions,
} from '../../../domain/types/query-options'
import prisma from '../../../../utils/prisma'

/**
 * Prisma implementation of the Session repository.
 */
export class PrismaSessionRepository implements SessionRepository {
  /**
   * Maps a Prisma session model to a Domain session entity.
   *
   * @param model The Prisma model.
   * @returns The domain entity.
   * @private
   */
  private mapToDomain(model: any): DomainSession {
    return {
      id: model.id,
      candidateId: model.candidateId,
      expiresAt: model.expiresAt,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    } as DomainSession
  }

  async save(session: DomainSession): Promise<DomainSession> {
    const model = await prisma.session.upsert({
      where: { id: session.id || '' },
      update: {
        expiresAt: session.expiresAt,
        updatedAt: new Date(),
      },
      create: {
        id: session.id,
        candidateId: session.candidateId,
        expiresAt: session.expiresAt,
      },
    })

    return this.mapToDomain(model)
  }

  async findById(id: string): Promise<DomainSession | null> {
    const model = await prisma.session.findUnique({
      where: { id },
    })

    return model ? this.mapToDomain(model) : null
  }

  async findByCandidateId(
    candidateId: string,
    options?: QueryOptions,
  ): Promise<PaginatedResult<DomainSession>> {
    const { skip, take, orderBy = 'createdAt', orderDir = 'desc' } = options || {}

    const where = { candidateId }

    const [items, total] = await Promise.all([
      prisma.session.findMany({
        where,
        skip,
        take,
        orderBy: { [orderBy]: orderDir },
      }),
      prisma.session.count({ where }),
    ])

    return {
      items: items.map((item) => this.mapToDomain(item)),
      total,
    }
  }

  async delete(id: string): Promise<void> {
    await prisma.session.delete({
      where: { id },
    })
  }

  async deleteExpiredByCandidateId(candidateId: string): Promise<void> {
    await prisma.session.deleteMany({
      where: {
        candidateId,
        expiresAt: {
          lt: new Date(),
        },
      },
    })
  }
}
