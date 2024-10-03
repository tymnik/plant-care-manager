import { User } from "@prisma/client";
export declare class UserDto implements User {
    id: number;
    firstName: string;
    lastName: string;
    middleName: string;
    email: string;
    password: string;
}
