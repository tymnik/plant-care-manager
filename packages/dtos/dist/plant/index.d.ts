import * as Test from "./plant.dto";
import { Plant as PlantType } from "@plant-care/types";
declare const PlantCreateBodyDto_base: import("@nestjs/common").Type<Omit<Test.PlantDto, "id">>;
export declare class PlantCreateBodyDto extends PlantCreateBodyDto_base implements PlantType.Inputs.Create {
}
declare const PlantUpdateBodyDto_base: import("@nestjs/common").Type<Partial<Test.PlantDto>>;
export declare class PlantUpdateBodyDto extends PlantUpdateBodyDto_base implements PlantType.Inputs.Update {
}
declare const PlantIdPathParamsDto_base: import("@nestjs/common").Type<Pick<Test.PlantDto, "id">>;
export declare class PlantIdPathParamsDto extends PlantIdPathParamsDto_base {
}
export declare class PlantResponseDto extends Test.PlantDto {
}
export declare class PlantFindManyQueryDto extends Test.PlantDto {
}
export {};
