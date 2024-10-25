'use client';
import { Alert, Snackbar, Typography } from '@mui/material';
import ProductsGrid from '@/components/products/ProductsGrid';
import useProducts from '@/hooks/useProducts';
import { useWishlist } from '@/context/WishlistContext';
import { useEffect, useRef, useState } from 'react';
import { Product } from '@/types/product';

export default function MyWishlist() {
  const products = useProducts(useWishlist);
  const prevProductsRef = useRef(products);
  const [deletedProduct, setDeletedProduct] = useState<Product | null>(null);
  useEffect(() => {
    const deleted = prevProductsRef.current.find(
      (product) => !products.includes(product)
    );
    if (deleted) setDeletedProduct(deleted);
    prevProductsRef.current = products;
  }, [products]);

  return (
    <>
      <Typography
        variant="h1"
        mx={{ xs: 2, md: 0 }}
        mb={{ xs: '19px', md: '36px' }}
      >
        My Wishlist
      </Typography>
      <ProductsGrid products={products} isAdmin={false} isInWishlist={true} />
      <Snackbar
        key={deletedProduct?.id}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={!!deletedProduct}
        autoHideDuration={2000}
        onClose={() =>
          setDeletedProduct((deleted) =>
            deleted === deletedProduct ? null : deleted
          )
        }
      >
        <Alert severity="info">
          {deletedProduct?.name} removed from wishlist
        </Alert>
      </Snackbar>
    </>
  );
}
