import { OmitType, PickType } from "@nestjs/swagger";
import { UserDto } from "../user/user.dto";
import { RegisterBody } from "@plant-care/types";

export class RegisterBodyDto
  extends OmitType(UserDto, ["id"] as const)
  implements RegisterBody {}
