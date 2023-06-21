import type { Config } from 'drizzle-kit';

export default {
  schema: './db/schema.ts',
  out: './db/migrations',
  dbCredentials: {
    connectionString: process.env.DB_URL as string,
  },
  driver: 'pg',
} satisfies Config;
