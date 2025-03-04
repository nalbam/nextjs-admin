'use server';

import { db, products } from '@/lib/db';
import { eq } from 'drizzle-orm';
import { revalidateTag } from 'next/cache';

export async function updateProductStatus(formData: FormData) {
  const id = Number(formData.get('id'));
  const status = formData.get('status') as 'active' | 'inactive' | 'archived';

  await db
    .update(products)
    .set({ status })
    .where(eq(products.id, id));

  revalidateTag('products');
}

export async function deleteProduct(formData: FormData) {
  const id = Number(formData.get('id'));
  await db.delete(products).where(eq(products.id, id));
  revalidateTag('products');
}
