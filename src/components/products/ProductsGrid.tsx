'use client';

import { Product } from '@/types/product';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import ProductCard from '@/components/products/ProductCard';
import { memo } from 'react';

interface ProductsGridProps {
  products: Array<Product>;
  isAdmin?: boolean;
}

const ProductsGrid = memo(({
  products,
  isAdmin = true,
}: ProductsGridProps) => {
  return (
    <Grid2 container spacing={{ xs: 2, md: 8 }} mx={{ xs: 1, md: -4 }}>
      {products.map((product) => (
        <Grid2 xs={6} sm={4} md={6} lg={4} xl={3} key={product.id}>
          <ProductCard product={product} isAdmin={isAdmin} />
        </Grid2>
      ))}
    </Grid2>
  );
});

ProductsGrid.displayName = 'ProductsGrid';
export default ProductsGrid;
