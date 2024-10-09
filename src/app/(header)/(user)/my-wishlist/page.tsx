'use client';
import { Typography } from '@mui/material';
import ProductsGrid from '@/components/products/ProductsGrid';
import useProducts from '@/hooks/useProducts';
import { useWishlist } from '@/context/WishlistContext';

export default function MyWishlist() {
  const products = useProducts(useWishlist);

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
    </>
  );
}
