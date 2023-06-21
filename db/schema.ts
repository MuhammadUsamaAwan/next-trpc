import { pgTable, uniqueIndex, uuid, varchar } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export const users = pgTable(
  'users',
  {
    id: uuid('id')
      .primaryKey()
      .notNull()
      .default(sql`gen_random_uuid()`),
    name: varchar('name', { length: 30 }).notNull(),
    email: varchar('email', { length: 255 }).notNull(),
    password: varchar('password', { length: 128 }).notNull(),
  },
  table => {
    return {
      emailIdx: uniqueIndex('email_idx').on(table.email),
    };
  }
);
