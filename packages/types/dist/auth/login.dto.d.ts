import { UserDto } from "../user/user.dto";
declare const loginDto_base: import("@nestjs/common").Type<Pick<UserDto, "email" | "password">>;
export declare class loginDto extends loginDto_base {
}
export {};
