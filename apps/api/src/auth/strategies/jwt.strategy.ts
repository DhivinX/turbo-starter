import { Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { Session } from '@/db/session.entity';

export interface JwtPayload {
  id: string;
}

function tokenExtractor(req: any): null | string {
  const bearerToken =
    req.headers.authorization && req.headers.authorization.includes('Bearer ')
      ? req.headers.authorization.replace('Bearer ', '')
      : null;

  if (bearerToken) return bearerToken;
  else return req && req.cookies ? (req.cookies?.jwt as string) ?? null : null;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: tokenExtractor,
      secretOrKey: configService.get<string>('secrets.jwt'),
    });
  }

  async validate(payload: JwtPayload) {
    if (!payload || !payload.id) {
      throw new UnauthorizedException();
    }

    const userSession = await Session.findOne({
      relations: ['user'],

      where: {
        token: payload.id,
      },
    });

    if (!userSession) {
      throw new UnauthorizedException();
    }

    userSession.lastSeen = new Date();
    userSession.save();

    return userSession;
  }
}
