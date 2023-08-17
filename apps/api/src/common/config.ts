import { ZodError, z } from 'zod';

const configSchema = z.object({
  publicUrl: z.string().default('http://localhost:3000'),
  http: z.object({
    port: z.coerce.number().default(3000),
    cors: z
      .string()
      .transform((val) => JSON.parse(val))
      .pipe(z.array(z.string()).default(['http://localhost'])),
  }),

  db: z.object({
    type: z.string().default('postgres'),
    host: z.string().nullable().optional().default('localhost'),
    port: z.coerce.number().default(5432),
    name: z.string(),
    user: z.string(),
    password: z.string(),
    synchronize: z.coerce.boolean().default(true),
  }),

  secrets: z.object({
    pwdsalt: z.string(),
    jwt: z.string(),
  }),
});

export const config = () => {
  try {
    return configSchema.parse({
      publicUrl: process.env.API_PUBLIC_URL,

      http: {
        port: process.env.API_HTTP_PORT,
        cors: process.env.API_HTTP_CORS,
      },

      db: {
        type: process.env.DATABASE_TYPE,
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT,

        name: process.env.DATABASE_NAME,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        synchronize: process.env.DATABASE_ENABLE_SYNC,
      },

      secrets: {
        pwdsalt: process.env.API_SECRETS_PWDSALT,
        jwt: process.env.API_SECRETS_JWT,
      },
    });
  } catch (err) {
    if (err instanceof ZodError) {
      const first = err.issues[0];
      const path = first.path.join('.');
      throw new Error(`${path} - ${first.message}`);
    }

    throw err;
  }
};
