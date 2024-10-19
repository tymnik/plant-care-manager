/*
  Warnings:

  - The `sunlight` column on the `Plant` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `pruningMonths` column on the `Plant` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `floweringSeason` column on the `Plant` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `fruitingSeasons` column on the `Plant` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `harvestSeasons` column on the `Plant` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `harvestMethods` column on the `Plant` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `growthRate` column on the `Plant` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `watering` on the `Plant` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `wateringPeriod` on the `Plant` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `maintenance` on the `Plant` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `careLevel` on the `Plant` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Month" AS ENUM ('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');

-- CreateEnum
CREATE TYPE "Season" AS ENUM ('Spring', 'Summer', 'Autumn', 'Winter');

-- CreateEnum
CREATE TYPE "DayTime" AS ENUM ('Morning', 'Afternoon', 'Evening', 'Night');

-- CreateEnum
CREATE TYPE "WateringFrequency" AS ENUM ('Frequent', 'Occasional', 'Infrequent', 'Rare');

-- CreateEnum
CREATE TYPE "SunlightExposure" AS ENUM ('FullSun', 'PartialShade', 'FullShade');

-- CreateEnum
CREATE TYPE "HarvestMethod" AS ENUM ('Cutting', 'Picking', 'Digging', 'Slicing', 'Pulling');

-- CreateEnum
CREATE TYPE "GrowthRate" AS ENUM ('High', 'Medium', 'Low', 'Slow');

-- CreateEnum
CREATE TYPE "MaintenanceLevel" AS ENUM ('High', 'Medium', 'Low');

-- CreateEnum
CREATE TYPE "CareLevel" AS ENUM ('High', 'Medium', 'Low');

-- AlterTable
ALTER TABLE "Plant" DROP COLUMN "watering",
ADD COLUMN     "watering" "WateringFrequency" NOT NULL,
DROP COLUMN "wateringPeriod",
ADD COLUMN     "wateringPeriod" "DayTime" NOT NULL,
DROP COLUMN "sunlight",
ADD COLUMN     "sunlight" "SunlightExposure"[],
DROP COLUMN "pruningMonths",
ADD COLUMN     "pruningMonths" "Month"[],
DROP COLUMN "floweringSeason",
ADD COLUMN     "floweringSeason" "Season",
DROP COLUMN "fruitingSeasons",
ADD COLUMN     "fruitingSeasons" "Season"[],
DROP COLUMN "harvestSeasons",
ADD COLUMN     "harvestSeasons" "Season"[],
DROP COLUMN "harvestMethods",
ADD COLUMN     "harvestMethods" "HarvestMethod",
DROP COLUMN "growthRate",
ADD COLUMN     "growthRate" "GrowthRate",
DROP COLUMN "maintenance",
ADD COLUMN     "maintenance" "MaintenanceLevel" NOT NULL,
DROP COLUMN "careLevel",
ADD COLUMN     "careLevel" "CareLevel" NOT NULL;
