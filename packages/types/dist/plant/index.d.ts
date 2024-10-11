import { Base } from "../base";
import { Prisma, Plant as PrismaPlant } from "@prisma/client";
export type Plant = PrismaPlant;
export declare namespace Plant {
    namespace Inputs {
        type Create = Prisma.PlantUpdateInput;
        type Update = Prisma.PlantUpdateInput;
    }
    namespace Args {
        type Create = Prisma.PlantUpdateInput;
        type Update = {
            where: Prisma.PlantWhereInput;
            data: Prisma.PlantUpdateInput;
        };
        type FindMany = {
            cursor?: Prisma.PlantWhereUniqueInput;
            where?: Prisma.PlantWhereInput;
            orderBy?: Prisma.PlantOrderByWithRelationInput;
        } & Base.Args.FindMany;
        type FindOne = Prisma.PlantWhereUniqueInput;
        type Delete = Prisma.PlantWhereUniqueInput;
    }
}
