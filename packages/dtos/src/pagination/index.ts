import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsOptional, IsNumber, IsEnum, IsString, Max } from "class-validator";

export class PaginationQuery {
  @ApiPropertyOptional({
    type: Number,
    description: "Optional page number for pagination",
    example: 1,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  page?: number;

  @ApiPropertyOptional({
    type: Number,
    description: "Optional number of items per page",
    example: 10,
  })
  @Max(20)
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  perPage?: number;
}

export enum SortOrder {
  Asc = "asc",
  Desc = "desc",
}

export class FindManyDto extends PaginationQuery {
  @ApiPropertyOptional({
    type: String,
    description: 'Optional field name to order by (e.g., "name", "createdAt")',
    example: "name",
  })
  @IsOptional()
  @IsString()
  orderBy?: string;

  @ApiPropertyOptional({
    enum: SortOrder,
    description: "Optional sort order (default: asc)",
    example: SortOrder.Asc,
  })
  @IsOptional()
  @IsEnum(SortOrder)
  order?: SortOrder = SortOrder.Asc; // Default to ascending order
}

export class PaginationDto<T> {}
