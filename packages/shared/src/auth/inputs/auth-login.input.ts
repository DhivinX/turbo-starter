import { z } from 'zod';
import { UseSchema } from '../../common';

export const authLoginSchema = z.object({
  email: z.string().email().toLowerCase().trim(),
  password: z.string().min(6),
  remember: z.boolean(),
  cookies: z.boolean(),
});

@UseSchema(authLoginSchema)
export class AuthLoginDto {}
export interface AuthLoginDto extends z.infer<typeof authLoginSchema> {}
