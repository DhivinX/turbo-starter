import { z } from 'zod';
import { UseSchema } from '../../common';

export const userUpdateSelfPasswordSchema = z
  .object({
    password: z.string().min(6),
    newPassword: z.string().min(6),
    repeatPassword: z.string().min(6),
  })
  .refine((data) => data.newPassword === data.repeatPassword, {
    message: 'passwords_do_not_match',
    path: ['confirm'],
  });

@UseSchema(userUpdateSelfPasswordSchema)
export class UserUpdateSelfPasswordDto {}
export interface UserUpdateSelfPasswordDto extends z.infer<typeof userUpdateSelfPasswordSchema> {}
