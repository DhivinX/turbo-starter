import { Session } from '@/db/session.entity';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const AuthSession = createParamDecorator((_data, context: ExecutionContext): Session => {
  return context.switchToHttp().getRequest().userSession;
});
