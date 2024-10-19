import { ApiProperty } from "@nestjs/swagger";
import { Auth } from "@plant-care/types";
export class AuthResponseDto implements Auth.Response {
  @ApiProperty({
    type: String,
    description: "JWT access token used for accessing protected resources",
    example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  })
  access_token!: string;

  @ApiProperty({
    type: String,
    description:
      "JWT refresh token used for renewing the access token when it expires",
    example: "def50200e1d5ac...",
  })
  refresh_token!: string;

  // @ApiProperty({
  //   description:
  //     "Time when the access token will expire, in seconds from the issue time",
  //   example: "3600",
  // })
  // expires_at!: string;

  // @ApiProperty({
  //   description: "Time when the access token was issued, in seconds",
  //   example: "3600",
  // })
  // issued_at!: string;

  // @ApiProperty({
  //   description: "Time in seconds until the refresh token will expire",
  //   example: "86400",
  // })
  // refresh_expires_in!: string;
}
