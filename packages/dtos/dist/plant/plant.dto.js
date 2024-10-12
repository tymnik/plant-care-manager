"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlantDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
class PlantDto {
}
exports.PlantDto = PlantDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: "Name of the plant",
        example: "Rose",
    })
], PlantDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        description: "Unique identifier of the plant",
        example: 1,
    })
], PlantDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [String],
        description: "Scientific names of the plant",
        example: ["Rosa"],
    })
], PlantDto.prototype, "scientificNames", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [String],
        description: "Other names of the plant",
        example: ["Rose", "Red Rose"],
    })
], PlantDto.prototype, "otherNames", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [String],
        description: "Images of the plant",
        example: ["https://example.com/rose.jpg"],
    })
], PlantDto.prototype, "images", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: "Growth cycle of the plant",
        example: "Annual",
    })
], PlantDto.prototype, "cycle", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String, // Use String for enums in Swagger
        description: "Watering frequency for the plant",
        enum: client_1.$Enums.WateringFrequency,
        example: client_1.$Enums.WateringFrequency.Frequent,
    })
], PlantDto.prototype, "watering", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: "Depth of water requirement for the plant",
        example: "1 inch",
    })
], PlantDto.prototype, "depthWaterRequirement", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: "Volume of water requirement for the plant",
        example: "1 gallon",
    })
], PlantDto.prototype, "volumeWaterRequirement", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String, // Use String for enums in Swagger
        description: "Time of day for watering",
        enum: client_1.$Enums.DayTime,
        example: client_1.$Enums.DayTime.Morning,
    })
], PlantDto.prototype, "wateringPeriod", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: "General benchmark for watering",
        example: "Water when the soil is dry to the touch",
    })
], PlantDto.prototype, "wateringGeneralBenchmark", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [String], // Use array of strings for enum arrays
        description: "Sunlight exposure requirements",
        enum: client_1.$Enums.SunlightExposure,
        example: [
            client_1.$Enums.SunlightExposure.FullSun,
            client_1.$Enums.SunlightExposure.FullShade,
        ],
    })
], PlantDto.prototype, "sunlight", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [String], // Use array of strings for enum arrays
        description: "Months for pruning",
        enum: client_1.$Enums.Month,
        example: [client_1.$Enums.Month.January, client_1.$Enums.Month.February],
    })
], PlantDto.prototype, "pruningMonths", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: "Number of times to prune",
        example: "1-2 times",
    })
], PlantDto.prototype, "pruningCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Boolean,
        description: "Whether the plant flowers",
        example: true,
    })
], PlantDto.prototype, "flowers", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String, // Use String for nullable enums
        description: "Flowering season",
        enum: client_1.$Enums.Season,
        example: client_1.$Enums.Season.Spring,
        nullable: true, // Indicate nullability for optional properties
    })
], PlantDto.prototype, "floweringSeason", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Boolean,
        description: "Whether the plant produces fruits",
        example: true,
    })
], PlantDto.prototype, "fruits", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Boolean,
        description: "Whether the plant produces cones",
        example: false,
    })
], PlantDto.prototype, "cones", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [String], // Use array of strings for enum arrays
        description: "Fruiting seasons",
        enum: client_1.$Enums.Season,
        example: [client_1.$Enums.Season.Summer, client_1.$Enums.Season.Autumn],
    })
], PlantDto.prototype, "fruitingSeasons", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [String], // Use array of strings for enum arrays
        description: "Harvest seasons",
        enum: client_1.$Enums.Season,
        example: [client_1.$Enums.Season.Summer, client_1.$Enums.Season.Autumn],
    })
], PlantDto.prototype, "harvestSeasons", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String, // Use String for nullable enums
        description: "Harvest methods",
        enum: client_1.$Enums.HarvestMethod,
        example: client_1.$Enums.HarvestMethod.Picking,
        nullable: true,
    })
], PlantDto.prototype, "harvestMethods", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Boolean,
        description: "Whether the plant has leaves",
        example: true,
    })
], PlantDto.prototype, "leaf", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String, // Use String for nullable enums
        description: "Growth rate of the plant",
        enum: client_1.$Enums.GrowthRate,
        example: client_1.$Enums.GrowthRate.High,
        nullable: true,
    })
], PlantDto.prototype, "growthRate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String, // Use String for enums in Swagger
        description: "Maintenance level of the plant",
        enum: client_1.$Enums.MaintenanceLevel,
        example: client_1.$Enums.MaintenanceLevel.Low,
    })
], PlantDto.prototype, "maintenance", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Boolean,
        description: "Whether the plant has medicinal properties",
        example: true,
    })
], PlantDto.prototype, "medicinal", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Boolean,
        description: "Whether the plant has edible leaves",
        example: false,
    })
], PlantDto.prototype, "edibleLeaf", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Boolean,
        description: "Whether the plant is poisonous to humans",
        example: false,
    })
], PlantDto.prototype, "poisonousToHumans", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Boolean,
        description: "Whether the plant is poisonous to pets",
        example: true,
    })
], PlantDto.prototype, "poisonousToPets", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Boolean,
        description: "Whether the plant is drought tolerant",
        example: true,
    })
], PlantDto.prototype, "droughtTolerant", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Boolean,
        description: "Whether the plant is salt tolerant",
        example: false,
    })
], PlantDto.prototype, "saltTolerant", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Boolean,
        description: "Whether the plant is thorny",
        example: true,
    })
], PlantDto.prototype, "thorny", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Boolean,
        description: "Whether the plant is invasive",
        example: false,
    })
], PlantDto.prototype, "invasive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Boolean,
        description: "Whether the plant is used in cuisine",
        example: true,
    })
], PlantDto.prototype, "cuisine", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Boolean,
        description: "Whether the plant is suitable for indoor growth",
        example: false,
    })
], PlantDto.prototype, "indoor", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String, // Use String for enums in Swagger
        description: "Care level of the plant",
        enum: client_1.$Enums.CareLevel,
        example: client_1.$Enums.CareLevel.Low,
    })
], PlantDto.prototype, "careLevel", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: "Rarity level of the plant",
        example: "Common",
    })
], PlantDto.prototype, "rareLevel", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Boolean,
        description: "Whether the plant is rare",
        example: false,
    })
], PlantDto.prototype, "rare", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: "Description of the plant",
        example: "A beautiful flowering plant.",
    })
], PlantDto.prototype, "description", void 0);
