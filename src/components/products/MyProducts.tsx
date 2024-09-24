'use client';
import { Box, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import ProductsGrid from '@/components/products/ProductsGrid';
import MyProductsEmptyState from '@/components/products/MyProductsEmptyState';
import AddProductButton from '@/components/products/AddProductButton';
import ProductsHeader from '@/components/products/ProductsHeader';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { fetchProductsByUserId } from '@/lib/fetchProducts';
import { Product } from '@/types/product';

type MyProductsProps = {
  initialData: Product[];
}

export default function MyProducts({ initialData }: MyProductsProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { data: session } = useSession();
  const { data, isLoading } = useQuery({
    queryKey: ['myProducts'],
    queryFn: () => fetchProductsByUserId(session?.id!, session?.accessToken!),
    initialData,
  });

  return (
    <>
      <ProductsHeader />
      <Stack
        direction={'row'}
        justifyContent="space-between"
        alignItems="center"
        mx={'20px'}
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

