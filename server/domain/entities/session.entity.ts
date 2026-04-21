/**
 * Represents an authentication session for a candidate.
 */
export class Session {
  constructor(
    public id: string,
    public candidateId: string,
    public expiresAt: Date,
    public createdAt: Date,
    public updatedAt: Date | null,
  ) {}
}
