import type { Application } from '../entities'
import type { PaginatedResult, QueryOptions } from '../types/query-options'

/**
 * Provides an abstraction for job application data persistence.
 */
export interface ApplicationRepository {
  /**
   * Saves a new application or updates an existing one.
   *
   * @param application The application entity to persist.
   * @returns A promise that resolves to the saved application.
   */
  save(application: Application): Promise<Application>

  /**
   * Finds an application by its unique identifier.
   *
   * @param id The unique identifier of the application.
   * @returns A promise that resolves to the application if found, or null otherwise.
   */
  findById(id: string): Promise<Application | null>

  /**
   * Retrieves applications associated with a specific candidate, with query options.
   *
   * @param candidateId The identifier of the candidate.
   * @param options Optional parameters for pagination, sorting, and filtering.
   * @returns A promise that resolves to a paginated result of applications.
   */
  findByCandidateId(
    candidateId: string,
    options?: QueryOptions,
  ): Promise<PaginatedResult<Application>>

  /**
   * Retrieves applications based on query options.
   *
   * @param options Optional parameters for pagination, sorting, and filtering.
   * @returns A promise that resolves to a paginated result of all applications.
   */
  findAll(options?: QueryOptions): Promise<PaginatedResult<Application>>

  /**
   * Updates an existing application's information.
   *
   * @param id The unique identifier of the application.
   * @param application The partial application data to update.
   * @returns A promise that resolves to the updated application entity.
   */
  update(id: string, application: Partial<Application>): Promise<Application>

  /**
   * Removes an application from the system.
   *
   * @param id The unique identifier of the application to delete.
   * @returns A promise that resolves when the operation completes.
   */
  delete(id: string): Promise<void>
}
