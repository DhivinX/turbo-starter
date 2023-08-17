import { User } from '@/db/user.entity';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const AuthUser = createParamDecorator((_data, context: ExecutionContext): User => {
  const session = context.switchToHttp().getRequest().userSession;
  if (!session) return undefined;
  return session.user;
});
