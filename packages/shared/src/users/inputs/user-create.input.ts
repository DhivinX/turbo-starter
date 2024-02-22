import { z } from 'zod';
import { Role, UseSchema } from '../../common';

export const userCreateSchema = z.object({
  email: z.string().email().toLowerCase().trim(),
  password: z.string().min(6),
  firstName: z.string().trim().nonempty(),
  lastName: z.string().trim().nonempty(),
  role: z.nativeEnum(Role).optional(),
});

@UseSchema(userCreateSchema)
export class UserCreateDto {}
export interface UserCreateDto extends z.infer<typeof userCreateSchema> {}
