-- CreateTable
CREATE TABLE "candidate" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "linkedin" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME
);

-- CreateTable
CREATE TABLE "session" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "candidate_id" TEXT NOT NULL,
    "expires_at" DATETIME NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME,
    CONSTRAINT "session_candidate_id_fkey" FOREIGN KEY ("candidate_id") REFERENCES "candidate" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "applicant_tracking_system" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "site" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME
);

-- CreateTable
CREATE TABLE "company" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL DEFAULT 'TECH',
    "site" TEXT,
    "linkedin" TEXT,
    "observations" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME
);

-- CreateTable
CREATE TABLE "application" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "candidate_id" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "application_date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL DEFAULT 'SUBMITTED',
    "priority" TEXT NOT NULL DEFAULT 'MEDIUM',
    "seniority_level" TEXT NOT NULL DEFAULT 'JUNIOR',
    "work_model" TEXT NOT NULL DEFAULT 'HYBRID',
    "contract_type" TEXT NOT NULL DEFAULT 'CLT',
    "applicant_tracking_system_id" TEXT NOT NULL,
    "source" TEXT NOT NULL DEFAULT 'LINKEDIN',
    "job_posting_link" TEXT NOT NULL,
    "job_description" TEXT NOT NULL,
    "salary_information" TEXT NOT NULL,
    "salary_offer" DECIMAL NOT NULL,
    "agreed_followup_date" DATETIME,
    "completion_date" DATETIME,
    "ghosted" BOOLEAN NOT NULL DEFAULT false,
    "hr_linkedin" TEXT,
    "hr_observations" TEXT,
    "leader_linkedin" TEXT,
    "leader_observations" TEXT,
    "hired_competitor_linkedin" TEXT,
    "hired_competitor_analysis" TEXT,
    "improvement_ideas" TEXT,
    "general_notes" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME,
    CONSTRAINT "application_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "application_applicant_tracking_system_id_fkey" FOREIGN KEY ("applicant_tracking_system_id") REFERENCES "applicant_tracking_system" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "application_candidate_id_fkey" FOREIGN KEY ("candidate_id") REFERENCES "candidate" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "step" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "application_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "started_at" DATETIME,
    "finished_at" DATETIME,
    "observations" TEXT,
    "organizer_contact" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME,
    CONSTRAINT "step_application_id_fkey" FOREIGN KEY ("application_id") REFERENCES "application" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "feedback" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "step_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "sender_name" TEXT,
    "sender_email" TEXT,
    "sender_linkedin" TEXT,
    "interaction_type" TEXT NOT NULL DEFAULT 'HR_INTERVIEW',
    "status" TEXT NOT NULL DEFAULT 'SUBMITTED',
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME,
    CONSTRAINT "feedback_step_id_fkey" FOREIGN KEY ("step_id") REFERENCES "step" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "candidate_email_key" ON "candidate"("email");

-- CreateIndex
CREATE UNIQUE INDEX "applicant_tracking_system_name_key" ON "applicant_tracking_system"("name");
