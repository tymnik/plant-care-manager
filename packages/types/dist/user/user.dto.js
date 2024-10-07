"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var class_transformer_1 = require("class-transformer");
var UserDto = /** @class */ (function () {
    function UserDto() {
    }
    __decorate([
        (0, swagger_1.ApiProperty)({ description: "Unique identifier of the user" }),
        (0, class_transformer_1.Expose)()
    ], UserDto.prototype, "id", void 0);
    __decorate([
        (0, swagger_1.ApiProperty)({ description: "First name of the user" }),
        (0, class_transformer_1.Expose)()
    ], UserDto.prototype, "firstName", void 0);
    __decorate([
        (0, swagger_1.ApiProperty)({ description: "Last name of the user" }),
        (0, class_transformer_1.Expose)()
    ], UserDto.prototype, "lastName", void 0);
    __decorate([
        (0, swagger_1.ApiProperty)({ description: "Middle name of the user" }),
        (0, class_transformer_1.Expose)()
    ], UserDto.prototype, "middleName", void 0);
    __decorate([
        (0, swagger_1.ApiProperty)({
            description: "Email of the user",
            example: "example@mail.com",
        }),
        (0, class_transformer_1.Expose)()
    ], UserDto.prototype, "email", void 0);
    __decorate([
        (0, swagger_1.ApiProperty)({ description: "Password of the user", writeOnly: true }),
        (0, class_transformer_1.Exclude)()
    ], UserDto.prototype, "password", void 0);
    return UserDto;
}());
exports.UserDto = UserDto;
