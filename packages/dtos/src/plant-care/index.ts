import { ApiProperty, OmitType, PartialType, PickType } from "@nestjs/swagger";
import * as Test from "./dto";
import { PlantCare } from "@plant-care/types";
import { Prisma } from "@prisma/client";

export class PlantCareCreateBodyDto
  extends OmitType(Test.PlantCareDto, [
    "id",
    "createAt",
    "updateAt",
    "images",
  ] as const)
  implements PlantCare.Inputs.Create
{
  plant!: Prisma.PlantCreateNestedOneWithoutUsersPlantCareInput;
  user!: Prisma.UserCreateNestedOneWithoutPlantCareInput;
}
export class PlantCareUpdateBodyDto
  extends PartialType(OmitType(Test.PlantCareDto, ["images"]))
  implements PlantCare.Inputs.Update {}
export class PlantCareIdPathParamsDto extends PickType(Test.PlantCareDto, [
  "id",
] as const) {}
export class PlantCareResponseDto extends Test.PlantCareDto {}
export class PlantCareFindManyQueryDto extends Test.PlantCareDto {}
