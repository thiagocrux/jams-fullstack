/**
 * Standardized options for querying lists of entities.
 */
export interface QueryOptions {
  /** Number of records to skip for pagination. */
  skip?: number
  /** Number of records to take for pagination. */
  take?: number
  /** The field name to order by. */
  orderBy?: string
  /** The direction of the ordering. */
  orderDir?: 'asc' | 'desc'
  /** A generic search string. */
  search?: string
  /** The specific field(s) to apply the search to. */
  searchBy?: string
  /** Filter by start date (ISO string). */
  startDate?: string
  /** Filter by end date (ISO string). */
  endDate?: string
}

/**
 * Standardized response for list queries.
 */
export interface PaginatedResult<T> {
  /** The list of items for the current page. */
  items: T[]
  /** The total count of items matching the filters. */
  total: number
}
