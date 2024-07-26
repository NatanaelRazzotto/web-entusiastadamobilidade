-- CreateTable
CREATE TABLE "BookOrder" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "request" BOOLEAN NOT NULL DEFAULT false,
    "processing" BOOLEAN NOT NULL DEFAULT false,
    "costValue" DOUBLE PRECISION NOT NULL,
    "concluded" BOOLEAN NOT NULL DEFAULT false,
    "bookURL" TEXT,
    "requestingUserId" TEXT,
    "dateCreate" TIMESTAMP(3) NOT NULL,
    "dateUpdate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BookOrder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_OrderImages" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_OrderImages_AB_unique" ON "_OrderImages"("A", "B");

-- CreateIndex
CREATE INDEX "_OrderImages_B_index" ON "_OrderImages"("B");

-- AddForeignKey
ALTER TABLE "BookOrder" ADD CONSTRAINT "BookOrder_requestingUserId_fkey" FOREIGN KEY ("requestingUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrderImages" ADD CONSTRAINT "_OrderImages_A_fkey" FOREIGN KEY ("A") REFERENCES "BookOrder"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrderImages" ADD CONSTRAINT "_OrderImages_B_fkey" FOREIGN KEY ("B") REFERENCES "Image"("id") ON DELETE CASCADE ON UPDATE CASCADE;
