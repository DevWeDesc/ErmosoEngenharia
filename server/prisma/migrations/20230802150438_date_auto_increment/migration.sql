-- AlterTable
ALTER TABLE "CompletionReport" ALTER COLUMN "dateReport" DROP NOT NULL,
ALTER COLUMN "dateReport" SET DEFAULT CURRENT_TIMESTAMP;