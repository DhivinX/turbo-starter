import { ScheduleModule } from '@nestjs/schedule';
import { Module } from '@nestjs/common';
import { CronService } from './cron.service';
import { AuthModule } from '@/auth/auth.module';

@Module({
  imports: [ScheduleModule.forRoot(), AuthModule],
  providers: [CronService],
})
export class CronModule {}
