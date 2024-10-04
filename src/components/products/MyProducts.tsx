'use client';
import { Box, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import ProductsGrid from '@/components/products/ProductsGrid';
import MyProductsEmptyState from '@/components/products/MyProductsEmptyState';
import AddProductButton from '@/components/products/AddProductButton';
import ProductsHeader from '@/components/products/ProductsHeader';
import { useSession } from 'next-auth/react';
import { useProductsByUserId } from '@/hooks/useProductsByUserId';

type MyProductsProps = {};

export default function MyProducts() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { data: session } = useSession();
  const { data, isLoading } = useProductsByUserId(
    session?.id!,
    session?.accessToken!
  );

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
        <Typography variant="h1">My products</Typography>
        {!!data && !isMobile && <AddProductButton />}
      </Stack>
      {isLoading ? (
        '...loading'
      ) : data ? (
        <>
          <ProductsGrid products={data} />
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
