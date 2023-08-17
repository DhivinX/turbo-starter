import { Role, UserCreateDto } from 'shared';

export const usersSeedData: UserCreateDto[] = [
  {
    email: 'admin@admin.com',
    password: '123456',
    role: Role.Admin,
    firstName: 'John',
    lastName: 'Doe',
  },
  {
    email: 'user@user.com',
    password: '123456',
    role: Role.User,
    firstName: 'Adam',
    lastName: 'Smith',
  },
];
