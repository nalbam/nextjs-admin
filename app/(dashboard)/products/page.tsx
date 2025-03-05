import { getProducts } from '@/lib/db';
import { ProductTabs } from './product-tabs';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function ProductsPage(
  props: {
    searchParams: Promise<{ q?: string; offset?: string; tab?: string }>;
  }
) {
  const session = await auth();
  if (!session?.user?.email) {
    redirect('/login');
  }

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
    status,
    session.user.email
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
