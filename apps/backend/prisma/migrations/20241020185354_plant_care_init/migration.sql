-- CreateTable
CREATE TABLE "UserPlantCare" (
    "id" SERIAL NOT NULL,
    "plantId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "lastWateringTime" TIMESTAMP(3),

    CONSTRAINT "UserPlantCare_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserPlantCare" ADD CONSTRAINT "UserPlantCare_plantId_fkey" FOREIGN KEY ("plantId") REFERENCES "Plant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPlantCare" ADD CONSTRAINT "UserPlantCare_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
