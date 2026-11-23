-- CreateEnum
CREATE TYPE "RenewalStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateTable
CREATE TABLE "PolicyRenewal" (
    "id" TEXT NOT NULL,
    "policyId" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "status" "RenewalStatus" NOT NULL DEFAULT 'PENDING',
    "oldExpiryDate" TIMESTAMP(3) NOT NULL,
    "newExpiryDate" TIMESTAMP(3),
    "premiumAmount" DECIMAL(15,2) NOT NULL,
    "rejectionReason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PolicyRenewal_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PolicyRenewal_policyId_idx" ON "PolicyRenewal"("policyId");

-- CreateIndex
CREATE INDEX "PolicyRenewal_customerId_idx" ON "PolicyRenewal"("customerId");

-- CreateIndex
CREATE INDEX "PolicyRenewal_status_idx" ON "PolicyRenewal"("status");

-- AddForeignKey
ALTER TABLE "PolicyRenewal" ADD CONSTRAINT "PolicyRenewal_policyId_fkey" FOREIGN KEY ("policyId") REFERENCES "Policy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PolicyRenewal" ADD CONSTRAINT "PolicyRenewal_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
