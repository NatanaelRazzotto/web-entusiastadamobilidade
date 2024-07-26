/*
  Warnings:

  - You are about to drop the `_OrderImages` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_OrderImages" DROP CONSTRAINT "_OrderImages_A_fkey";

-- DropForeignKey
ALTER TABLE "_OrderImages" DROP CONSTRAINT "_OrderImages_B_fkey";

-- AlterTable
ALTER TABLE "BookOrder" ALTER COLUMN "dateCreate" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "dateUpdate" SET DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "_OrderImages";

-- CreateTable
CREATE TABLE "OrderImage" (
    "id" TEXT NOT NULL,
    "bookOrderId" TEXT NOT NULL,
    "imageId" TEXT NOT NULL,
    "requestImage" BOOLEAN NOT NULL DEFAULT false,
    "addedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "requestDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT,
    "comment" TEXT,

    CONSTRAINT "OrderImage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OrderImage_bookOrderId_imageId_key" ON "OrderImage"("bookOrderId", "imageId");

-- AddForeignKey
ALTER TABLE "OrderImage" ADD CONSTRAINT "OrderImage_bookOrderId_fkey" FOREIGN KEY ("bookOrderId") REFERENCES "BookOrder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderImage" ADD CONSTRAINT "OrderImage_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
