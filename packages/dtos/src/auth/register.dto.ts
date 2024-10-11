import { OmitType, PickType } from "@nestjs/swagger";
import { UserDto } from "../user/user.dto";
import { Auth } from "@plant-care/types";

export class RegisterBodyDto
  extends OmitType(UserDto, ["id"] as const)
  implements Auth.RegisterBody {}
