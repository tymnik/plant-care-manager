import { OmitType, PartialType, PickType } from "@nestjs/swagger";
import * as Test from "./file.dto";
import { File as FileType } from "@plant-care/types";

export class FileCreateBodyDto
  extends OmitType(Test.FileDto, ["id"] as const)
  implements FileType.Inputs.Create {}
export class FileUpdateBodyDto
  extends PartialType(Test.FileDto)
  implements FileType.Inputs.Update {}
export class FileIdPathParamsDto extends PickType(Test.FileDto, [
  "id",
] as const) {}
export class FileResponseDto extends Test.FileDto {}
export class FileFindManyQueryDto extends Test.FileDto {}
