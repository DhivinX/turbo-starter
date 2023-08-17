import { UsersModule } from '@/users/users.module';
import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';

@Module({
  imports: [UsersModule],
  providers: [SeederService],
})
export class SeederModule {}
