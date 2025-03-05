import { getProducts } from '@/lib/db';
import { ProductTabs } from './product-tabs';

export default async function ProductsPage(
  props: {
    searchParams: Promise<{ q?: string; offset?: string; tab?: string }>;
  }
) {
  const { q, offset, tab } = await props.searchParams;
  const search = q ?? '';
  const currentOffset = offset ?? 0;
  const currentTab = tab ?? 'all';

  const status = currentTab === 'all' ? undefined :
                currentTab === 'inactive' ? 'inactive' :
                currentTab as 'active' | 'inactive' | 'archived';

  const { products, newOffset, totalProducts } = await getProducts(
    search,
    Number(currentOffset),
    status
  );

  return (
    <ProductTabs
      products={products}
      offset={Number(currentOffset)}
      totalProducts={totalProducts}
      currentTab={currentTab}
    />
  );
}
