/**
 * Represents a candidate in the system.
 */
export class Candidate {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public password: string,
    public linkedin: string | null,
    public createdAt: Date,
    public updatedAt: Date | null,
  ) {}
}
