import 'server-only';

import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { sql } from 'drizzle-orm';
import {
  pgTable,
  text,
  numeric,
  integer,
  timestamp,
  pgEnum,
  serial
} from 'drizzle-orm/pg-core';
import { count, eq, ilike, and, desc } from 'drizzle-orm';
import { createInsertSchema } from 'drizzle-zod';
import { slackSettings } from './schema/slack';

export const db = drizzle(neon(process.env.POSTGRES_URL!));

// Initialize tables
db.execute(sql`
  CREATE TABLE IF NOT EXISTS slack_settings (
    id SERIAL PRIMARY KEY,
    settings JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
  );
`);

export const statusEnum = pgEnum('status', ['active', 'inactive', 'archived']);

export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  imageUrl: text('image_url').notNull(),
  name: text('name').notNull(),
  description: text('description'),
  status: statusEnum('status').notNull(),
  price: numeric('price', { precision: 10, scale: 2 }).notNull(),
  stock: integer('stock').notNull(),
  availableAt: timestamp('available_at').notNull()
});

export type SelectProduct = typeof products.$inferSelect;
export const insertProductSchema = createInsertSchema(products);

export async function getProducts(
  search: string,
  offset: number,
  status?: 'active' | 'inactive' | 'archived',
  options?: { tags?: string[] }
): Promise<{
  products: SelectProduct[];
  newOffset: number | null;
  totalProducts: number;
}> {
  // Build where conditions
  const conditions = [];
  if (search) {
    conditions.push(ilike(products.name, `%${search}%`));
  }
  if (status) {
    conditions.push(eq(products.status, status));
  }

  // Get total count with filters
  const totalProducts = await db
    .select({ count: count() })
    .from(products)
    .where(and(...conditions));
  const total = totalProducts[0].count;

  // Get filtered and paginated results
  const result = await db
    .select()
    .from(products)
    .where(and(...conditions))
    .orderBy(desc(products.availableAt))
    .limit(3)
    .offset(offset);

  return {
    products: result,
    newOffset: offset + 3 < total ? offset + 3 : null,
    totalProducts: total
  };
}

export async function deleteProductById(id: number) {
  await db.delete(products).where(eq(products.id, id));
}
