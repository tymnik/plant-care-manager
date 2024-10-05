import { User } from "@prisma/client";
export declare class UserDto implements User {
    refreshToken: string | null;
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}
