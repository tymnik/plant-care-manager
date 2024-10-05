import { PickType } from "@nestjs/swagger";
import { UserDto } from "../user/user.dto";
import { LoginBody } from "@plant-care/types";

export class LoginBodyDto
  extends PickType(UserDto, ["email", "password"] as const)
  implements LoginBody {}