-- CreateTable
CREATE TABLE "ReportReceived" (
    "id" SERIAL NOT NULL,
    "customerName" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "contactOne" TEXT NOT NULL,
    "contactTwo" TEXT NOT NULL,
    "registration" TEXT NOT NULL,
    "iptu" TEXT NOT NULL,
    "leadNumber" TEXT NOT NULL,
    "guaranteeValue" TEXT NOT NULL,

    CONSTRAINT "ReportReceived_pkey" PRIMARY KEY ("id")
);
