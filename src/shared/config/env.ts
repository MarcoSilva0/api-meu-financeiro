import { z } from 'zod';

export const envSchema = z.object({
  JWT_SECRET: z.string(),
  JWT_EXPIRES_IN: z.string().default('3600'),
  JWT_REFRESH_SECRET: z.string().default('refresh-secret-local'),
  JWT_REFRESH_EXPIRES_IN: z.string().default('604800'),
  PORT: z.string().default('3000'),
  NODE_ENV: z
    .enum(['local', 'development', 'production', 'test'])
    .default('local'),
});

export type Env = z.infer<typeof envSchema>;
