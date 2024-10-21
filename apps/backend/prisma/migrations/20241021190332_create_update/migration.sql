/*
  Warnings:

  - Added the required column `updateAt` to the `Plant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updateAt` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `label` to the `UserPlantCare` table without a default value. This is not possible if the table is not empty.
  - Added the required column `primarImage` to the `UserPlantCare` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updateAt` to the `UserPlantCare` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Plant" ADD COLUMN     "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updateAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updateAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "UserPlantCare" ADD COLUMN     "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "images" TEXT[],
ADD COLUMN     "label" TEXT NOT NULL,
ADD COLUMN     "primarImage" TEXT NOT NULL,
ADD COLUMN     "updateAt" TIMESTAMP(3) NOT NULL;
