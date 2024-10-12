"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindManyDto = exports.SortOrder = exports.PaginationQuery = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class PaginationQuery {
}
exports.PaginationQuery = PaginationQuery;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: Number,
        description: "Optional page number for pagination",
        example: 1,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Type)(() => Number)
], PaginationQuery.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: Number,
        description: "Optional number of items per page",
        example: 10,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Type)(() => Number)
], PaginationQuery.prototype, "perPage", void 0);
var SortOrder;
(function (SortOrder) {
    SortOrder["Asc"] = "asc";
    SortOrder["Desc"] = "desc";
})(SortOrder || (exports.SortOrder = SortOrder = {}));
class FindManyDto extends PaginationQuery {
    constructor() {
        super(...arguments);
        this.order = SortOrder.Asc; // Default to ascending order
    }
}
exports.FindManyDto = FindManyDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: String,
        description: 'Optional field name to order by (e.g., "name", "createdAt")',
        example: "name",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)()
], FindManyDto.prototype, "orderBy", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        enum: SortOrder,
        description: "Optional sort order (default: asc)",
        example: SortOrder.Asc,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(SortOrder)
], FindManyDto.prototype, "order", void 0);
