'use client';

import { Stack, Typography } from '@mui/material';

import { products } from '@/mock/products';
import ProductsGrid from '@/components/products/ProductsGrid';
import MyProductsHeader from '@/components/products/MyProductsHeader';

export default function DefaultProducts() {
  return (
    <>
      <MyProductsHeader />
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
          <ProductsGrid products={products} />
        </>
      )}
    </>
  );
}
