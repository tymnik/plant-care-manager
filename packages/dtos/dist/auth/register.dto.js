"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterBodyDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const user_dto_1 = require("../user/user.dto");
class RegisterBodyDto extends (0, swagger_1.OmitType)(user_dto_1.UserDto, ["id"]) {
}
exports.RegisterBodyDto = RegisterBodyDto;
