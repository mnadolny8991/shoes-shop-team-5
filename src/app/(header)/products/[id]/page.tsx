import SingleProductPage from '@/components/products/SingleProductPage';
import { fetchProductById } from '@/lib/api/fetchProducts';
import mapProduct from '@/mappers/productMappers';
import { dehydrate, hydrate, QueryClient } from '@tanstack/query-core';
import { HydrationBoundary } from '@tanstack/react-query';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';

export default async function Page({ params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const reqData = await fetchProductById(id, '*', { cache: 'no-store' });
      return mapProduct(reqData);
    },
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SingleProductPage id={id} />
    </HydrationBoundary>
  );

  // const id = parseInt(params.id);
  // return <SingleProductPage id={id} />;
}
