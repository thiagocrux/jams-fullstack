import type { PasswordResetToken as DomainToken } from '../../../domain/entities'
import type { PasswordResetTokenRepository } from '../../../domain/repositories/password-reset-token.repository'
import type {
  PaginatedResult,
  QueryOptions,
} from '../../../domain/types/query-options'
import prisma from '../../../../utils/prisma'

/**
 * Prisma implementation of the PasswordResetToken repository.
 */
export class PrismaPasswordResetTokenRepository
  implements PasswordResetTokenRepository
{
  /**
   * Maps a Prisma token model to a Domain token entity.
   *
   * @param model The Prisma model.
   * @returns The domain entity.
   * @private
   */
  private mapToDomain(model: any): DomainToken {
    return {
      id: model.id,
      token: model.token,
      email: model.email,
      expiresAt: model.expiresAt,
      usedAt: model.usedAt,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    } as DomainToken
  }

  async save(token: DomainToken): Promise<DomainToken> {
    const model = await prisma.passwordResetToken.upsert({
      where: { id: token.id || '' },
      update: {
        token: token.token,
        email: token.email,
        expiresAt: token.expiresAt,
        usedAt: token.usedAt,
        updatedAt: new Date(),
      },
      create: {
        id: token.id,
        token: token.token,
        email: token.email,
        expiresAt: token.expiresAt,
        usedAt: token.usedAt,
      },
    })

    return this.mapToDomain(model)
  }

  async findById(id: string): Promise<DomainToken | null> {
    const model = await prisma.passwordResetToken.findUnique({
      where: { id },
    })

    return model ? this.mapToDomain(model) : null
  }

  async findByToken(token: string): Promise<DomainToken | null> {
    const model = await prisma.passwordResetToken.findUnique({
      where: { token },
    })

    return model ? this.mapToDomain(model) : null
  }

  async findAll(options?: QueryOptions): Promise<PaginatedResult<DomainToken>> {
    const {
      skip,
      take,
      orderBy = 'createdAt',
      orderDir = 'desc',
    } = options || {}

    const [items, total] = await Promise.all([
      prisma.passwordResetToken.findMany({
        skip,
        take,
        orderBy: { [orderBy]: orderDir },
      }),
      prisma.passwordResetToken.count(),
    ])

    return {
      items: items.map((item) => this.mapToDomain(item)),
      total,
    }
  }

  async update(id: string, data: Partial<DomainToken>): Promise<DomainToken> {
    const model = await prisma.passwordResetToken.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    })

    return this.mapToDomain(model)
  }

  async delete(id: string): Promise<void> {
    await prisma.passwordResetToken.delete({
      where: { id },
    })
  }
}
