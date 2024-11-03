import { Base } from "../base";
import { Prisma, UserPlantCare as PrismaUserPlantCare } from "@prisma/client";
export type PlantCare = PrismaUserPlantCare;
export namespace PlantCare {
  export namespace Inputs {
    export type Create = Prisma.UserPlantCareCreateInput;
    export type Update = Prisma.UserPlantCareUpdateInput;
  }
  export namespace Args {
    export type Create = Prisma.UserPlantCareUpdateInput;

    export type Update = {
      where: Prisma.UserPlantCareWhereInput;
      data: Prisma.UserPlantCareUpdateInput;
    };

    export type FindMany = {
      cursor?: Prisma.UserPlantCareWhereUniqueInput;
      where?: Prisma.UserPlantCareWhereInput;
      orderBy?: Prisma.UserPlantCareOrderByWithRelationInput;
    } & Base.Args.FindMany;

    export type FindOne = Prisma.UserPlantCareWhereUniqueInput;

    export type Delete = Prisma.UserPlantCareWhereUniqueInput;
  }
}
