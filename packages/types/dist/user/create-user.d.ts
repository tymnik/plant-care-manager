import { Prisma } from "@prisma/client";
export type CreateUser = Omit<Prisma.UserCreateInput, "refreshToken">;
