/*
  Warnings:

  - You are about to drop the `Bodywork` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Manufacturer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Operator` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Powertrain` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Vehicle` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_VehicleImages` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_VehicleVideos` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Bodywork" DROP CONSTRAINT "Bodywork_manufacturerID_fkey";

-- DropForeignKey
ALTER TABLE "Powertrain" DROP CONSTRAINT "Powertrain_manufacturerID_fkey";

-- DropForeignKey
ALTER TABLE "Vehicle" DROP CONSTRAINT "Vehicle_bodyworkID_fkey";

-- DropForeignKey
ALTER TABLE "Vehicle" DROP CONSTRAINT "Vehicle_operatorID_fkey";

-- DropForeignKey
ALTER TABLE "Vehicle" DROP CONSTRAINT "Vehicle_powertrainID_fkey";

-- DropForeignKey
ALTER TABLE "_VehicleImages" DROP CONSTRAINT "_VehicleImages_A_fkey";

-- DropForeignKey
ALTER TABLE "_VehicleImages" DROP CONSTRAINT "_VehicleImages_B_fkey";

-- DropForeignKey
ALTER TABLE "_VehicleVideos" DROP CONSTRAINT "_VehicleVideos_A_fkey";

-- DropForeignKey
ALTER TABLE "_VehicleVideos" DROP CONSTRAINT "_VehicleVideos_B_fkey";

-- AlterTable
ALTER TABLE "Image" ADD COLUMN     "vehicleIDs" TEXT[];

-- AlterTable
ALTER TABLE "Video" ADD COLUMN     "vehicleIDs" TEXT[];

-- DropTable
DROP TABLE "Bodywork";

-- DropTable
DROP TABLE "Manufacturer";

-- DropTable
DROP TABLE "Operator";

-- DropTable
DROP TABLE "Powertrain";

-- DropTable
DROP TABLE "Vehicle";

-- DropTable
DROP TABLE "_VehicleImages";

-- DropTable
DROP TABLE "_VehicleVideos";
