import { PrismaCandidateRepository } from '../persistence/prisma/candidate.repository'
import { PrismaCompanyRepository } from '../persistence/prisma/company.repository'
import { PrismaApplicationRepository } from '../persistence/prisma/application.repository'
import { PrismaApplicantTrackingSystemRepository } from '../persistence/prisma/applicant-tracking-system.repository'
import { PrismaStepRepository } from '../persistence/prisma/step.repository'
import { PrismaFeedbackRepository } from '../persistence/prisma/feedback.repository'
import { PrismaSessionRepository } from '../persistence/prisma/session.repository'
import { DefaultCandidateService } from '../../application/services/candidate.service'
import { DefaultCompanyService } from '../../application/services/company.service'
import { DefaultApplicationService } from '../../application/services/application.service'
import { DefaultApplicantTrackingSystemService } from '../../application/services/applicant-tracking-system.service'
import { DefaultStepService } from '../../application/services/step.service'
import { DefaultFeedbackService } from '../../application/services/feedback.service'
import { DefaultSessionService } from '../../application/services/session.service'

/**
 * Container providing dependency injection for application services.
 */
export const useContainer = () => {
  const candidateRepository = new PrismaCandidateRepository()
  const companyRepository = new PrismaCompanyRepository()
  const applicationRepository = new PrismaApplicationRepository()
  const atsRepository = new PrismaApplicantTrackingSystemRepository()
  const stepRepository = new PrismaStepRepository()
  const feedbackRepository = new PrismaFeedbackRepository()
  const sessionRepository = new PrismaSessionRepository()

  return {
    candidateService: new DefaultCandidateService(candidateRepository),
    companyService: new DefaultCompanyService(companyRepository),
    applicationService: new DefaultApplicationService(
      applicationRepository,
      candidateRepository,
      companyRepository,
      atsRepository
    ),
    atsService: new DefaultApplicantTrackingSystemService(atsRepository),
    stepService: new DefaultStepService(stepRepository, applicationRepository),
    feedbackService: new DefaultFeedbackService(feedbackRepository, stepRepository),
    sessionService: new DefaultSessionService(sessionRepository, candidateRepository)
  }
}
