import type { Company } from '../entities'
import type { PaginatedResult, QueryOptions } from '../types/query-options'

/**
 * Provides an abstraction for company data persistence.
 */
export interface CompanyRepository {
  /**
   * Saves a new company or updates an existing one.
   *
   * @param company The company entity to persist.
   * @returns A promise that resolves to the saved company.
   */
  save(company: Company): Promise<Company>

  /**
   * Finds a company by its unique identifier.
   *
   * @param id The unique identifier of the company.
   * @returns A promise that resolves to the company if found, or null otherwise.
   */
  findById(id: string): Promise<Company | null>

  /**
   * Retrieves companies based on query options.
   *
   * @param options Optional parameters for pagination, sorting, and filtering.
   * @returns A promise that resolves to a paginated result of companies.
   */
  findAll(options?: QueryOptions): Promise<PaginatedResult<Company>>

  /**
   * Updates an existing company's information.
   *
   * @param id The unique identifier of the company.
   * @param company The partial company data to update.
   * @returns A promise that resolves to the updated company entity.
   */
  update(id: string, company: Partial<Company>): Promise<Company>

  /**
   * Removes a company from the system.
   *
   * @param id The unique identifier of the company to delete.
   * @returns A promise that resolves when the operation completes.
   */
  delete(id: string): Promise<void>
}
