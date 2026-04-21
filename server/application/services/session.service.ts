import { Session } from '../../domain/entities'
import type { SessionRepository, CandidateRepository } from '../../domain/repositories'
import { NotFoundError } from '../../domain/errors'
import type { QueryOptions, PaginatedResult } from '../../domain/types/query-options'
import type { SessionUseCase } from '../use-cases/session.use-case'

export class DefaultSessionService implements SessionUseCase {
  constructor(
    private sessionRepository: SessionRepository,
    private candidateRepository: CandidateRepository
  ) {}

  async create(data: Omit<Session, 'id' | 'createdAt' | 'updatedAt'>): Promise<Session> {
    const candidate = await this.candidateRepository.findById(data.candidateId)
    if (!candidate) {
      throw new NotFoundError('Candidato não encontrado.')
    }

    const session = new Session(
      crypto.randomUUID(),
      data.candidateId,
      data.expiresAt,
      new Date(),
      null
    )
    return this.sessionRepository.save(session)
  }

  async getById(id: string): Promise<Session> {
    const session = await this.sessionRepository.findById(id)
    if (!session) {
      throw new NotFoundError('Sessão não encontrada.')
    }
    return session
  }

  async listByCandidate(candidateId: string, options?: QueryOptions): Promise<PaginatedResult<Session>> {
    return this.sessionRepository.findByCandidateId(candidateId, options)
  }

  async delete(id: string): Promise<void> {
    const session = await this.sessionRepository.findById(id)
    if (!session) {
      throw new NotFoundError('Sessão não encontrada.')
    }
    await this.sessionRepository.delete(id)
  }

  async clearExpired(candidateId: string): Promise<void> {
    await this.sessionRepository.deleteExpiredByCandidateId(candidateId)
  }
}
