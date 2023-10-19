import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthUser } from '@/auth/decorators/auth-user.decorator';
import { User } from '@/db/user.entity';
import {
  UserCreateDto,
  UserProfileResponse,
  UserUpdateDto,
  UserUpdateSelfDto,
  UserUpdateSelfPasswordDto,
  PaginationResponse,
  PaginationDto,
} from 'shared';

@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/self')
  async getSelf(@AuthUser() user: User) {
    return this.usersService.getProfile(user);
  }

  @Put('/self')
  async updateSelf(
    @AuthUser() user: User,
    @Body() userUpdateSelfDto: UserUpdateSelfDto,
  ): Promise<UserProfileResponse> {
    return await this.usersService.updateSelf(user, userUpdateSelfDto);
  }

  @Put('/self/password')
  async updateSelfPassword(
    @AuthUser() user: User,
    @Body() userUpdateSelfPasswordDto: UserUpdateSelfPasswordDto,
  ): Promise<UserProfileResponse> {
    return await this.usersService.updateSelfPassword(user, userUpdateSelfPasswordDto);
  }

  @Post('/')
  async createOne(@Body() userCreateDto: UserCreateDto): Promise<UserProfileResponse> {
    return await this.usersService.createOne(userCreateDto);
  }

  @Get('/')
  async getMany(
    @Query() paginationDto: PaginationDto,
  ): Promise<PaginationResponse<UserProfileResponse>> {
    return await this.usersService.getMany(paginationDto);
  }

  @Get('/:id')
  async getOne(@Param('id', ParseUUIDPipe) id: string): Promise<UserProfileResponse> {
    return await this.usersService.getOne(id);
  }

  @Put('/:id')
  async updateOne(
    @AuthUser() user: User,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() userUpdateDto: UserUpdateDto,
  ): Promise<UserProfileResponse> {
    if (id === user.id) throw new ForbiddenException();
    return await this.usersService.updateOne(id, userUpdateDto);
  }

  @Delete('/:id')
  async deleteOne(@Param('id', ParseUUIDPipe) id: string): Promise<number> {
    return await this.usersService.deleteOne(id);
  }
}
