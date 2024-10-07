import { UserDto } from "../user/user.dto";
import { LoginBody } from "@plant-care/types";
declare const LoginBodyDto_base: import("@nestjs/common").Type<Pick<UserDto, "email" | "password">>;
export declare class LoginBodyDto extends LoginBodyDto_base implements LoginBody {
}
export {};
