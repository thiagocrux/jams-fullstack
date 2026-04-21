import type { Candidate } from '../../domain/entities'
import type { QueryOptions, PaginatedResult } from '../../domain/types/query-options'

/**
 * Boundary interface for candidate use cases.
 */
export interface CandidateUseCase {
  /**
   * Creates a new candidate.
   *
   * @param data The candidate data.
   * @returns The created candidate.
   */
  create(data: Omit<Candidate, 'id' | 'createdAt' | 'updatedAt'>): Promise<Candidate>

  /**
   * Retrieves a candidate by its ID.
   *
   * @param id The candidate ID.
   * @returns The candidate entity.
   */
  getById(id: string): Promise<Candidate>

  /**
   * Lists all candidates with pagination and filters.
   *
   * @param options Query parameters.
   * @returns A paginated list of candidates.
   */
  listAll(options?: QueryOptions): Promise<PaginatedResult<Candidate>>

  /**
   * Updates an existing candidate.
   *
   * @param id The candidate ID.
   * @param data The partial candidate data.
   * @returns The updated candidate.
   */
  update(id: string, data: Partial<Candidate>): Promise<Candidate>

  /**
   * Deletes a candidate by its ID.
   *
   * @param id The candidate ID.
   */
  delete(id: string): Promise<void>
}
