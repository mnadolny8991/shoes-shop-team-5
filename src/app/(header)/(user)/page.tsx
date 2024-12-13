'use client';
import { Stack, Typography } from '@mui/material';
import ProductsGrid from '@/components/products/ProductsGrid';
import ProductsHeader from '@/components/products/ProductsHeader';
import useProducts from '@/hooks/useProducts';
import { useLastViewed } from '@/context/LastViewedContext';

export default function DefaultProducts() {
  const products = useProducts(useLastViewed);

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
        {products.length > 0 && (
          <Typography variant="h1">Last viewed products</Typography>
        )}
      </Stack>
      <ProductsGrid products={products} isAdmin={false} />
    </>
  );
}
