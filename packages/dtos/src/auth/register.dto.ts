import { OmitType } from "@nestjs/swagger";
import { UserDto } from "../user/user.dto";
import { Auth } from "@plant-care/types";
import { Exclude } from "class-transformer";
import { IsString, IsStrongPassword } from "class-validator";

export class RegisterBodyDto
  extends OmitType(UserDto, ["id"] as const)
  implements Auth.RegisterBody {}
