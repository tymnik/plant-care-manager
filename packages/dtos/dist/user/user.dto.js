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
var class_validator_1 = require("class-validator");
var UserDto = /** @class */ (function () {
    function UserDto() {
    }
    __decorate([
        (0, class_transformer_1.Exclude)()
    ], UserDto.prototype, "refreshToken", void 0);
    __decorate([
        (0, swagger_1.ApiProperty)({ description: "Unique identifier of the user", type: Number }),
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsNumber)()
    ], UserDto.prototype, "id", void 0);
    __decorate([
        (0, swagger_1.ApiProperty)({ description: "First name of the user", type: String }),
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsString)()
    ], UserDto.prototype, "firstName", void 0);
    __decorate([
        (0, swagger_1.ApiProperty)({ description: "Last name of the user", type: String }),
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsString)()
    ], UserDto.prototype, "lastName", void 0);
    __decorate([
        (0, swagger_1.ApiProperty)({
            description: "Email of the user",
            example: "example@mail.com",
            type: String,
        }),
        (0, class_validator_1.IsEmail)(),
        (0, class_validator_1.IsString)(),
        (0, class_transformer_1.Expose)()
    ], UserDto.prototype, "email", void 0);
    __decorate([
        (0, swagger_1.ApiProperty)({
            description: "Password of the user",
            writeOnly: true,
            type: String,
        }),
        (0, class_transformer_1.Exclude)(),
        (0, class_validator_1.IsStrongPassword)({
            minLength: 8,
            minUppercase: 1,
            minSymbols: 1,
            minNumbers: 1,
            minLowercase: 1,
        }),
        (0, class_validator_1.IsString)()
    ], UserDto.prototype, "password", void 0);
    return UserDto;
}());
exports.UserDto = UserDto;
