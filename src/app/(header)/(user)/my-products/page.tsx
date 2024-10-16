import { fetchProductsByUserId } from '@/lib/api/fetchProducts';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import MyProducts from '@/components/products/MyProducts';
import { AuthOptions } from 'next-auth';
import { dehydrate, QueryClient } from '@tanstack/query-core';
import { HydrationBoundary } from '@tanstack/react-query';
import { mapProductList } from '@/mappers/productMappers';
import pageSize from '@/data/pageSize';

const Page = async ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined | null };
}) => {
  const session = await getServerSession(authOptions as AuthOptions);
  const queryClient = new QueryClient();
  const page = searchParams?.page ? parseInt(searchParams.page as string) : 1;
  await queryClient.prefetchQuery({
    queryKey: ['myProducts'],
    queryFn: async () =>
      mapProductList(
        await fetchProductsByUserId(
          session?.id!,
          session?.accessToken!,
          '*',
          'updatedAt',
          'desc',
          page,
          1
        )
      ),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MyProducts />
    </HydrationBoundary>
  );
};

export default Page;
