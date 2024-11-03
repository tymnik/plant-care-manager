import { ApiProperty } from "@nestjs/swagger";
import { File, Plant } from "@plant-care/types";
import { $Enums } from "@prisma/client";
import { Expose, Type } from "class-transformer";
import { FileDto } from "../file/file.dto";

export class PlantDto implements Plant {
  @ApiProperty({
    type: String,
    description: "Name of the plant",
    example: "Rose",
  })
  name!: string;

  @ApiProperty({
    type: Number,
    description: "Unique identifier of the plant",
    example: 1,
  })
  id!: number;

  @ApiProperty({
    type: [String],
    description: "Scientific names of the plant",
    example: ["Rosa"],
  })
  scientificNames!: string[];

  @ApiProperty({
    type: [String],
    description: "Other names of the plant",
    example: ["Rose", "Red Rose"],
  })
  otherNames!: string[];

  @ApiProperty({
    type: [String],
    description: "Images of the plant",
    example: ["https://example.com/rose.jpg"],
  })
  images!: string[];

  @ApiProperty({
    type: String,
    description: "Growth cycle of the plant",
    example: "Annual",
  })
  cycle!: string;

  @ApiProperty({
    type: String, // Use String for enums in Swagger
    description: "Watering frequency for the plant",
    enum: $Enums.WateringFrequency,
    example: $Enums.WateringFrequency.Frequent,
  })
  watering!: $Enums.WateringFrequency;

  @ApiProperty({
    type: String,
    description: "Depth of water requirement for the plant",
    example: "1 inch",
  })
  depthWaterRequirement!: string;

  @ApiProperty({
    type: String,
    description: "Volume of water requirement for the plant",
    example: "1 gallon",
  })
  volumeWaterRequirement!: string;

  @ApiProperty({
    type: String, // Use String for enums in Swagger
    description: "Time of day for watering",
    enum: $Enums.DayTime,
    example: $Enums.DayTime.Morning,
  })
  wateringPeriod!: $Enums.DayTime;

  @ApiProperty({
    type: String,
    description: "General benchmark for watering",
    example: "Water when the soil is dry to the touch",
  })
  wateringGeneralBenchmark!: string;

  @ApiProperty({
    type: [String], // Use array of strings for enum arrays
    description: "Sunlight exposure requirements",
    enum: $Enums.SunlightExposure,
    example: [
      $Enums.SunlightExposure.FullSun,
      $Enums.SunlightExposure.FullShade,
    ],
  })
  sunlight!: $Enums.SunlightExposure[];

  @ApiProperty({
    type: [String], // Use array of strings for enum arrays
    description: "Months for pruning",
    enum: $Enums.Month,
    example: [$Enums.Month.January, $Enums.Month.February],
  })
  pruningMonths!: $Enums.Month[];

  @ApiProperty({
    type: String,
    description: "Number of times to prune",
    example: "1-2 times",
  })
  pruningCount!: string;

  @ApiProperty({
    type: Boolean,
    description: "Whether the plant flowers",
    example: true,
  })
  flowers!: boolean;

  @ApiProperty({
    type: String, // Use String for nullable enums
    description: "Flowering season",
    enum: $Enums.Season,
    example: $Enums.Season.Spring,
    nullable: true, // Indicate nullability for optional properties
  })
  floweringSeason!: $Enums.Season | null;

  @ApiProperty({
    type: Boolean,
    description: "Whether the plant produces fruits",
    example: true,
  })
  fruits!: boolean;

  @ApiProperty({
    type: Boolean,
    description: "Whether the plant produces cones",
    example: false,
  })
  cones!: boolean;

  @ApiProperty({
    type: [String], // Use array of strings for enum arrays
    description: "Fruiting seasons",
    enum: $Enums.Season,
    example: [$Enums.Season.Summer, $Enums.Season.Autumn],
  })
  fruitingSeasons!: $Enums.Season[];

  @ApiProperty({
    type: [String], // Use array of strings for enum arrays
    description: "Harvest seasons",
    enum: $Enums.Season,
    example: [$Enums.Season.Summer, $Enums.Season.Autumn],
  })
  harvestSeasons!: $Enums.Season[];

  @ApiProperty({
    type: String, // Use String for nullable enums
    description: "Harvest methods",
    enum: $Enums.HarvestMethod,
    example: $Enums.HarvestMethod.Picking,
    nullable: true,
  })
  harvestMethods!: $Enums.HarvestMethod | null;

  @ApiProperty({
    type: Boolean,
    description: "Whether the plant has leaves",
    example: true,
  })
  leaf!: boolean;

  @ApiProperty({
    type: String, // Use String for nullable enums
    description: "Growth rate of the plant",
    enum: $Enums.GrowthRate,
    example: $Enums.GrowthRate.High,
    nullable: true,
  })
  growthRate!: $Enums.GrowthRate | null;

  @ApiProperty({
    type: String, // Use String for enums in Swagger
    description: "Maintenance level of the plant",
    enum: $Enums.MaintenanceLevel,
    example: $Enums.MaintenanceLevel.Low,
  })
  maintenance!: $Enums.MaintenanceLevel;

  @ApiProperty({
    type: Boolean,
    description: "Whether the plant has medicinal properties",
    example: true,
  })
  medicinal!: boolean;

  @ApiProperty({
    type: Boolean,
    description: "Whether the plant has edible leaves",
    example: false,
  })
  edibleLeaf!: boolean;

  @ApiProperty({
    type: Boolean,
    description: "Whether the plant is poisonous to humans",
    example: false,
  })
  poisonousToHumans!: boolean;

  @ApiProperty({
    type: Boolean,
    description: "Whether the plant is poisonous to pets",
    example: true,
  })
  poisonousToPets!: boolean;

  @ApiProperty({
    type: Boolean,
    description: "Whether the plant is drought tolerant",
    example: true,
  })
  droughtTolerant!: boolean;

  @ApiProperty({
    type: Boolean,
    description: "Whether the plant is salt tolerant",
    example: false,
  })
  saltTolerant!: boolean;

  @ApiProperty({
    type: Boolean,
    description: "Whether the plant is thorny",
    example: true,
  })
  thorny!: boolean;

  @ApiProperty({
    type: Boolean,
    description: "Whether the plant is invasive",
    example: false,
  })
  invasive!: boolean;

  @ApiProperty({
    type: Boolean,
    description: "Whether the plant is used in cuisine",
    example: true,
  })
  cuisine!: boolean;

  @ApiProperty({
    type: Boolean,
    description: "Whether the plant is suitable for indoor growth",
    example: false,
  })
  indoor!: boolean;

  @ApiProperty({
    type: String, // Use String for enums in Swagger
    description: "Care level of the plant",
    enum: $Enums.CareLevel,
    example: $Enums.CareLevel.Low,
  })
  careLevel!: $Enums.CareLevel;

  @ApiProperty({
    type: String,
    description: "Rarity level of the plant",
    example: "Common",
  })
  rareLevel!: string;

  @ApiProperty({
    type: Boolean,
    description: "Whether the plant is rare",
    example: false,
  })
  rare!: boolean;

  @ApiProperty({
    type: String,
    description: "Description of the plant",
    example: "A beautiful flowering plant.",
  })
  description!: string;
  @ApiProperty({
    type: () => FileDto,
    isArray: true,
    description: "Images associated with the plant",
    required: false,
  })
  @Type(() => FileDto)
  images?: FileDto[];
}
