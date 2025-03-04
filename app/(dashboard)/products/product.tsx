import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { TableCell, TableRow } from '@/components/ui/table';
import { SelectProduct } from '@/lib/db';
import { deleteProduct, updateProductStatus } from './actions';

export function Product({ product }: { product: SelectProduct }) {
  return (
    <TableRow className="cursor-pointer hover:bg-muted/50" onClick={() => window.location.href = `/products/form?id=${product.id}`}>
      <TableCell className="hidden sm:table-cell">
        <Image
          alt="Product image"
          className="aspect-square rounded-md object-cover"
          height="64"
          src={product.imageUrl}
          width="64"
        />
      </TableCell>
      <TableCell className="font-medium">{product.name}</TableCell>
      <TableCell>
        <Badge
          variant={
            product.status === 'archived'
              ? 'secondary'
              : product.status === 'inactive'
              ? 'destructive'
              : 'default'
          }
          className={
            product.status === 'active'
              ? 'bg-green-100 text-green-700 hover:bg-green-100 hover:text-green-700 capitalize'
              : 'capitalize'
          }
        >
          {product.status}
        </Badge>
      </TableCell>
      <TableCell className="hidden md:table-cell">{`$${product.price}`}</TableCell>
      <TableCell className="hidden md:table-cell">{product.stock}</TableCell>
      <TableCell className="hidden md:table-cell">
        {product.availableAt.toISOString().split('T')[0]}
      </TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem asChild>
              <form
                action={updateProductStatus}
                onClick={(e) => e.stopPropagation()}
              >
                <input type="hidden" name="id" value={product.id} />
                <input type="hidden" name="status" value="active" />
                <button type="submit" className="w-full text-left text-green-700 hover:text-green-700">
                  Active
                </button>
              </form>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <form
                action={updateProductStatus}
                onClick={(e) => e.stopPropagation()}
              >
                <input type="hidden" name="id" value={product.id} />
                <input type="hidden" name="status" value="inactive" />
                <button type="submit" className="w-full text-left text-destructive hover:text-destructive">
                  Inactive
                </button>
              </form>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <form
                action={updateProductStatus}
                onClick={(e) => e.stopPropagation()}
              >
                <input type="hidden" name="id" value={product.id} />
                <input type="hidden" name="status" value="archived" />
                <button type="submit" className="w-full text-left text-secondary-foreground hover:text-secondary-foreground">
                  Archived
                </button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
