import { Base } from "../base";
import { Prisma, User as PrismaUser } from "@prisma/client";
export type User = PrismaUser;
export declare namespace User {
    namespace Inputs {
        type Create = Prisma.UserUpdateInput;
        type Update = Prisma.UserUpdateInput;
    }
    namespace Args {
        type Create = Prisma.UserCreateInput;
        type Update = {
            where: Prisma.UserWhereUniqueInput;
            data: Prisma.UserUpdateInput;
        };
        type FindMany = {
            cursor?: Prisma.UserWhereUniqueInput;
            where?: Prisma.UserWhereInput;
            orderBy?: Prisma.UserOrderByWithRelationInput;
        } & Base.Args.FindMany;
        type FindOne = Prisma.UserWhereUniqueInput;
        type Delete = Prisma.UserWhereUniqueInput;
    }
}
