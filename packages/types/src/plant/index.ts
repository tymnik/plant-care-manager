import { Base } from "../base";
import { Prisma, Plant as PrismaPlant } from "@prisma/client";
export type Plant = PrismaPlant;
export namespace Plant {
  export namespace Inputs {
    export type Create = Prisma.PlantCreateInput;
    export type Update = Prisma.PlantUpdateInput;
  }
  export namespace Args {
    export type Create = Prisma.PlantUpdateInput;

    export type Update = {
      where: Prisma.PlantWhereInput;
      data: Prisma.PlantUpdateInput;
    };

    export type FindMany = {
      cursor?: Prisma.PlantWhereUniqueInput;
      where?: Prisma.PlantWhereInput;
      orderBy?: Prisma.PlantOrderByWithRelationInput;
    } & Base.Args.FindMany;

    export type FindOne = Prisma.PlantWhereUniqueInput;

    export type Delete = Prisma.PlantWhereUniqueInput;
  }
}
