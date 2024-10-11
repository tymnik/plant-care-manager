import { Auth } from "@plant-care/types";
export declare class AuthResponseDto implements Auth.Response {
    access_token: string;
    refresh_token: string;
}
