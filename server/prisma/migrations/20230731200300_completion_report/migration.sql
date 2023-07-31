/*
  Warnings:

  - You are about to drop the column `address` on the `ReportReceived` table. All the data in the column will be lost.
  - Added the required column `address` to the `ReportReceived` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ReportReceived" DROP COLUMN "address",
ADD COLUMN     "address" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "CompletionReport" (
    "id" SERIAL NOT NULL,
    "leadNumberId" TEXT NOT NULL,
    "standardApparentAge" TEXT NOT NULL,
    "padrao" TEXT NOT NULL,
    "conservationState" TEXT NOT NULL,
    "usefulArea" TEXT NOT NULL,
    "homogenizedArea" TEXT NOT NULL,
    "landArea" TEXT NOT NULL,
    "parkingSpaces" TEXT NOT NULL,
    "dateReport" TEXT NOT NULL,

    CONSTRAINT "CompletionReport_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CompletionReport_leadNumberId_key" ON "CompletionReport"("leadNumberId");

-- AddForeignKey
ALTER TABLE "CompletionReport" ADD CONSTRAINT "CompletionReport_leadNumberId_fkey" FOREIGN KEY ("leadNumberId") REFERENCES "ReportReceived"("leadNumber") ON DELETE RESTRICT ON UPDATE CASCADE;
