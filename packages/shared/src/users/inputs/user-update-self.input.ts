import { z } from 'zod';
import { UseSchema } from '../../common';

export const userUpdateSelfSchema = z.object({
  firstName: z.string().trim(),
  lastName: z.string().trim(),
  position: z.string().trim().nullable(),
});

@UseSchema(userUpdateSelfSchema)
export class UserUpdateSelfDto {}
export interface UserUpdateSelfDto extends z.infer<typeof userUpdateSelfSchema> {}
