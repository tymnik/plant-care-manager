import { ApiProperty } from "@nestjs/swagger";
import { PlantCare } from "@plant-care/types";
import { Expose } from "class-transformer";
export class PlantCareDto implements PlantCare {
  @Expose()
  @ApiProperty({
    type: Number,
    description: "Unique identifier of the plant care",
    example: 1,
  })
  id!: number;
  @Expose()
  @ApiProperty({
    type: Number,
    description: "Unique identifier of the plant",
    example: 1,
  })
  plantId!: number;
  @Expose()
  @ApiProperty({
    type: Number,
    description: "Unique identifier of the user",
    example: 1,
  })
  userId!: number;
  @Expose()
  @ApiProperty({
    type: Date,
    description: "Date of the last plant watering ",
    example: new Date(),
  })
  lastWateringTime!: Date | null;
}