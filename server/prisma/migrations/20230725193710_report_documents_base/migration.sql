-- CreateTable
CREATE TABLE "ReportsDocuments" (
    "id" SERIAL NOT NULL,
    "documentsPath" TEXT[],
    "reportId" INTEGER NOT NULL,

    CONSTRAINT "ReportsDocuments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ReportsDocuments" ADD CONSTRAINT "ReportsDocuments_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "ReportReceived"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
