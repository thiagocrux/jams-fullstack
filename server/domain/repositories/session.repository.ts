import type { Session } from '../entities'
import type { PaginatedResult, QueryOptions } from '../types/query-options'

/**
 * Provides an abstraction for session data persistence.
 */
export interface SessionRepository {
  /**
   * Saves a new session.
   *
   * @param session The session entity to persist.
   * @returns A promise that resolves to the saved session.
   */
  save(session: Session): Promise<Session>

  /**
   * Finds a session by its unique identifier.
   *
   * @param id The unique identifier of the session.
   * @returns A promise that resolves to the session if found, or null otherwise.
   */
  findById(id: string): Promise<Session | null>

  /**
   * Retrieves sessions associated with a specific candidate, with query options.
   *
   * @param candidateId The identifier of the candidate.
   * @param options Optional parameters for pagination, sorting, and filtering.
   * @returns A promise that resolves to a paginated result of sessions.
   */
  findByCandidateId(
    candidateId: string,
    options?: QueryOptions,
  ): Promise<PaginatedResult<Session>>

  /**
   * Removes a session by its unique identifier.
   *
   * @param id The unique identifier of the session to delete.
   * @returns A promise that resolves when the operation completes.
   */
  delete(id: string): Promise<void>

  /**
   * Removes all expired sessions for a specific candidate.
   *
   * @param candidateId The identifier of the candidate.
   * @returns A promise that resolves when the operation completes.
   */
  deleteExpiredByCandidateId(candidateId: string): Promise<void>
}
