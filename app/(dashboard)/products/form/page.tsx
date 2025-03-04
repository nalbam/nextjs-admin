import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { db, products } from '@/lib/db';
import { eq } from 'drizzle-orm';
import { saveProduct } from '../actions';
import { notFound } from 'next/navigation';

export default async function ProductFormPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  let product = null;
  const params = await searchParams;
  const id = params?.id;

  if (id && !Array.isArray(id)) {
    const productId = parseInt(id);
    if (!isNaN(productId)) {
      product = await db
        .select()
        .from(products)
        .where(eq(products.id, productId))
        .then((res) => res[0]);

      if (!product) {
        notFound();
      }
    }
  }

  return (
    <div className="grid gap-4">
      <Card>
        <CardHeader>
          <CardTitle>{product ? 'Edit Product' : 'Add New Product'}</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={saveProduct} className="grid gap-4">
            {product && <Input type="hidden" name="id" value={product.id.toString()} />}

            <div className="grid gap-2">
              <label htmlFor="name">Product Name</label>
              <Input
                id="name"
                name="name"
                defaultValue={product?.name}
                required
              />
            </div>

            <div className="grid gap-2">
              <label htmlFor="description">Description</label>
              <Textarea
                id="description"
                name="description"
                defaultValue={product?.description || ''}
              />
            </div>

            <div className="grid gap-2">
              <label htmlFor="imageUrl">Image URL</label>
              <Input
                id="imageUrl"
                name="imageUrl"
                type="url"
                defaultValue={product?.imageUrl}
                required
              />
            </div>

            <div className="grid gap-2">
              <label htmlFor="price">Price</label>
              <Input
                id="price"
                name="price"
                type="number"
                min="0"
                step="0.01"
                defaultValue={product?.price}
                required
              />
            </div>

            <div className="grid gap-2">
              <label htmlFor="stock">Stock</label>
              <Input
                id="stock"
                name="stock"
                type="number"
                min="0"
                step="1"
                defaultValue={product?.stock}
                required
              />
            </div>

            <div className="grid gap-2">
              <label htmlFor="status">Status</label>
              <Select name="status" defaultValue={product?.status || 'active'}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" className="w-full">
              {product ? 'Update Product' : 'Add Product'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
