/*
  Warnings:

  - The primary key for the `File` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `large` on the `File` table. All the data in the column will be lost.
  - You are about to drop the column `medium` on the `File` table. All the data in the column will be lost.
  - You are about to drop the column `thumbnail` on the `File` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `File` table. All the data in the column will be lost.
  - The primary key for the `Plant` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `UserPlantCare` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[original]` on the table `File` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `File` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `path` to the `File` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserPlantCare" DROP CONSTRAINT "UserPlantCare_plantId_fkey";

-- DropForeignKey
ALTER TABLE "UserPlantCare" DROP CONSTRAINT "UserPlantCare_userId_fkey";

-- AlterTable
ALTER TABLE "File" DROP CONSTRAINT "File_pkey",
DROP COLUMN "large",
DROP COLUMN "medium",
DROP COLUMN "thumbnail",
DROP COLUMN "type",
ADD COLUMN     "isAdminContent" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isAvatar" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "path" TEXT NOT NULL,
ADD COLUMN     "scales" JSONB,
ADD COLUMN     "userId" TEXT,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "File_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "File_id_seq";

-- AlterTable
ALTER TABLE "Plant" DROP CONSTRAINT "Plant_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Plant_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Plant_id_seq";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ADD COLUMN     "avatar" TEXT,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- AlterTable
ALTER TABLE "UserPlantCare" DROP CONSTRAINT "UserPlantCare_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "plantId" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "UserPlantCare_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "UserPlantCare_id_seq";

-- CreateIndex
CREATE UNIQUE INDEX "File_original_key" ON "File"("original");

-- CreateIndex
CREATE UNIQUE INDEX "File_userId_key" ON "File"("userId");

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPlantCare" ADD CONSTRAINT "UserPlantCare_plantId_fkey" FOREIGN KEY ("plantId") REFERENCES "Plant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPlantCare" ADD CONSTRAINT "UserPlantCare_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
