// src/auth/current-user.decorator.ts
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (field: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    // 若有指定欄位（例如 user_id），就回傳 user.user_id
    return field ? user?.[field] : user;
  },
);
