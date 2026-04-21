import type { Feedback } from '../entities'
import type { PaginatedResult, QueryOptions } from '../types/query-options'

/**
 * Provides an abstraction for feedback data persistence.
 */
export interface FeedbackRepository {
  /**
   * Saves a new feedback or updates an existing one.
   *
   * @param feedback The feedback entity to persist.
   * @returns A promise that resolves to the saved feedback.
   */
  save(feedback: Feedback): Promise<Feedback>

  /**
   * Finds a feedback by its unique identifier.
   *
   * @param id The unique identifier of the feedback.
   * @returns A promise that resolves to the feedback if found, or null otherwise.
   */
  findById(id: string): Promise<Feedback | null>

  /**
   * Retrieves feedbacks associated with a specific application step, with query options.
   *
   * @param stepId The identifier of the step.
   * @param options Optional parameters for pagination, sorting, and filtering.
   * @returns A promise that resolves to a paginated result of feedbacks.
   */
  findByStepId(
    stepId: string,
    options?: QueryOptions,
  ): Promise<PaginatedResult<Feedback>>

  /**
   * Updates an existing feedback's information.
   *
   * @param id The unique identifier of the feedback.
   * @param feedback The partial feedback data to update.
   * @returns A promise that resolves to the updated feedback entity.
   */
  update(id: string, feedback: Partial<Feedback>): Promise<Feedback>

  /**
   * Removes a feedback from the system.
   *
   * @param id The unique identifier of the feedback to delete.
   * @returns A promise that resolves when the operation completes.
   */
  delete(id: string): Promise<void>
}
