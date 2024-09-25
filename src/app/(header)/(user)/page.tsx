'use client';

import { Stack, Typography } from '@mui/material';
import ProductsGrid from '@/components/products/ProductsGrid';
import ProductsHeader from '@/components/products/ProductsHeader';
import { useLastViewed } from '@/context/LastViewedContext';
import { useQueries } from '@tanstack/react-query';
import { fetchProductById } from '@/lib/fetchProducts';
import { Product } from '@/types/product';

export default function DefaultProducts() {
  const { lastViewedIds, onLastViewedRemove } = useLastViewed();
  const queries = lastViewedIds.map((id: number) => {
    return {
      queryKey: ['product', id],
      queryFn: () => fetchProductById(id),
      retry: false,
    };
  });
  const lastViewed = useQueries({ queries });

  const products = lastViewed
    .filter((result, index) => {
      if (result.isSuccess) {
        return true;
      } else if (result.isError) {
        const idToRemove = queries[index].queryKey[1] as number;
        onLastViewedRemove(idToRemove);
        return false;
      }
      return true;
    })
    .map((result) => result.data)
    .filter((product) => product) as Product[];

  return (
    <>
      <ProductsHeader />
      <Stack
        direction={'row'}
        justifyContent="space-between"
        alignItems="center"
        mx={{ xs: 2, md: 0 }}
        mb={{ xs: '19px', md: '36px' }}
      >
        {lastViewed.length > 0 && (
          <Typography variant="h1">Last viewed products</Typography>
        )}
      </Stack>
      <ProductsGrid products={products} isAdmin={false} />
    </>
  );
}
