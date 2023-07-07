/*
  Warnings:

  - A unique constraint covering the columns `[leadNumber]` on the table `ReportReceived` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ReportReceived_leadNumber_key" ON "ReportReceived"("leadNumber");
