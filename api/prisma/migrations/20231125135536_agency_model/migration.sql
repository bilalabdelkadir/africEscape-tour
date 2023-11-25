/*
  Warnings:

  - You are about to drop the `refresh_token` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "StatusType" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- DropForeignKey
ALTER TABLE "account" DROP CONSTRAINT "account_refreshTokenId_fkey";

-- AlterTable
ALTER TABLE "account" ADD COLUMN     "isEmailVerified" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "refreshTokenId" DROP NOT NULL;

-- DropTable
DROP TABLE "refresh_token";

-- CreateTable
CREATE TABLE "refresh_tokens" (
    "id" TEXT NOT NULL,
    "hashedToken" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "operatingSystem" TEXT,
    "browser" TEXT,
    "device" TEXT,
    "agent" TEXT,
    "refreshTokenIdentifier" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "refresh_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tour_company" (
    "id" TEXT NOT NULL,
    "agencyName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNo" TEXT NOT NULL,
    "agencyAvatar" TEXT,
    "country" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "address" TEXT,
    "status" "StatusType" NOT NULL DEFAULT 'APPROVED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "accountId" TEXT NOT NULL,

    CONSTRAINT "tour_company_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "refresh_tokens_refreshTokenIdentifier_key" ON "refresh_tokens"("refreshTokenIdentifier");

-- CreateIndex
CREATE UNIQUE INDEX "tour_company_email_key" ON "tour_company"("email");

-- CreateIndex
CREATE UNIQUE INDEX "tour_company_phoneNo_key" ON "tour_company"("phoneNo");

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "account_refreshTokenId_fkey" FOREIGN KEY ("refreshTokenId") REFERENCES "refresh_tokens"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tour_company" ADD CONSTRAINT "tour_company_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
