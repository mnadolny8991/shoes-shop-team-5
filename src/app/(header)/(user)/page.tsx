'use client';

import { Stack, Typography } from '@mui/material';

import { products } from '@/mock/products';
import ProductsGrid from '@/components/products/ProductsGrid';
import ProductsHeader from '@/components/products/ProductsHeader';
import lastViewedItems from '@/mock/lastViewedId';

export default function DefaultProducts() {
  const lastViewed = lastViewedItems.map(
    (id) => products.find((product) => product.id == id)!
  );

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
        <Typography variant="h1">Last viewed products</Typography>
      </Stack>
      {products && (
        <>
          <ProductsGrid products={lastViewed} />
        </>
      )}
    </>
  );
}
