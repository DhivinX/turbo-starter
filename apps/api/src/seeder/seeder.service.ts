import { UsersService } from '@/users/users.service';
import { ConflictException, Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { usersSeedData } from './data/users.seed';
import { timeout, UserCreateDto } from 'shared';
import { User } from '@/db/user.entity';

@Injectable()
export class SeederService implements OnApplicationBootstrap {
  private readonly logger = new Logger(SeederService.name);

  constructor(private readonly usersService: UsersService) {}

  async onApplicationBootstrap() {
    await this.seedUsers(usersSeedData);
  }

  async seedUsers(users: UserCreateDto[]) {
    const userCount = await User.count();

    if (userCount > 0) {
      this.logger.log(`The system already has ${userCount} users. Users seed skipped.`);
      return;
    }

    for (const _user of users) {
      this.logger.verbose(`Creating account: ${_user.email}`);
      await timeout(200);

      try {
        const user = await this.usersService.createOne(_user);
        this.logger.verbose(`Account has been created! ID: ${user.id}`);
      } catch (e) {
        if (e instanceof ConflictException) {
          this.logger.error('The account already exists');
        } else {
          this.logger.error(e);
        }
      }
    }
  }
}
