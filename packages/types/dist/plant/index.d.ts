import { Base } from "../base";
import { Prisma, Plant as PrismaPlant } from "@prisma/client";
export type Plant = PrismaPlant;
export declare namespace Plant {
    namespace Inputs {
        type Create = Prisma.PlantUpdateInput;
        type Update = Prisma.PlantUpdateInput;
    }
    namespace Args {
        type Create = Plant.Inputs.Create;
        type Update = {
            where: Prisma.PlantWhereInput;
            data: Plant.Inputs.Update;
        };
        type FindMany = {
            cursor?: Prisma.PlantWhereUniqueInput;
            where?: Prisma.PlantWhereInput;
            orderBy?: Prisma.PlantOrderByWithRelationInput;
        } & Base.Args.FindMany;
        type FoundOne = Prisma.PlantWhereUniqueInput;
        type Delete = Prisma.PlantWhereUniqueInput;
    }
}
