import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

const env = createEnv({
  server: {
    DB_URL: z.string().url(),
    NODE_ENV: z.enum(['development', 'test', 'production']),
    JWT_SECRET: z.string().nonempty(),
  },
  client: {},
  runtimeEnv: {
    DB_URL: process.env.DB_URL,
    NODE_ENV: process.env.NODE_ENV,
    JWT_SECRET: process.env.JWT_SECRET,
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});

export default env;
