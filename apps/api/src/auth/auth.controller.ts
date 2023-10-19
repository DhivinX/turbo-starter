import { AuthLoginDto } from 'shared';
import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response, Request } from 'express';
import { AuthSession } from './decorators/auth-session.decorator';
import { AuthLoginResponse } from 'shared';
import { Session } from '@/db/session.entity';
import { Public } from './decorators/public.decorator';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('/login')
  async login(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
    @AuthSession() session: Session,
    @Body() authLoginDto: AuthLoginDto,
  ): Promise<AuthLoginResponse> {
    return this.authService.login(request, response, session, authLoginDto);
  }

  @Post('/logout')
  async logout(
    @AuthSession() session: Session,
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ): Promise<boolean> {
    return this.authService.logout(request, response, session);
  }
}
