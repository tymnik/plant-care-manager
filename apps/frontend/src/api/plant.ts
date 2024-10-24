import axios from "axios";

import { Plant } from "../types/Plant";

export const fetchPlants = async (): Promise<Plant[]> => {
  const response = await axios.get("/plant");
  const data = response.data;
  return data.map((plant: Plant) => ({
    name: plant.name,
    id: plant.id,
    scientificNames: plant.scientificNames || [],
    otherNames: plant.otherNames || [],
    images: plant.images || [],
    cycle: plant.cycle,
    watering: plant.watering,
    wateringGeneralBenchmark: plant.wateringGeneralBenchmark,
    sunlight: plant.sunlight,
    pruningMonths: plant.pruningMonths,
    pruningCount: plant.pruningCount,
    flowers: plant.flowers,
    floweringSeason: plant.floweringSeason,
    fruits: plant.fruits,
    fruitingSeasons: plant.fruitingSeasons || [],
    harvestSeasons: plant.harvestSeasons || [],
    harvestMethods: plant.harvestMethods,
    growthRate: plant.growthRate,
    maintenance: plant.maintenance,
    medicinal: plant.medicinal,
    edibleLeaf: plant.edibleLeaf,
    poisonousToHumans: plant.poisonousToHumans,
    poisonousToPets: plant.poisonousToPets,
    cuisine: plant.cuisine,
    indoor: plant.indoor,
    careLevel: plant.careLevel,
    rareLevel: plant.rareLevel,
    rare: plant.rare,
    description: plant.description,
  }));
};
