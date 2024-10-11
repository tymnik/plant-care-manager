import { AuthResponse } from "./response";
import { RegisterBody as AuthRegisterBody } from "./register.body";
import { LoginBody as AuthLoginBody } from "./login.body";

export namespace Auth {
  export type Response = AuthResponse;
  export type RegisterBody = AuthRegisterBody;
  export type LoginBody = AuthLoginBody;
}
