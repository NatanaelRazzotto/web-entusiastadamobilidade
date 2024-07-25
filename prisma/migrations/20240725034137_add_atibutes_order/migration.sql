/*
  Warnings:

  - Added the required column `unit` to the `BookOrder` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BookOrder" ADD COLUMN     "paymentAccept" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN "unit" FLOAT DEFAULT 0.0;
