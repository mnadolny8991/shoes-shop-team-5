import SingleProductPage from '@/components/products/SingleProductPage';
import { fetchProductById } from '@/lib/api/fetchProducts';
import mapProduct from '@/mappers/productMappers';
import { dehydrate, QueryClient } from '@tanstack/query-core';
import { HydrationBoundary } from '@tanstack/react-query';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function Page({ params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  const queryClient = new QueryClient();
  let dehydratedState;

  try {
    await queryClient.fetchQuery({
      queryKey: ['product', id],
      queryFn: async () => {
        const reqData = await fetchProductById(id, '*', { cache: 'no-store' });
        return mapProduct(reqData);
      },
    });
    dehydratedState = dehydrate(queryClient);
  } catch (error) {
    dehydratedState = null;
  }

  return (
    <HydrationBoundary state={dehydratedState}>
      {dehydratedState ? <SingleProductPage id={id} /> : notFound()}
    </HydrationBoundary>
  );
}
