'use client';

import { useMediaQuery, useTheme } from '@mui/material';
import { Product } from '../../mock/products';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import ProductCard from './ProductCard';

export default function ProductsGrid({
  products,
}: {
  products: Array<Product>;
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Grid2 container spacing={isMobile ? 2 : 8} {...(isMobile && { mx: 1 })}>
      {products.map((product) => (
        <Grid2 xs={6} sm={4} md={6} lg={4} xl={3} key={product.id}>
          <ProductCard product={product} />
        </Grid2>
      ))}
    </Grid2>
  );
}
