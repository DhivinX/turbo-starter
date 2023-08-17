import { AuthService } from '@/auth/auth.service';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class CronService {
  private readonly logger = new Logger(CronService.name);

  constructor(private readonly authService: AuthService) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async cleanExpiredSessions() {
    const affected = await this.authService.cleanExpiredSessions();
    this.logger.log(`Cleaned up ${affected} expired user sessions`);
  }
}
