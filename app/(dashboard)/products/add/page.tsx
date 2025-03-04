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
import { db, products, statusEnum } from '@/lib/db';
import { redirect } from 'next/navigation';

async function addProduct(formData: FormData) {
  'use server';

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

  await db.insert(products).values(productData);

  redirect('/products');
}

export default function AddProductPage() {
  return (
    <div className="grid gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Add New Product</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={addProduct} className="grid gap-4">
            <div className="grid gap-2">
              <label htmlFor="name">Product Name</label>
              <Input id="name" name="name" required />
            </div>

            <div className="grid gap-2">
              <label htmlFor="description">Description</label>
              <Textarea id="description" name="description" />
            </div>

            <div className="grid gap-2">
              <label htmlFor="imageUrl">Image URL</label>
              <Input id="imageUrl" name="imageUrl" type="url" required />
            </div>

            <div className="grid gap-2">
              <label htmlFor="price">Price</label>
              <Input
                id="price"
                name="price"
                type="number"
                min="0"
                step="0.01"
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
                required
              />
            </div>

            <div className="grid gap-2">
              <label htmlFor="status">Status</label>
              <Select name="status" defaultValue="active">
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
              Add Product
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
