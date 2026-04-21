import { Candidate } from '../../domain/entities'
import type { CandidateRepository } from '../../domain/repositories'
import { ConflictError, NotFoundError } from '../../domain/errors'
import type { QueryOptions, PaginatedResult } from '../../domain/types/query-options'
import type { CandidateUseCase } from '../use-cases/candidate.use-case'

/**
 * Default implementation for candidate use cases.
 */
export class DefaultCandidateService implements CandidateUseCase {
  constructor(private candidateRepository: CandidateRepository) {}

  async create(data: Omit<Candidate, 'id' | 'createdAt' | 'updatedAt'>): Promise<Candidate> {
    const existing = await this.candidateRepository.findByEmail(data.email)
    if (existing) {
      throw new ConflictError('Este e-mail já está em uso.')
    }

    const candidate = new Candidate(
      crypto.randomUUID(),
      data.name,
      data.email,
      data.password,
      data.linkedin,
      new Date(),
      null
    )

    return this.candidateRepository.save(candidate)
  }

  async getById(id: string): Promise<Candidate> {
    const candidate = await this.candidateRepository.findById(id)
    if (!candidate) {
      throw new NotFoundError('Candidato não encontrado.')
    }
    return candidate
  }

  async listAll(options?: QueryOptions): Promise<PaginatedResult<Candidate>> {
    return this.candidateRepository.findAll(options)
  }

  async update(id: string, data: Partial<Candidate>): Promise<Candidate> {
    const candidate = await this.candidateRepository.findById(id)
    if (!candidate) {
      throw new NotFoundError('Candidato não encontrado.')
    }

    if (data.email && data.email !== candidate.email) {
      const existing = await this.candidateRepository.findByEmail(data.email)
      if (existing) {
        throw new ConflictError('Este e-mail já está em uso.')
      }
    }

    return this.candidateRepository.update(id, data)
  }

  async delete(id: string): Promise<void> {
    const candidate = await this.candidateRepository.findById(id)
    if (!candidate) {
      throw new NotFoundError('Candidato não encontrado.')
    }
    await this.candidateRepository.delete(id)
  }
}
