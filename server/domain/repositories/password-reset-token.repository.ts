import type { PasswordResetToken } from '../entities'
import type { PaginatedResult, QueryOptions } from '../types/query-options'

/**
 * Provides an abstraction for password reset token data persistence.
 */
export interface PasswordResetTokenRepository {
  /**
   * Saves a new token or updates an existing one.
   *
   * @param token The token entity to persist.
   * @returns A promise that resolves to the saved token.
   */
  save(token: PasswordResetToken): Promise<PasswordResetToken>

  /**
   * Finds a token by its unique identifier.
   *
   * @param id The unique identifier of the token.
   * @returns A promise that resolves to the token if found, or null otherwise.
   */
  findById(id: string): Promise<PasswordResetToken | null>

  /**
   * Finds a token by the token string itself.
   *
   * @param token The token string.
   * @returns A promise that resolves to the token if found, or null otherwise.
   */
  findByToken(token: string): Promise<PasswordResetToken | null>

  /**
   * Retrieves all tokens registered in the system.
   *
   * @param options Optional parameters for pagination.
   * @returns A promise that resolves to a paginated list of tokens.
   */
  findAll(options?: QueryOptions): Promise<PaginatedResult<PasswordResetToken>>

  /**
   * Updates an existing token's information.
   *
   * @param id The unique identifier of the token.
   * @param data The partial token data to update.
   * @returns A promise that resolves to the updated token entity.
   */
  update(
    id: string,
    data: Partial<PasswordResetToken>,
  ): Promise<PasswordResetToken>

  /**
   * Removes a token from the system.
   *
   * @param id The unique identifier of the token to delete.
   * @returns A promise that resolves when the operation completes.
   */
  delete(id: string): Promise<void>
}
