'use client';

import {
  Box,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import { products } from '@/mock/products';
import ProductsGrid from '@/components/products/ProductsGrid';
import MyProductsEmptyState from '@/components/products/MyProductsEmptyState';
import AddProductButton from '@/components/products/AddProductButton';
import MyProductsHeader from '@/components/products/MyProductsHeader';

export default function MyProducts() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

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
        <Typography variant="h1">My products</Typography>
        {products && !isMobile && <AddProductButton />}
      </Stack>
      {products ? (
        <>
          <ProductsGrid products={products} />
          {isMobile && (
            <Box
              height="80px"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <AddProductButton />
            </Box>
          )}
        </>
      ) : (
        <MyProductsEmptyState />
      )}
    </>
  );
}
