import { pgTable, serial, text, numeric, integer, timestamp } from 'drizzle-orm/pg-core';
import { users } from './user';

export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  userId: text('user_id').references(() => users.email),
  imageUrl: text('image_url'),
  name: text('name').notNull(),
  description: text('description'),
  status: text('status').notNull(),
  price: numeric('price').notNull(),
  stock: integer('stock').notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull()
});
