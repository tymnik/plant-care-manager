/*
  Warnings:

  - You are about to drop the column `images` on the `Plant` table. All the data in the column will be lost.
  - You are about to drop the column `avatar` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `images` on the `UserPlantCare` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[plantId]` on the table `File` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userPlantCareId]` on the table `File` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "File" ADD COLUMN     "isPlantContent" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isUserPlantCareContent" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "plantId" TEXT,
ADD COLUMN     "userPlantCareId" TEXT;

-- AlterTable
ALTER TABLE "Plant" DROP COLUMN "images";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "avatar",
ADD COLUMN     "avatarId" TEXT;

-- AlterTable
ALTER TABLE "UserPlantCare" DROP COLUMN "images";

-- CreateIndex
CREATE UNIQUE INDEX "File_plantId_key" ON "File"("plantId");

-- CreateIndex
CREATE UNIQUE INDEX "File_userPlantCareId_key" ON "File"("userPlantCareId");

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_plantId_fkey" FOREIGN KEY ("plantId") REFERENCES "Plant"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_userPlantCareId_fkey" FOREIGN KEY ("userPlantCareId") REFERENCES "UserPlantCare"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_avatarId_fkey" FOREIGN KEY ("avatarId") REFERENCES "File"("id") ON DELETE SET NULL ON UPDATE CASCADE;
