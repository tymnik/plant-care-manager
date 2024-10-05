import { UserDto } from "../user/user.dto";
declare const registerDto_base: import("@nestjs/common").Type<Omit<UserDto, "id">>;
export declare class registerDto extends registerDto_base {
}
export {};
