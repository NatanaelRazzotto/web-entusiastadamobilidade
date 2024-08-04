/*
  Warnings:

  - A unique constraint covering the columns `[pathURL]` on the table `Image` will be added. If there are existing duplicate values, this will fail.
  - Made the column `pathURL` on table `Image` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Image" ALTER COLUMN "pathURL" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Image_pathURL_key" ON "Image"("pathURL");
