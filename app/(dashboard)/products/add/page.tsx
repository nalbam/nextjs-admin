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
          <CardTitle>새 상품 추가</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={addProduct} className="grid gap-4">
            <div className="grid gap-2">
              <label htmlFor="name">상품명</label>
              <Input id="name" name="name" required />
            </div>

            <div className="grid gap-2">
              <label htmlFor="description">설명</label>
              <Textarea id="description" name="description" />
            </div>

            <div className="grid gap-2">
              <label htmlFor="imageUrl">이미지 URL</label>
              <Input id="imageUrl" name="imageUrl" type="url" required />
            </div>

            <div className="grid gap-2">
              <label htmlFor="price">가격</label>
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
              <label htmlFor="stock">재고</label>
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
              <label htmlFor="status">상태</label>
              <Select name="status" defaultValue="active">
                <SelectTrigger>
                  <SelectValue placeholder="상태 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" className="w-full">
              상품 추가
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
