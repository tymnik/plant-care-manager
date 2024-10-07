import { createParamDecorator, ExecutionContext } from '@nestjs/common';
export type AuthUser = {
  sub: string;
  email: string;
  refresh_token?: string;
};
export const AuthUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
