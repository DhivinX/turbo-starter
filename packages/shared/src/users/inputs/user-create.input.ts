import { z } from 'zod';
import { UseSchema, Role } from '../../common';

export const userCreateSchema = z.object({
  email: z.string().email().toLowerCase().trim(),
  password: z.string().min(6),
  firstName: z.string().trim(),
  lastName: z.string().trim(),
  role: z.nativeEnum(Role).optional(),
});

@UseSchema(userCreateSchema)
export class UserCreateDto {}
export interface UserCreateDto extends z.infer<typeof userCreateSchema> {}
