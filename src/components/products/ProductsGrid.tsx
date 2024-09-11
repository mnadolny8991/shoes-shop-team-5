'use client';

import { Product } from '@/mock/products';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import ProductCard from '@/components/products/ProductCard';

export default function ProductsGrid({
  products,
}: {
  products: Array<Product>;
}) {
  return (
    <Grid2 container spacing={{ xs: 2, md: 8 }} mx={{ xs: 1, md: 0 }}>
      {products.map((product) => (
        <Grid2 xs={6} sm={4} md={6} lg={4} xl={3} key={product.id}>
          <ProductCard product={product} />
        </Grid2>
      ))}
    </Grid2>
  );
}
