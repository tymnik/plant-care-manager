-- CreateTable
CREATE TABLE "Plant" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "scientificNames" TEXT[],
    "otherNames" TEXT[],
    "images" TEXT[],
    "cycle" TEXT NOT NULL,
    "watering" TEXT NOT NULL,
    "depthWaterRequirement" TEXT NOT NULL,
    "volumeWaterRequirement" TEXT NOT NULL,
    "wateringPeriod" TEXT NOT NULL,
    "wateringGeneralBenchmark" TEXT NOT NULL,
    "sunlight" TEXT[],
    "pruningMonths" TEXT[],
    "pruningCount" TEXT NOT NULL,
    "flowers" BOOLEAN NOT NULL,
    "floweringSeason" TEXT NOT NULL,
    "fruits" BOOLEAN NOT NULL,
    "cones" BOOLEAN NOT NULL,
    "fruitingSeasons" TEXT[],
    "harvestSeasons" TEXT[],
    "harvestMethods" TEXT[],
    "leaf" BOOLEAN NOT NULL,
    "growthRate" TEXT NOT NULL,
    "maintenance" TEXT NOT NULL,
    "medicinal" BOOLEAN NOT NULL,
    "edibleLeaf" BOOLEAN NOT NULL,
    "poisonousToHumans" BOOLEAN NOT NULL,
    "poisonousToPets" BOOLEAN NOT NULL,
    "droughtTolerant" BOOLEAN NOT NULL,
    "saltTolerant" BOOLEAN NOT NULL,
    "thorny" BOOLEAN NOT NULL,
    "invasive" BOOLEAN NOT NULL,
    "cuisine" BOOLEAN NOT NULL,
    "indoor" BOOLEAN NOT NULL,
    "careLevel" TEXT NOT NULL,
    "rareLevel" TEXT NOT NULL,
    "rare" BOOLEAN NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Plant_pkey" PRIMARY KEY ("id")
);
