import SingleProductPage from '@/components/products/SingleProductPage';
import { fetchProductById } from '@/lib/api/fetchProducts';
import mapProduct from '@/mappers/productMappers';
import { dehydrate, QueryClient } from '@tanstack/query-core';
import { HydrationBoundary } from '@tanstack/react-query';
import { revalidatePath } from 'next/cache'

export default async function Page({ params }: { params: { id: string } }) {
  // const id = parseInt(params.id);
  // revalidatePath(`/products/${id}`);
  // const queryClient = new QueryClient();
  // const data = await queryClient.prefetchQuery({
  //   queryKey: ['product', id],
  //   queryFn: async () => {
  //     const reqData = await fetchProductById(id, '*');
  //     return mapProduct(reqData);
  //   },
  // });
  // return (
  //   <HydrationBoundary state={dehydrate(queryClient)}>
  //     <SingleProductPage id={id} />
  //   </HydrationBoundary>
  // );
  
  const id = parseInt(params.id);
  // revalidatePath(`/products/${id}`);
  // const reqData = await fetchProductById(id, '*');
  // console.log(reqData);
  return <SingleProductPage id={id} />;
}
