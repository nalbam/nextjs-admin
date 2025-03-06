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
import { users } from './schema/user';
import { products } from './schema/product';

export const db = drizzle(neon(process.env.POSTGRES_URL!));

// Initialize tables
db.execute(sql`
CREATE TYPE IF NOT EXISTS status AS ENUM ('active', 'inactive', 'archived');

CREATE TABLE IF NOT EXISTS users (
  email TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  image_url TEXT,
  provider TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  user_id TEXT REFERENCES users(email),
  image_url TEXT,
  name TEXT NOT NULL,
  description TEXT,
  status status NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  stock INTEGER NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);
`);

export const statusEnum = pgEnum('status', ['active', 'inactive', 'archived']);
export { products } from './schema/product';

export type SelectProduct = typeof products.$inferSelect;
export const insertProductSchema = createInsertSchema(products);

export async function getProducts(
  search: string,
  offset: number,
  status?: 'active' | 'inactive' | 'archived',
  userId?: string
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
  if (userId) {
    conditions.push(eq(products.userId, userId));
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
    .orderBy(desc(products.updatedAt))
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
