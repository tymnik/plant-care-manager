import { User } from "@plant-care/types";
import { UserDto } from "./user.dto";
import { ApiProperty, PickType } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";
import { PlantCareDto } from "../plant-care/dto";

export class UserWithPlantsDto
  extends PickType(UserDto, ["id"] as const)
  implements User.Response.WithPlantCare
{
  @Exclude()
  refreshToken!: string | null;
  @Exclude()
  firstName!: string;
  @Exclude()
  lastName!: string;
  @Exclude()
  email!: string;
  @Exclude()
  password!: string;
  @Expose()
  @ApiProperty({
    type: PlantCareDto,
  })
  plantCare!: PlantCareDto[];
}
