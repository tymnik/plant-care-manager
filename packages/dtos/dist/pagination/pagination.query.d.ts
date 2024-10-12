export declare class PaginationQuery {
    page?: number;
    perPage?: number;
}
export declare enum SortOrder {
    Asc = "asc",
    Desc = "desc"
}
export declare class FindManyDto extends PaginationQuery {
    orderBy?: string;
    order?: SortOrder;
}
