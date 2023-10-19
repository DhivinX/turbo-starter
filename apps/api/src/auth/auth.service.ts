import { AuthLoginDto, AuthLoginResponse } from 'shared';
import { ConfigService } from '@nestjs/config';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Response, Request } from 'express';
import { v4 as uuid } from 'uuid';
import { sign } from 'jsonwebtoken';
import { LessThan } from 'typeorm';
import { JwtPayload } from './strategies/jwt.strategy';
import { hashPassword } from './utils/hash-password';
import { User } from '@/db/user.entity';
import { Session } from '@/db/session.entity';
import { UsersService } from '@/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {}

  async login(
    request: Request,
    response: Response,
    oldSession: Session,
    authLoginDto: AuthLoginDto,
  ): Promise<AuthLoginResponse> {
    const user = await User.findOne({
      where: {
        email: authLoginDto.email,
        hash: hashPassword(
          authLoginDto.password,
          this.configService.get<string>('secrets.pwdsalt'),
        ),
      },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid login data');
    }

    if (oldSession && oldSession.user.id !== user.id) {
      await this.logout(request, response, oldSession);
      oldSession = null;
    }

    let maxAge: number = 24 * 60 * 60 * 1000;
    if (authLoginDto.remember) maxAge = 365 * 24 * 60 * 60 * 1000;

    const expirationTime = Date.now() + maxAge;

    const session = await this.generateSession(
      oldSession,
      user,
      expirationTime,
      authLoginDto.cookies,
    );

    const signedToken = this.createToken(session.token);

    if (authLoginDto.cookies) {
      const secure =
        this.configService.get<boolean>('http.secure') ||
        request.header('X-Forwarded-Proto') === 'https';

      response.cookie('jwt', signedToken, {
        secure: secure,
        sameSite: secure ? 'none' : 'lax',
        httpOnly: true,
        maxAge,
      });
    }

    const account = this.usersService.getProfile(session.user);

    return {
      token: authLoginDto.cookies ? undefined : signedToken,
      expirationTime,
      account,
    };
  }

  async logout(request: Request, response: Response, session: Session): Promise<boolean> {
    await session.remove();

    const secure =
      this.configService.get<boolean>('http.secure') ||
      request.header('X-Forwarded-Proto') === 'https';

    response.clearCookie('jwt', {
      secure: secure,
      sameSite: secure ? 'none' : 'lax',
      httpOnly: true,
    });

    return true;
  }

  private createToken(token: string): string {
    const payload: JwtPayload = {
      id: token,
    };

    const accessToken: string = sign(payload, this.configService.get<string>('secrets.jwt'));
    return accessToken;
  }

  private async generateSession(
    session: Session,
    user: User,
    expirationTime: number,
    cookies: boolean,
  ): Promise<Session> {
    let token: string;
    let sessionWithThisToken: Session | null = null;

    do {
      token = uuid() as string;
      sessionWithThisToken = await Session.findOne({
        where: {
          token,
        },
      });
    } while (sessionWithThisToken);

    if (session) {
      session.token = token;
      session.exp = expirationTime;
      session.cookies = cookies;
    } else {
      session = new Session();
      session.user = user;
      session.token = token;
      session.exp = expirationTime;
      session.cookies = cookies;
    }

    await session.save();

    return session;
  }

  async cleanExpiredSessions(): Promise<number> {
    const { affected } = await Session.delete({
      exp: LessThan(Date.now()),
    });

    return affected;
  }
}
