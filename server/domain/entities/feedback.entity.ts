import { InteractionType, ApplicationStatus } from '../enums'

/**
 * Represents feedback received during or after an application step.
 */
export class Feedback {
  constructor(
    public id: string,
    public stepId: string,
    public title: string,
    public content: string,
    public senderName: string | null,
    public senderEmail: string | null,
    public senderLinkedin: string | null,
    public interactionType: InteractionType,
    public status: ApplicationStatus,
    public createdAt: Date,
    public updatedAt: Date | null,
  ) {}
}
