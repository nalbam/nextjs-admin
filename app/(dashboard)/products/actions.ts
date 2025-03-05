'use server';

import { db, products } from '@/lib/db';
import { eq } from 'drizzle-orm';
import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';

export async function saveProduct(formData: FormData) {
  const session = await auth();
  if (!session?.user?.email) {
    throw new Error('Not authenticated');
  }
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
    updatedAt: new Date(),
    createdAt: new Date(),
    userId: session.user.email
  };

  if (id) {
    // Check if the product belongs to the user
    const existingProduct = await db
      .select()
      .from(products)
      .where(eq(products.id, parseInt(id)))
      .then(res => res[0]);

    if (!existingProduct || existingProduct.userId !== session.user.email) {
      throw new Error('Not authorized');
    }

    // Remove createdAt from update data
    const { createdAt, ...updateData } = productData;

    await db
      .update(products)
      .set(updateData)
      .where(eq(products.id, parseInt(id)));
  } else {
    await db.insert(products).values(productData);
  }

  revalidateTag('products');
  redirect('/products');
}

export async function updateProductStatus(formData: FormData) {
  const session = await auth();
  if (!session?.user?.email) {
    throw new Error('Not authenticated');
  }

  const id = Number(formData.get('id'));
  const status = formData.get('status') as 'active' | 'inactive' | 'archived';

  // Check if the product belongs to the user
  const product = await db
    .select()
    .from(products)
    .where(eq(products.id, id))
    .then(res => res[0]);

  if (!product || product.userId !== session.user.email) {
    throw new Error('Not authorized');
  }

  await db
    .update(products)
    .set({ status, updatedAt: new Date() })
    .where(eq(products.id, id));

  revalidateTag('products');
}

export async function deleteProduct(formData: FormData) {
  const session = await auth();
  if (!session?.user?.email) {
    throw new Error('Not authenticated');
  }

  const id = Number(formData.get('id'));

  // Check if the product belongs to the user
  const product = await db
    .select()
    .from(products)
    .where(eq(products.id, id))
    .then(res => res[0]);

  if (!product || product.userId !== session.user.email) {
    throw new Error('Not authorized');
  }

  await db.delete(products).where(eq(products.id, id));
  revalidateTag('products');
}
