import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const AuthenticatedUser = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.user; // Gibt die User-Daten aus `request.user` zurück
});
