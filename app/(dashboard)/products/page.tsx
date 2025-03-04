import { getProducts } from '@/lib/db';
import { ProductTabs } from './product-tabs';

export default async function ProductsPage(
  props: {
    searchParams: Promise<{ q: string; offset: string; tab: string }>;
  }
) {
  const searchParams = await props.searchParams;
  const search = searchParams.q ?? '';
  const offset = searchParams.offset ?? 0;
  const tab = searchParams.tab ?? 'all';

  const status = tab === 'all' ? undefined :
                tab === 'draft' ? 'inactive' :
                tab as 'active' | 'inactive' | 'archived';

  const { products, newOffset, totalProducts } = await getProducts(
    search,
    Number(offset),
    status
  );

  return (
    <ProductTabs
      products={products}
      offset={Number(offset)}
      totalProducts={totalProducts}
      currentTab={tab}
    />
  );
}
