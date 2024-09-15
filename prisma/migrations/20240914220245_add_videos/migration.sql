-- CreateTable
CREATE TABLE "Video" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "nameFile" TEXT NOT NULL DEFAULT '',
    "description" TEXT,
    "pathURL" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "authorId" TEXT,
    "dateCreate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Video_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PostVideos" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_VehicleVideos" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Video_pathURL_key" ON "Video"("pathURL");

-- CreateIndex
CREATE UNIQUE INDEX "_PostVideos_AB_unique" ON "_PostVideos"("A", "B");

-- CreateIndex
CREATE INDEX "_PostVideos_B_index" ON "_PostVideos"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_VehicleVideos_AB_unique" ON "_VehicleVideos"("A", "B");

-- CreateIndex
CREATE INDEX "_VehicleVideos_B_index" ON "_VehicleVideos"("B");

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PostVideos" ADD CONSTRAINT "_PostVideos_A_fkey" FOREIGN KEY ("A") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PostVideos" ADD CONSTRAINT "_PostVideos_B_fkey" FOREIGN KEY ("B") REFERENCES "Video"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_VehicleVideos" ADD CONSTRAINT "_VehicleVideos_A_fkey" FOREIGN KEY ("A") REFERENCES "Vehicle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_VehicleVideos" ADD CONSTRAINT "_VehicleVideos_B_fkey" FOREIGN KEY ("B") REFERENCES "Video"("id") ON DELETE CASCADE ON UPDATE CASCADE;
