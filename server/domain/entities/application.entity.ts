import {
  ApplicationStatus,
  Priority,
  SeniorityLevel,
  WorkModel,
  ContractType,
  ApplicationSource,
} from '../enums'

/**
 * Represents a job application.
 */
export class Application {
  constructor(
    public id: string,
    public candidateId: string,
    public position: string,
    public companyId: string,
    public applicationDate: Date,
    public status: ApplicationStatus,
    public priority: Priority,
    public seniorityLevel: SeniorityLevel,
    public workModel: WorkModel,
    public contractType: ContractType,
    public applicantTrackingSystemId: string,
    public source: ApplicationSource,
    public jobPostingLink: string,
    public jobDescription: string,
    public salaryInformation: string,
    public salaryOffer: number,
    public agreedFollowupDate: Date | null,
    public completionDate: Date | null,
    public ghosted: boolean,
    public hrLinkedin: string | null,
    public hrObservations: string | null,
    public leaderLinkedin: string | null,
    public leaderObservations: string | null,
    public hiredCompetitorLinkedin: string | null,
    public hiredCompetitorAnalysis: string | null,
    public improvementIdeas: string | null,
    public generalNotes: string | null,
    public createdAt: Date,
    public updatedAt: Date | null,
  ) {}
}
