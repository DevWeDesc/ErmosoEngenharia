/*
  Warnings:

  - You are about to drop the column `address` on the `ReportReceived` table. All the data in the column will be lost.
  - Added the required column `address` to the `ReportReceived` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ReportReceived" DROP COLUMN "address",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "cep" TEXT,
ADD COLUMN     "district" TEXT,
ADD COLUMN     "neighbour" TEXT,
ADD COLUMN     "state" TEXT,
ALTER COLUMN "customerName" DROP NOT NULL,
ALTER COLUMN "contactOne" DROP NOT NULL,
ALTER COLUMN "contactTwo" DROP NOT NULL,
ALTER COLUMN "registration" DROP NOT NULL,
ALTER COLUMN "iptu" DROP NOT NULL,
ALTER COLUMN "guaranteeValue" DROP NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'open';
