import { Application } from '../../domain/entities'
import type {
  ApplicationRepository,
  CandidateRepository,
  CompanyRepository,
  ApplicantTrackingSystemRepository,
} from '../../domain/repositories'
import { NotFoundError } from '../../domain/errors'
import type { QueryOptions, PaginatedResult } from '../../domain/types/query-options'
import type { ApplicationUseCase } from '../use-cases/application.use-case'

/**
 * Default implementation for application use cases.
 */
export class DefaultApplicationService implements ApplicationUseCase {
  constructor(
    private applicationRepository: ApplicationRepository,
    private candidateRepository: CandidateRepository,
    private companyRepository: CompanyRepository,
    private atsRepository: ApplicantTrackingSystemRepository
  ) {}

  async create(data: Omit<Application, 'id' | 'createdAt' | 'updatedAt'>): Promise<Application> {
    const [candidate, company, ats] = await Promise.all([
      this.candidateRepository.findById(data.candidateId),
      this.companyRepository.findById(data.companyId),
      this.atsRepository.findById(data.applicantTrackingSystemId),
    ])

    if (!candidate) {
      throw new NotFoundError('Candidato não encontrado.')
    }
    if (!company) {
      throw new NotFoundError('Empresa não encontrada.')
    }
    if (!ats) {
      throw new NotFoundError('ATS não encontrado.')
    }

    const application = new Application(
      crypto.randomUUID(),
      data.candidateId,
      data.position,
      data.companyId,
      data.applicationDate || new Date(),
      data.status,
      data.priority,
      data.seniorityLevel,
      data.workModel,
      data.contractType,
      data.applicantTrackingSystemId,
      data.source,
      data.jobPostingLink,
      data.jobDescription,
      data.salaryInformation,
      data.salaryOffer,
      data.agreedFollowupDate,
      data.completionDate,
      data.ghosted,
      data.hrLinkedin,
      data.hrObservations,
      data.leaderLinkedin,
      data.leaderObservations,
      data.hiredCompetitorLinkedin,
      data.hiredCompetitorAnalysis,
      data.improvementIdeas,
      data.generalNotes,
      new Date(),
      null
    )

    return this.applicationRepository.save(application)
  }

  async getById(id: string): Promise<Application> {
    const application = await this.applicationRepository.findById(id)
    if (!application) {
      throw new NotFoundError('Candidatura não encontrado.')
    }
    return application
  }

  async listByCandidate(candidateId: string, options?: QueryOptions): Promise<PaginatedResult<Application>> {
    return this.applicationRepository.findByCandidateId(candidateId, options)
  }

  async update(id: string, data: Partial<Application>): Promise<Application> {
    const application = await this.applicationRepository.findById(id)
    if (!application) {
      throw new NotFoundError('Candidatura não encontrado.')
    }

    if (data.companyId) {
      const company = await this.companyRepository.findById(data.companyId)
      if (!company) {
        throw new NotFoundError('Empresa não encontrada.')
      }
    }

    if (data.applicantTrackingSystemId) {
      const ats = await this.atsRepository.findById(data.applicantTrackingSystemId)
      if (!ats) {
        throw new NotFoundError('ATS não encontrado.')
      }
    }

    return this.applicationRepository.update(id, data)
  }

  async delete(id: string): Promise<void> {
    const application = await this.applicationRepository.findById(id)
    if (!application) {
      throw new NotFoundError('Candidatura não encontrado.')
    }
    await this.applicationRepository.delete(id)
  }
}
