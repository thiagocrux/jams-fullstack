/**
 * Enumeration for the status of a job application.
 */
export enum ApplicationStatus {
  SUBMITTED = 'SUBMITTED',
  CANDIDATES_TRIAGE = 'CANDIDATES_TRIAGE',
  AUDIO_RECORDING = 'AUDIO_RECORDING',
  VIDEO_RECORDING = 'VIDEO_RECORDING',
  TECHNICAL_TEST = 'TECHNICAL_TEST',
  HR_SCREENING = 'HR_SCREENING',
  TECHNICAL_TEAM_SCREENING = 'TECHNICAL_TEAM_SCREENING',
  FOUNDER_SCREENING = 'FOUNDER_SCREENING',
  CLIENT_SCREENING = 'CLIENT_SCREENING',
  PROPOSAL = 'PROPOSAL',
  REJECTED = 'REJECTED',
  ACCEPTED = 'ACCEPTED',
  WITHDRAWN = 'WITHDRAWN',
}

/**
 * Enumeration for the priority level of an application.
 */
export enum Priority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}

/**
 * Enumeration for the seniority level of a position.
 */
export enum SeniorityLevel {
  TRAINEE = 'TRAINEE',
  JUNIOR = 'JUNIOR',
  MID_LEVEL = 'MID_LEVEL',
  SENIOR = 'SENIOR',
}

/**
 * Enumeration for the work model of a position.
 */
export enum WorkModel {
  ON_SITE = 'ON_SITE',
  REMOTE = 'REMOTE',
  HYBRID = 'HYBRID',
}

/**
 * Enumeration for the contract type.
 */
export enum ContractType {
  CLT = 'CLT',
  PJ = 'PJ',
  TEMPORARY = 'TEMPORARY',
}

/**
 * Enumeration for the source from which the candidate found the application.
 */
export enum ApplicationSource {
  LINKEDIN = 'LINKEDIN',
  REFERRAL = 'REFERRAL',
  COMPANY_WEBSITE = 'COMPANY_WEBSITE',
}

/**
 * Enumeration for company categories.
 */
export enum CompanyCategory {
  TECH = 'TECH',
  FINTECH = 'FINTECH',
  STARTUP = 'STARTUP',
  CONSULTING = 'CONSULTING',
  ECOMMERCE = 'ECOMMERCE',
  BANK = 'BANK',
  OTHER = 'OTHER',
}

/**
 * Enumeration for the status of a specific step in the application process.
 */
export enum StepStatus {
  PENDING = 'PENDING',
  AWAITING_FEEDBACK = 'AWAITING_FEEDBACK',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  WITHDRAWN = 'WITHDRAWN',
  CANCELED = 'CANCELED',
}

/**
 * Enumeration for the type of interaction during the application process.
 */
export enum InteractionType {
  HR_INTERVIEW = 'HR_INTERVIEW',
  TECHNICAL_TEST = 'TECHNICAL_TEST',
  EMAIL = 'EMAIL',
  PHONE_CALL = 'PHONE_CALL',
}
