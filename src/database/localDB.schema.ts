import { int, varchar, index, mysqlTable, timestamp } from 'drizzle-orm/mysql-core';

// ------------------------------------------ tables ------------------------------------------

export const user = mysqlTable(
  'user',
  {
    id: int('id').primaryKey().autoincrement().unique(),
    name: varchar('name', { length: 255 }).notNull(),
    phone: varchar('phone', { length: 20 }).notNull(),
    email: varchar('email', { length: 255 }).notNull(),
    password: varchar('password', { length: 255 }).notNull(),
    createdAt: timestamp('createdAt').defaultNow(),
    updatedAt: timestamp('updatedAt').defaultNow(),
  },
  (user) => {
    return {
      nameIdx: index('user_name_idx').on(user.name),
      emailIdx: index('user_email_idx').on(user.email),
    };
  },
);

// ------------------------------------------ schema ------------------------------------------

export const localSchema = { user };
