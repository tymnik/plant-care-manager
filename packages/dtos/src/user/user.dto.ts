import { SerializeOptions } from "@nestjs/common";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { User } from "@prisma/client";
import { Exclude, Expose, Type } from "class-transformer";
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsStrongPassword,
  IsUrl,
  IsUUID,
} from "class-validator";
import { FileDto } from "../file/file.dto";
@SerializeOptions({ type: UserDto })
export class UserDto implements User {
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
  @Exclude()
  refreshToken!: string | null;

  @ApiProperty({ description: "First name of the user", type: String })
  @Expose()
  @IsString()
  firstName!: string;

  @ApiProperty({ description: "Last name of the user", type: String })
  @Expose()
  @IsString()
  lastName!: string;

  @ApiProperty({
    description: "Email of the user",
    example: "example@mail.com",
    type: String,
  })
  @IsEmail()
  @IsString()
  @Expose()
  email!: string;
  @IsNotEmpty()
  @ApiProperty({
    description: "Password of the user",
    writeOnly: true,
    type: String,
  })
  @IsStrongPassword({
    minLength: 8,
    minSymbols: 1,
    minUppercase: 1,
    minNumbers: 1,
    minLowercase: 1,
  })
  @Exclude({ toPlainOnly: true })
  password!: string;
  @ApiProperty({ description: "Unique identifier of the user", type: String })
  @Expose()
  @IsUUID()
  id!: string;
  avatarId!: string;
  @ApiPropertyOptional({
    type: FileDto,
    description: "Avatar of the user",
  })
  @Type(() => FileDto)
  @Expose()
  avatar!: FileDto;
}
