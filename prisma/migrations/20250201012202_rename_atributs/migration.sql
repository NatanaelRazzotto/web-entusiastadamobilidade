/*
  Warnings:

  - You are about to drop the column `diaSemana` on the `ScheduleLiveTv` table. All the data in the column will be lost.
  - You are about to drop the column `horarioFim` on the `ScheduleLiveTv` table. All the data in the column will be lost.
  - You are about to drop the column `horarioInicio` on the `ScheduleLiveTv` table. All the data in the column will be lost.
  - Added the required column `dayWeek` to the `ScheduleLiveTv` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endTime` to the `ScheduleLiveTv` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `ScheduleLiveTv` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ScheduleLiveTv" DROP COLUMN "diaSemana",
DROP COLUMN "horarioFim",
DROP COLUMN "horarioInicio",
ADD COLUMN     "dayWeek" INTEGER NOT NULL,
ADD COLUMN     "endTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startTime" TIMESTAMP(3) NOT NULL;
