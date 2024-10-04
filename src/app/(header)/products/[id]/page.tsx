import SingleProductPage from '@/components/products/SingleProductPage';
import { fetchProductById } from '@/lib/api/fetchProducts';
import mapProduct from '@/mappers/productMappers';
import { dehydrate, QueryClient } from '@tanstack/query-core';
import { HydrationBoundary } from '@tanstack/react-query';

export default async function Page({ params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['product', id],
    queryFn: async () => mapProduct(await fetchProductById(id)),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SingleProductPage id={id} />
    </HydrationBoundary>
  );
}
