/**
 * Represents a password reset token.
 */
export class PasswordResetToken {
  constructor(
    public id: string,
    public token: string,
    public email: string,
    public expiresAt: Date,
    public usedAt: Date | null,
    public createdAt: Date,
    public updatedAt: Date | null,
  ) {}
}
