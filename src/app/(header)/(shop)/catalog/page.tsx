import Catalog from '@/components/products/Catalog';
import { Filters } from '@/context/SearchContext';
import pageSize from '@/data/pageSize';
import { fetchProductsByFiltersAndName } from '@/lib/api/fetchProducts';
import { dehydrate, QueryClient } from '@tanstack/query-core';
import { HydrationBoundary } from '@tanstack/react-query';

export default async function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined | null };
}) {
  const searchText = (searchParams!['search'] as string) ?? '';
  const filters: Filters = {
    brand: JSON.parse((searchParams!['brand'] as string) ?? 'null') ?? [],
    color: JSON.parse((searchParams!['color'] as string) ?? 'null') ?? [],
    gender: JSON.parse((searchParams!['gender'] as string) ?? 'null') ?? [],
    price: (JSON.parse((searchParams!['price'] as string) ?? 'null') as [
      number,
      number,
    ]) ?? [0, 999],
    size: JSON.parse((searchParams!['size'] as string) ?? 'null') ?? [],
  };
  const page = JSON.parse((searchParams!['page'] as string) ?? 'null') ?? 1;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: [
      'products',
      { filters: JSON.stringify(filters), searchText, page },
    ],
    queryFn: () =>
      fetchProductsByFiltersAndName(
        filters,
        searchText,
        page,
        pageSize,
        '*',
        'updatedAt',
        'desc',
        { cache: 'no-store' }
      ),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Catalog />
    </HydrationBoundary>
  );
}
