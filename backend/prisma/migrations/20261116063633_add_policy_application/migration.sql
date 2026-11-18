-- CreateEnum
CREATE TYPE "ApplicationStatus" AS ENUM ('PENDING', 'UNDER_REVIEW', 'APPROVED', 'REJECTED');

-- CreateTable
CREATE TABLE "PolicyApplication" (
    "id" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "insuranceType" "InsuranceType" NOT NULL,
    "coverageAmount" DECIMAL(15,2) NOT NULL,
    "details" TEXT,
    "status" "ApplicationStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PolicyApplication_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PolicyApplication" ADD CONSTRAINT "PolicyApplication_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
