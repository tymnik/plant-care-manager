import { AuthResponse } from "./response";
import { RegisterBody as AuthRegisterBody } from "./register.body";
import { User } from "../user";
import { Prisma, User as PrismaUser } from "@prisma/client";

export namespace Auth {
  export type Response = AuthResponse;
  export type RegisterBody = any;
  export type LoginBody = any;
}
