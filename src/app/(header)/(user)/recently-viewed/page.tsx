'use client';
import { Typography } from '@mui/material';
import ProductsGrid from '@/components/products/ProductsGrid';
import useProducts from '@/hooks/useProducts';
import { useLastViewed } from '@/context/LastViewedContext';

export default function RecentlyViewedProducts() {
  const products = useProducts(useLastViewed);

  return (
    <>
      <Typography
        variant="h1"
        mx={{ xs: 2, md: 0 }}
        mb={{ xs: '19px', md: '36px' }}
      >
        Recently viewed
      </Typography>
      <ProductsGrid products={products} isAdmin={false} />
    </>
  );
}
