/*
  Warnings:

  - Made the column `unit` on table `BookOrder` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "BookOrder" ALTER COLUMN "unit" SET NOT NULL,
ALTER COLUMN "unit" DROP DEFAULT;
