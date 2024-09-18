'use client';

import { Box, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';

import ProductsGrid from '@/components/products/ProductsGrid';
import MyProductsEmptyState from '@/components/products/MyProductsEmptyState';
import AddProductButton from '@/components/products/AddProductButton';
import ProductsHeader from '@/components/products/ProductsHeader';
import { useQuery } from '@tanstack/react-query';
import apiUrl from '@/data/apiUrl';
import { mapProductList } from '@/mappers/productMappers';
import { useRouter } from 'next/navigation';
import { ApiProductListResponse } from '@/types/api/apiTypes';

export default function MyProducts() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const router = useRouter();
  const { data, isLoading } = useQuery({
    queryKey: ['myProducts'],
    queryFn: () =>
      fetch(`${apiUrl}/products?filters[teamName]=team-5&populate=*`) // filters[userID]=${id}
        .then((res) => res.json())
        .then((data: ApiProductListResponse) => mapProductList(data))
        .catch(() => {
          // router.push('/error');
        }),
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
          <ProductsGrid products={data}/>
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
