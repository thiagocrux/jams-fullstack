import type { ApplicantTrackingSystem } from '../entities'
import type { PaginatedResult, QueryOptions } from '../types/query-options'

/**
 * Provides an abstraction for ATS (Applicant Tracking System) data persistence.
 */
export interface ApplicantTrackingSystemRepository {
  /**
   * Saves a new ATS or updates an existing one.
   *
   * @param ats The ATS entity to persist.
   * @returns A promise that resolves to the saved ATS.
   */
  save(ats: ApplicantTrackingSystem): Promise<ApplicantTrackingSystem>

  /**
   * Finds an ATS by its unique identifier.
   *
   * @param id The unique identifier of the ATS.
   * @returns A promise that resolves to the ATS if found, or null otherwise.
   */
  findById(id: string): Promise<ApplicantTrackingSystem | null>

  /**
   * Retrieves ATS based on query options.
   *
   * @param options Optional parameters for pagination, sorting, and filtering.
   * @returns A promise that resolves to a paginated result of ATS.
   */
  findAll(options?: QueryOptions): Promise<PaginatedResult<ApplicantTrackingSystem>>

  /**
   * Updates an existing ATS's information.
   *
   * @param id The unique identifier of the ATS.
   * @param ats The partial ATS data to update.
   * @returns A promise that resolves to the updated ATS entity.
   */
  update(
    id: string,
    ats: Partial<ApplicantTrackingSystem>,
  ): Promise<ApplicantTrackingSystem>

  /**
   * Removes an ATS from the system.
   *
   * @param id The unique identifier of the ATS to delete.
   * @returns A promise that resolves when the operation completes.
   */
  delete(id: string): Promise<void>
}
