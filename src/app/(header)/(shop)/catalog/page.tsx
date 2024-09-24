import Catalog from '@/components/products/Catalog';
import { fetchProducts } from '@/lib/fetchProducts';

export default async function Page() {
  const prefetchProducts = await fetchProducts();

  return <Catalog initialData={prefetchProducts} />;
}
