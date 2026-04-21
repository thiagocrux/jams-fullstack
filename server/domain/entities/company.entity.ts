import { CompanyCategory } from '../enums'

/**
 * Represents a company that offers job positions.
 */
export class Company {
  constructor(
    public id: string,
    public name: string,
    public category: CompanyCategory,
    public site: string | null,
    public linkedin: string | null,
    public observations: string | null,
    public createdAt: Date,
    public updatedAt: Date | null,
  ) {}
}
