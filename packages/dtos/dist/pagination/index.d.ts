import { ApiProperty } from "@nestjs/swagger";

export declare class PaginationQuery {
  page?: number;
  perPage?: number;
}
export declare enum SortOrder {
  Asc = "asc",
  Desc = "desc",
}
export declare class FindManyDto extends PaginationQuery {
  orderBy?: string;
  order?: SortOrder;
}
export declare class PaginationDto {
  meta: {
    total: number;
    lastPage: number;
    currentPage: number;
    perPage: number;
    prev: number | null;
    next: number | null;
  };
}
