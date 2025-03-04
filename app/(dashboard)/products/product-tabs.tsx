'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { File, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductsTable } from './products-table';
import { useRouter } from 'next/navigation';
import { SelectProduct } from '@/lib/db';

interface ProductTabsProps {
  products: SelectProduct[];
  offset: number;
  totalProducts: number;
  currentTab: string;
}

export function ProductTabs({ products, offset, totalProducts, currentTab }: ProductTabsProps) {
  const router = useRouter();

  function onTabChange(value: string) {
    const params = new URLSearchParams(window.location.search);
    params.set('tab', value);
    params.delete('offset');
    router.push(`/products?${params.toString()}`);
  }

  return (
    <Tabs defaultValue={currentTab} onValueChange={onTabChange}>
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="draft">Draft</TabsTrigger>
          <TabsTrigger value="archived" className="hidden sm:flex">
            Archived
          </TabsTrigger>
        </TabsList>
        <div className="ml-auto flex items-center gap-2">
          <Button size="sm" variant="outline" className="h-8 gap-1">
            <File className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Export
            </span>
          </Button>
          <Button size="sm" className="h-8 gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add Product
            </span>
          </Button>
        </div>
      </div>
      <TabsContent value={currentTab}>
        <ProductsTable
          products={products}
          offset={offset}
          totalProducts={totalProducts}
        />
      </TabsContent>
    </Tabs>
  );
}
