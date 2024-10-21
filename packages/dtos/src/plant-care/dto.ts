import { ApiProperty } from "@nestjs/swagger";
import { PlantCare } from "@plant-care/types";
import { Expose } from "class-transformer";
export class PlantCareDto implements PlantCare {
  @Expose()
  @ApiProperty({
    type: [String],
    description: "Array of images url",
    example: ["http://img.jpg", "http://img.jpg"],
  })
  images!: string[];
  @Expose()
  @ApiProperty({
    type: Date,
    description: "Date of the create",
    example: new Date(),
  })
  createAt!: Date;
  @Expose()
  @ApiProperty({
    type: Date,
    description: "Date of the last update",
    example: new Date(),
  })
  updateAt!: Date;
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

  label!: string;
  @ApiProperty({
    type: String,
    description: "Primary image url",
    example: "http://img.jpg",
  })
  primarImage!: string;
}
