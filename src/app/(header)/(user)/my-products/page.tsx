import { fetchProductsByUserId } from '@/lib/fetchProducts';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import MyProducts from '@/components/products/MyProducts';
import { AuthOptions } from 'next-auth';
import { dehydrate, QueryClient } from '@tanstack/query-core';
import { HydrationBoundary } from '@tanstack/react-query';

const Page = async () => {
  const session = await getServerSession(authOptions as AuthOptions);
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['myProducts'],
    queryFn: () => fetchProductsByUserId(session?.id!, session?.accessToken!),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MyProducts />
    </HydrationBoundary>
  );
};

export default Page;
