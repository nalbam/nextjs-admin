import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { db, products } from '@/lib/db';
import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';

export default async function ProductPage(
  props: {
    params: Promise<{ id: string }>;
  }
) {
  const { id } = await props.params;
  const product = await db
    .select()
    .from(products)
    .where(eq(products.id, parseInt(id)))
    .then(res => res[0]);

  if (!product) {
    notFound();
  }

  return (
    <div className="grid gap-4">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <CardTitle>{product.name}</CardTitle>
            <Badge
              variant={
                product.status === 'archived'
                  ? 'secondary'
                  : product.status === 'inactive'
                  ? 'destructive'
                  : 'outline'
              }
              className="capitalize"
            >
              {product.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="flex items-start gap-4">
              <Image
                alt={product.name}
                className="aspect-square rounded-lg object-cover"
                height={200}
                src={product.imageUrl}
                width={200}
              />
              <div className="grid gap-4">
                <div>
                  <h3 className="font-semibold">Price</h3>
                  <p className="text-lg font-semibold text-primary">${product.price}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Stock</h3>
                  <p>{product.stock} units</p>
                </div>
                <div>
                  <h3 className="font-semibold">Available Date</h3>
                  <p>{product.availableAt.toISOString().split('T')[0]}</p>
                </div>
              </div>
            </div>
            {product.description && (
              <div>
                <h3 className="font-semibold">Description</h3>
                <p className="text-muted-foreground">{product.description}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
