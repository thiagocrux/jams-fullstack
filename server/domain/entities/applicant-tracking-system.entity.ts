/**
 * Represents an Applicant Tracking System (ATS) used by companies.
 */
export class ApplicantTrackingSystem {
  constructor(
    public id: string,
    public name: string,
    public site: string,
    public createdAt: Date,
    public updatedAt: Date | null,
  ) {}
}
