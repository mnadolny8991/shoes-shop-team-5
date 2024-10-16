'use client';
import {
  Box,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import ProductsGrid from '@/components/products/ProductsGrid';
import MyProductsEmptyState from '@/components/products/MyProductsEmptyState';
import AddProductButton from '@/components/products/AddProductButton';
import ProductsHeader from '@/components/products/ProductsHeader';
import { useSession } from 'next-auth/react';
import { useProductsByUserId } from '@/hooks/useProductsByUserId';
import { useSearchParams, useRouter } from 'next/navigation';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { mapProductList } from '@/mappers/productMappers';

export default function MyProducts() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const searchParams = useSearchParams();
  const router = useRouter();
  const page = searchParams.get('page')
    ? parseInt(searchParams.get('page') as string)
    : 1;
  const { data: session } = useSession();
  const { data, isLoading, isSuccess } = useProductsByUserId(
    session?.id!,
    session?.accessToken!,
    page,
    1
  );

  const products = isSuccess ? mapProductList(data) : [];
  const hasNextPage = isSuccess
    ? data.meta.pagination.page < data.meta.pagination.pageCount
    : false;

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
          <ProductsGrid products={products} />
          <Stack direction="row" justifyContent="center" marginBottom="20px">
            <IconButton
              onClick={() => router.push(`/my-products?page=${page - 1}`)}
              disabled={page === 1}
            >
              <ArrowBackIosIcon />
            </IconButton>
            <IconButton
              onClick={() => router.push(`/my-products?page=${page + 1}`)}
              disabled={!hasNextPage}
            >
              <ArrowForwardIosIcon />
            </IconButton>
          </Stack>
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
