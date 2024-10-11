import { UserDto } from "../user/user.dto";
import { Auth } from "@plant-care/types";
declare const RegisterBodyDto_base: import("@nestjs/common").Type<Omit<UserDto, "id">>;
export declare class RegisterBodyDto extends RegisterBodyDto_base implements Auth.RegisterBody {
}
export {};
