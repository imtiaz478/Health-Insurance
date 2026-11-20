-- CreateEnum
CREATE TYPE "PolicyStatus" AS ENUM ('ACTIVE', 'EXPIRED', 'CANCELLED');

-- CreateTable
CREATE TABLE "Policy" (
    "id" TEXT NOT NULL,
    "policyNumber" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "insuranceType" "InsuranceType" NOT NULL,
    "coverageAmount" DECIMAL(15,2) NOT NULL,
    "premiumAmount" DECIMAL(15,2) NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "expiryDate" TIMESTAMP(3) NOT NULL,
    "status" "PolicyStatus" NOT NULL DEFAULT 'ACTIVE',
    "details" TEXT,
    "policyApplicationId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Policy_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Policy_policyNumber_key" ON "Policy"("policyNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Policy_policyApplicationId_key" ON "Policy"("policyApplicationId");

-- AddForeignKey
ALTER TABLE "Policy" ADD CONSTRAINT "Policy_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Policy" ADD CONSTRAINT "Policy_policyApplicationId_fkey" FOREIGN KEY ("policyApplicationId") REFERENCES "PolicyApplication"("id") ON DELETE SET NULL ON UPDATE CASCADE;
