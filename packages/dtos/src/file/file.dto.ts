import { SerializeOptions } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { File } from "@plant-care/types";
import { Exclude } from "class-transformer";
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from "class-validator";

@SerializeOptions({ type: FileDto })
export class FileDto implements File {
  @Exclude()
  plantId!: string | null;
  @Exclude()
  isPlantContent!: boolean;
  @Exclude()
  isUserPlantCareContent!: boolean;
  @Exclude()
  userPlantCareId!: string | null;
  @ApiProperty({ type: String, description: "The name of the file" })
  @IsNotEmpty()
  @IsString()
  @Exclude()
  name!: string;

  @ApiProperty({
    type: String,
    description: "The ID of the file",
    format: "uuid",
  })
  @IsNotEmpty()
  @IsUUID()
  id!: string;

  @ApiProperty({ type: String, description: "The path of the file" })
  @IsNotEmpty()
  @IsString()
  @Exclude()
  path!: string;

  @ApiProperty({ type: String, description: "The original name of the file" })
  @IsNotEmpty()
  @IsString()
  original!: string;

  @ApiProperty({ type: Object, description: "The scales of the file" })
  @IsNotEmpty()
  scales!: any; // TODO: Define the type for scales

  @ApiProperty({ type: Date, description: "The creation date of the file" })
  @IsNotEmpty()
  @IsDate()
  createdAt!: Date;

  @ApiProperty({ type: Date, description: "The last updated date of the file" })
  @IsNotEmpty()
  @IsDate()
  updatedAt!: Date;

  @ApiProperty({
    type: Boolean,
    description: "Indicates if the file is admin content",
  })
  @IsNotEmpty()
  @IsBoolean()
  @Exclude()
  isAdminContent!: boolean;

  @ApiProperty({
    type: Boolean,
    description: "Indicates if the file is an avatar",
  })
  @IsNotEmpty()
  @IsBoolean()
  @Exclude()
  isAvatar!: boolean;

  @ApiProperty({
    type: String,
    description: "The ID of the user who uploaded the file",
    required: false,
    format: "uuid",
    nullable: true,
  })
  @IsOptional()
  @IsUUID()
  @Exclude()
  userId!: string | null;
}
