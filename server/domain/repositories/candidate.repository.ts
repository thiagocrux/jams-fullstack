import type { Candidate } from '../entities'
import type { PaginatedResult, QueryOptions } from '../types/query-options'

/**
 * Provides an abstraction for candidate data persistence.
 */
export interface CandidateRepository {
  /**
   * Saves a new candidate or updates an existing one.
   *
   * @param candidate The candidate entity to persist.
   * @returns A promise that resolves to the saved candidate.
   */
  save(candidate: Candidate): Promise<Candidate>

  /**
   * Finds a candidate by their unique identifier.
   *
   * @param id The unique identifier of the candidate.
   * @returns A promise that resolves to the candidate if found, or null otherwise.
   */
  findById(id: string): Promise<Candidate | null>

  /**
   * Finds a candidate by their email address.
   *
   * @param email The email address to search for.
   * @returns A promise that resolves to the candidate if found, or null otherwise.
   */
  findByEmail(email: string): Promise<Candidate | null>

  /**
   * Retrieves candidates based on query options.
   *
   * @param options Optional parameters for pagination, sorting, and filtering.
   * @returns A promise that resolves to a paginated result of candidates.
   */
  findAll(options?: QueryOptions): Promise<PaginatedResult<Candidate>>

  /**
   * Updates an existing candidate's information.
   *
   * @param id The unique identifier of the candidate.
   * @param candidate The partial candidate data to update.
   * @returns A promise that resolves to the updated candidate entity.
   */
  update(id: string, candidate: Partial<Candidate>): Promise<Candidate>

  /**
   * Removes a candidate from the system.
   *
   * @param id The unique identifier of the candidate to delete.
   * @returns A promise that resolves when the operation completes.
   */
  delete(id: string): Promise<void>
}
