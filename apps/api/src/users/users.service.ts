import crypto from 'crypto';
import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from '@/db/user.entity';
import { hashPassword } from '@/auth/utils/hash-password';
import { ConfigService } from '@nestjs/config';
import {
  UserProfileResponse,
  UserCreateDto,
  UserUpdateDto,
  UserUpdateSelfDto,
  UserUpdateSelfPasswordDto,
  PaginationResponse,
  PaginationDto,
} from 'shared';

@Injectable()
export class UsersService {
  constructor(private readonly configService: ConfigService) {}

  getProfile(user: User): UserProfileResponse {
    const { ...restUser } = user;
    const avatar = this.getAvatar(restUser.email);
    return { ...restUser, avatar };
  }

  private updateProfile(user: User, userUpdateSelfDto: UserUpdateSelfDto): User {
    user.firstName = userUpdateSelfDto.firstName;
    user.lastName = userUpdateSelfDto.lastName;
    user.position = userUpdateSelfDto.position;
    return user;
  }

  private getAvatar(email: string): string {
    const hash = crypto.createHash('md5').update(email.toLowerCase()).digest('hex');
    const avatar = `https://www.gravatar.com/avatar/${hash}?s=200&d=mp`;
    return avatar;
  }

  async updateSelf(user: User, userUpdateSelfDto: UserUpdateSelfDto): Promise<UserProfileResponse> {
    user = this.updateProfile(user, userUpdateSelfDto);

    await user.save();
    return this.getProfile(user);
  }

  async updateSelfPassword(
    user: User,
    userUpdateSelfPasswordDto: UserUpdateSelfPasswordDto
  ): Promise<UserProfileResponse> {
    const oldHash = hashPassword(
      userUpdateSelfPasswordDto.password,
      this.configService.get<string>('secrets.pwdsalt')
    );

    if (user.hash === oldHash) {
      user.hash = hashPassword(
        userUpdateSelfPasswordDto.newPassword,
        this.configService.get<string>('secrets.pwdsalt')
      );
    } else {
      throw new ForbiddenException('Wrong password');
    }

    await user.save();
    return this.getProfile(user);
  }

  async createOne(userCreateDto: UserCreateDto): Promise<UserProfileResponse> {
    const countSameEmailUser = await User.countBy({ email: userCreateDto.email });

    if (countSameEmailUser > 0)
      throw new ConflictException('A user with this email address already exists');

    const user: User = new User();

    user.email = userCreateDto.email;
    user.hash = hashPassword(
      userCreateDto.password,
      this.configService.get<string>('secrets.pwdsalt')
    );
    user.firstName = userCreateDto.firstName;
    user.lastName = userCreateDto.lastName;
    if (userCreateDto.role) user.role = userCreateDto.role;

    await user.save();
    return this.getProfile(user);
  }

  async getMany(paginationDto: PaginationDto): Promise<PaginationResponse<UserProfileResponse>> {
    const queryBuilder = User.createQueryBuilder('users');

    if (paginationDto.filter)
      queryBuilder.where(
        `LOWER(CONCAT(users.firstName, ' ', users.lastName, ' ', users.email)) LIKE :filter`,
        {
          filter: `%${paginationDto.filter.toLowerCase()}%`,
        }
      );

    queryBuilder.take(paginationDto.take).skip((paginationDto.page - 1) * paginationDto.take);

    switch (paginationDto.sortBy) {
      case 'name':
        queryBuilder.addOrderBy('users.firstName', paginationDto.descending ? 'DESC' : 'ASC');
        queryBuilder.addOrderBy('users.lastName', paginationDto.descending ? 'DESC' : 'ASC');
        break;
      case 'role':
        queryBuilder.addOrderBy('users.role', paginationDto.descending ? 'DESC' : 'ASC');
        break;
      case 'createdAt':
        queryBuilder.addOrderBy('users.createdAt', paginationDto.descending ? 'DESC' : 'ASC');
        break;
      default:
        queryBuilder.addOrderBy('users.role', 'ASC');
    }

    const [foundUsers, total] = await queryBuilder.getManyAndCount();

    return {
      page: paginationDto.page,
      pages: Math.ceil(total / paginationDto.take),
      total: total,
      elements: foundUsers.map(this.getProfile.bind(this)),
    };
  }

  async getOne(id: string): Promise<UserProfileResponse> {
    const foundUser = await User.findOneBy({ id });

    if (!foundUser) throw new NotFoundException();
    return this.getProfile(foundUser);
  }

  async updateOne(id: string, userUpdateDto: UserUpdateDto): Promise<UserProfileResponse> {
    const foundUser = await User.findOneBy({ id });

    if (!foundUser) throw new NotFoundException();

    const user = this.updateProfile(foundUser, userUpdateDto);

    if (userUpdateDto.password.length)
      user.hash = hashPassword(
        userUpdateDto.password,
        this.configService.get<string>('secrets.pwdsalt')
      );

    user.isActive = userUpdateDto.isActive;
    user.role = userUpdateDto.role;

    await user.save();
    return this.getProfile(user);
  }

  async deleteOne(id: string): Promise<number> {
    const query = await User.delete({ id });

    if (query.affected === 0) throw new NotFoundException();
    return query.affected;
  }
}
