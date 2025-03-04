'use server';

import { db, products } from '@/lib/db';
import { eq } from 'drizzle-orm';
import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

export async function saveProduct(formData: FormData) {
  const id = formData.get('id') as string;
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const imageUrl = formData.get('imageUrl') as string;
  const price = formData.get('price') as string;
  const stock = formData.get('stock') as string;
  const status = formData.get('status') as 'active' | 'inactive' | 'archived';

  const productData = {
    name,
    description,
    imageUrl,
    price: parseFloat(price).toString(),
    stock: parseInt(stock),
    status,
    availableAt: new Date(new Date().toISOString().split('T')[0]),
  };

  if (id) {
    await db
      .update(products)
      .set(productData)
      .where(eq(products.id, parseInt(id)));
  } else {
    await db.insert(products).values(productData);
  }

  revalidateTag('products');
  redirect('/products');
}

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
