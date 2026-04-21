import { Company } from '../../domain/entities'
import type { CompanyRepository } from '../../domain/repositories'
import { NotFoundError } from '../../domain/errors'
import type { QueryOptions, PaginatedResult } from '../../domain/types/query-options'
import type { CompanyUseCase } from '../use-cases/company.use-case'

/**
 * Default implementation for company use cases.
 */
export class DefaultCompanyService implements CompanyUseCase {
  constructor(private companyRepository: CompanyRepository) {}

  async create(data: Omit<Company, 'id' | 'createdAt' | 'updatedAt'>): Promise<Company> {
    const company = new Company(
      crypto.randomUUID(),
      data.name,
      data.category,
      data.site,
      data.linkedin,
      data.observations,
      new Date(),
      null
    )

    return this.companyRepository.save(company)
  }

  async getById(id: string): Promise<Company> {
    const company = await this.companyRepository.findById(id)
    if (!company) {
      throw new NotFoundError('Empresa não encontrada.')
    }
    return company
  }

  async listAll(options?: QueryOptions): Promise<PaginatedResult<Company>> {
    return this.companyRepository.findAll(options)
  }

  async update(id: string, data: Partial<Company>): Promise<Company> {
    const company = await this.companyRepository.findById(id)
    if (!company) {
      throw new NotFoundError('Empresa não encontrada.')
    }

    return this.companyRepository.update(id, data)
  }

  async delete(id: string): Promise<void> {
    const company = await this.companyRepository.findById(id)
    if (!company) {
      throw new NotFoundError('Empresa não encontrada.')
    }
    await this.companyRepository.delete(id)
  }
}
