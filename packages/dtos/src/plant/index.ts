import { OmitType, PartialType, PickType } from "@nestjs/swagger";
import * as Test from "./plant.dto";
import { Plant as PlantType } from "@plant-care/types";
import { Prisma } from "@prisma/client";

export class PlantCreateBodyDto
  extends OmitType(Test.PlantDto, ["id", "images"] as const)
  implements PlantType.Inputs.Create
{
  id?: string | undefined;
  usersPlantCare?:
    | Prisma.UserPlantCareCreateNestedManyWithoutPlantInput
    | undefined;
}
export class PlantUpdateBodyDto
  extends PartialType(OmitType(Test.PlantDto, ["images"]))
  implements PlantType.Inputs.Update
{
  usersPlantCare?:
    | Prisma.UserPlantCareUpdateManyWithoutPlantNestedInput
    | undefined;
}
export class PlantIdPathParamsDto extends PickType(Test.PlantDto, [
  "id",
] as const) {}
export class PlantResponseDto extends Test.PlantDto {}
export class PlantFindManyQueryDto extends Test.PlantDto {}
