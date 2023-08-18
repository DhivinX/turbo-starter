import { z } from 'zod';
import { UseSchema, Role } from '../../common';
import { userUpdateSelfSchema } from './user-update-self.input';

export const userUpdateSchema = userUpdateSelfSchema.extend({
  password: z
    .string()
    .optional()
    .superRefine((val, ctx) => {
      if (val && val.length > 0 && val.length < 6) {
        ctx.addIssue({
          code: z.ZodIssueCode.too_small,
          minimum: 6,
          type: 'string',
          inclusive: true,
        });
      }
    }),
  isActive: z.boolean(),
  role: z.nativeEnum(Role).optional(),
});

@UseSchema(userUpdateSchema)
export class UserUpdateDto {}
export interface UserUpdateDto extends z.infer<typeof userUpdateSchema> {}
