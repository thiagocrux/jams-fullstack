import { StepStatus } from '../enums'

/**
 * Represents a specific step in a job application process.
 */
export class Step {
  constructor(
    public id: string,
    public applicationId: string,
    public name: string,
    public description: string,
    public status: StepStatus,
    public startedAt: Date | null,
    public finishedAt: Date | null,
    public observations: string | null,
    public organizerContact: string | null,
    public createdAt: Date,
    public updatedAt: Date | null,
  ) {}
}
