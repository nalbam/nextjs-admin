import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  email: text('email').primaryKey(),
  name: text('name').notNull(),
  imageUrl: text('image_url'),
  provider: text('provider').notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull()
});
