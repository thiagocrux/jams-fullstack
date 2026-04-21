import type { Step } from '../entities'
import type { PaginatedResult, QueryOptions } from '../types/query-options'

/**
 * Provides an abstraction for application step data persistence.
 */
export interface StepRepository {
  /**
   * Saves a new step or updates an existing one.
   *
   * @param step The step entity to persist.
   * @returns A promise that resolves to the saved step.
   */
  save(step: Step): Promise<Step>

  /**
   * Finds a step by its unique identifier.
   *
   * @param id The unique identifier of the step.
   * @returns A promise that resolves to the step if found, or null otherwise.
   */
  findById(id: string): Promise<Step | null>

  /**
   * Retrieves steps associated with a specific job application, with query options.
   *
   * @param applicationId The identifier of the application.
   * @param options Optional parameters for pagination, sorting, and filtering.
   * @returns A promise that resolves to a paginated result of steps.
   */
  findByApplicationId(
    applicationId: string,
    options?: QueryOptions,
  ): Promise<PaginatedResult<Step>>

  /**
   * Updates an existing step's information.
   *
   * @param id The unique identifier of the step.
   * @param step The partial step data to update.
   * @returns A promise that resolves to the updated step entity.
   */
  update(id: string, step: Partial<Step>): Promise<Step>

  /**
   * Removes a step from the system.
   *
   * @param id The unique identifier of the step to delete.
   * @returns A promise that resolves when the operation completes.
   */
  delete(id: string): Promise<void>
}
