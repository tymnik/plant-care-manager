import { Base } from "../base";
import { Prisma, User as PrismaUser } from "@prisma/client";
export type User = PrismaUser;
export namespace User {
  export namespace Inputs {
    export type Create = Prisma.UserUpdateInput;
    export type Update = Prisma.UserUpdateInput;
  }
  export namespace Args {
    export type Create = Prisma.UserCreateInput;
    export type Update = {
      where: Prisma.UserWhereInput;
      data: Prisma.UserUpdateInput;
    };
    export type FindMany = {
      cursor?: Prisma.UserWhereUniqueInput;
      where?: Prisma.UserWhereInput;
      orderBy?: Prisma.UserOrderByWithRelationInput;
    } & Base.FindManyArgs;
    export type FoundOne = Prisma.UserWhereUniqueInput;

    export type Delete = Prisma.UserWhereUniqueInput;
  }
}
