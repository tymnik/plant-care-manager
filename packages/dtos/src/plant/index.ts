import { OmitType, PartialType, PickType } from "@nestjs/swagger";
import * as Test from "./plant.dto";
import { Plant as PlantType } from "@plant-care/types";

export class PlantCreateBodyDto
  extends OmitType(Test.PlantDto, ["id"] as const)
  implements PlantType.Inputs.Create {}
export class PlantUpdateBodyDto
  extends PartialType(Test.PlantDto)
  implements PlantType.Inputs.Update {}
export class PlantIdPathParamsDto extends PickType(Test.PlantDto, [
  "id",
] as const) {}
export class PlantResponseDto extends Test.PlantDto {}
export class PlantFindManyQueryDto extends Test.PlantDto {}
