import { ApiProperty } from "@nestjs/swagger";
import { User } from "@prisma/client";
import { Exclude, Expose } from "class-transformer";
import { IsEmail, IsNumber, IsString, IsStrongPassword } from "class-validator";
export class UserDto implements User {
  @Exclude()
  refreshToken!: string | null;
  @ApiProperty({ description: "Unique identifier of the user" })
  @Expose()
  @IsNumber()
  id!: number;

  @ApiProperty({ description: "First name of the user" })
  @Expose()
  @IsString()
  firstName!: string;

  @ApiProperty({ description: "Last name of the user" })
  @Expose()
  @IsString()
  lastName!: string;

  @ApiProperty({ description: "Middle name of the user" })
  @Expose()
  @IsString()
  middleName!: string;

  @ApiProperty({
    description: "Email of the user",
    example: "example@mail.com",
  })
  @IsEmail()
  @IsString()
  @Expose()
  email!: string;

  @ApiProperty({ description: "Password of the user", writeOnly: true })
  @Exclude()
  @IsStrongPassword({
    minLength: 8,
    minUppercase: 1,
    minSymbols: 1,
    minNumbers: 1,
    minLowercase: 1,
  })
  @IsString()
  password!: string;
}
