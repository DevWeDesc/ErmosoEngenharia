-- AlterTable
ALTER TABLE "ReportReceived" ADD COLUMN     "status" TEXT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "roles" SET DEFAULT ARRAY['user']::TEXT[];
