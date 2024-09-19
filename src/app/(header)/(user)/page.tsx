'use client';

import { Stack, Typography } from '@mui/material';
import ProductsGrid from '@/components/products/ProductsGrid';
import ProductsHeader from '@/components/products/ProductsHeader';
import { useLastViewed } from '@/context/LastViewedContext';

export default function DefaultProducts() {
  const { lastViewed, isLoading } = useLastViewed();

  return (
    <>
      <ProductsHeader />
      <Stack
        direction={'row'}
        justifyContent="space-between"
        alignItems="center"
        mx={'20px'}
        mb={{ xs: '19px', md: '36px' }}
      >
        {(!isLoading && lastViewed.length > 0) &&
          <Typography variant="h1">Last viewed products</Typography>
        }
      </Stack>
      {!isLoading && (
        <>
          <ProductsGrid products={lastViewed} isAdmin={false} />
        </>
      )}
    </>
  );
}
