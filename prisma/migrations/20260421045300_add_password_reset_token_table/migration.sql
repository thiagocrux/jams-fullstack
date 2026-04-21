-- CreateTable
CREATE TABLE "password_reset_token" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "token" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "expires_at" DATETIME NOT NULL,
    "used_at" DATETIME,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME
);

-- CreateIndex
CREATE UNIQUE INDEX "password_reset_token_token_key" ON "password_reset_token"("token");
