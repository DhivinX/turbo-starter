import { z } from 'zod';
import { UseSchema, Role } from '../../common';
import { userUpdateSelfSchema } from './user-update-self.input';

export const userUpdateSchema = userUpdateSelfSchema.extend({
  password: z.string().length(0).nullable().or(z.string().min(6)),
  isActive: z.boolean(),
  role: z.nativeEnum(Role).optional(),
});

@UseSchema(userUpdateSchema)
export class UserUpdateDto {}
export interface UserUpdateDto extends z.infer<typeof userUpdateSchema> {}
