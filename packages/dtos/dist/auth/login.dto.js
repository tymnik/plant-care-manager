"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginBodyDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const user_dto_1 = require("../user/user.dto");
class LoginBodyDto extends (0, swagger_1.PickType)(user_dto_1.UserDto, ["email", "password"]) {
}
exports.LoginBodyDto = LoginBodyDto;
