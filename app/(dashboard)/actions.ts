'use server';

import { db, products } from '@/lib/db';
import { eq } from 'drizzle-orm';

export async function getProductName(id: string) {
  if (!id || isNaN(parseInt(id))) {
    return id.charAt(0).toUpperCase() + id.slice(1);
  }

  const product = await db
    .select()
    .from(products)
    .where(eq(products.id, parseInt(id)))
    .then(res => res[0]);

  if (!product) {
    return id;
  }

  return product.name;
}
