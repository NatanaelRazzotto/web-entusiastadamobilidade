-- AlterTable
ALTER TABLE "Image" ADD COLUMN     "oldPathURL" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "publicStorage" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "storage" BOOLEAN NOT NULL DEFAULT false;
