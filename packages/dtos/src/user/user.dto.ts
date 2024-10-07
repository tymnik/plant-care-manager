import { ApiProperty } from "@nestjs/swagger";
import { User } from "@prisma/client";
import { Exclude, Expose } from "class-transformer";
import { IsEmail, IsNumber, IsString, IsStrongPassword } from "class-validator";
export class UserDto implements User {
  @Exclude()
  refreshToken!: string | null;
  @ApiProperty({ description: "Unique identifier of the user", type: Number })
  @Expose()
  @IsNumber()
  id!: number;

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

  @ApiProperty({
    description: "Password of the user",
    writeOnly: true,
    type: String,
  })
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
